export class UpstreamHttpError extends Error {
  constructor(status) {
    super(`Upstream HTTP ${status}`);
    this.name = "UpstreamHttpError";
    this.status = status;
  }
}

export class UpstreamTimeoutError extends Error {
  constructor(timeoutMs, options) {
    super(`Upstream request timed out after ${timeoutMs}ms`, options);
    this.name = "UpstreamTimeoutError";
    this.timeoutMs = timeoutMs;
  }
}

/**
 * Fetch JSON with a bounded timeout and explicit payload validation.
 * Inject fetchImpl in tests; production callers may omit it.
 *
 * @template T
 * @param {string | URL} url
 * @param {(payload: unknown) => T} parse
 * @param {{ timeoutMs?: number, fetchImpl?: typeof fetch }} [options]
 * @returns {Promise<T>}
 */
export async function fetchJson(url, parse, { timeoutMs = 8_000, fetchImpl = fetch } = {}) {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new RangeError("timeoutMs must be a positive finite number");
  }
  if (typeof parse !== "function") {
    throw new TypeError("parse must be a function");
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(url, { signal: controller.signal });
    if (!response.ok) throw new UpstreamHttpError(response.status);
    const payload = /** @type {unknown} */ (await response.json());
    return parse(payload);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new UpstreamTimeoutError(timeoutMs, { cause: error });
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

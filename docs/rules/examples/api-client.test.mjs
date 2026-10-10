import test from "node:test";
import assert from "node:assert/strict";
import {
  fetchJson,
  UpstreamHttpError,
  UpstreamTimeoutError,
} from "./api-client.mjs";

const parseMessage = (value) => {
  if (!value || typeof value !== "object" || !("message" in value) || typeof value.message !== "string") {
    throw new TypeError("Invalid upstream payload: expected string message");
  }
  return { message: value.message };
};

test("returns parsed data for a successful JSON response", async () => {
  const result = await fetchJson(
    "https://example.invalid/api",
    parseMessage,
    { fetchImpl: async () => Response.json({ message: "ok" }) },
  );
  assert.deepEqual(result, { message: "ok" });
});

test("classifies non-2xx responses without parsing the body", async () => {
  await assert.rejects(
    fetchJson(
      "https://example.invalid/api",
      parseMessage,
      { fetchImpl: async () => new Response("rate limited", { status: 429 }) },
    ),
    (error) => error instanceof UpstreamHttpError && error.status === 429,
  );
});

test("rejects malformed payloads through the caller's parser", async () => {
  await assert.rejects(
    fetchJson(
      "https://example.invalid/api",
      parseMessage,
      { fetchImpl: async () => Response.json({ message: 42 }) },
    ),
    /Invalid upstream payload/,
  );
});

test("converts an aborted request into an explicit timeout error", async () => {
  const fetchImpl = (_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => reject(signal.reason ?? new Error("aborted")), { once: true });
  });

  await assert.rejects(
    fetchJson("https://example.invalid/api", parseMessage, { timeoutMs: 5, fetchImpl }),
    (error) => error instanceof UpstreamTimeoutError && error.timeoutMs === 5,
  );
});

test("rejects invalid timeout configuration before making a request", async () => {
  let called = false;
  await assert.rejects(
    fetchJson("https://example.invalid/api", parseMessage, {
      timeoutMs: 0,
      fetchImpl: async () => { called = true; return Response.json({ message: "ok" }); },
    }),
    /timeoutMs must be a positive finite number/,
  );
  assert.equal(called, false);
});

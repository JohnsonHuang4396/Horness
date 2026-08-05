import assert from "node:assert/strict"
import { createServer } from "node:http"
import { test } from "node:test"
import { handler } from "./server.ts"

test("/health 返回 200 {status:ok}", async () => {
  const server = createServer(handler)
  await new Promise((r) => server.listen(0, r))
  const port = (server.address() as { port: number }).port
  const res = await fetch(`http://localhost:${port}/health`)
  assert.equal(res.status, 200)
  assert.deepEqual(await res.json(), { status: "ok" })
  server.close()
})

test("未知路径返回 404", async () => {
  const server = createServer(handler)
  await new Promise((r) => server.listen(0, r))
  const port = (server.address() as { port: number }).port
  const res = await fetch(`http://localhost:${port}/nope`)
  assert.equal(res.status, 404)
  server.close()
})

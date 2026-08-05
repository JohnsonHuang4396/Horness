// demo-api：最小 HTTP 服务（node:http，零外部依赖）。/health 由本次 harness 任务加入。
import { createServer } from "node:http"

export function handler(req: import("node:http").IncomingMessage, res: import("node:http").ServerResponse) {
  const url = new URL(req.url ?? "/", "http://localhost")
  if (url.pathname === "/health") {
    res.writeHead(200, { "content-type": "application/json" })
    res.end(JSON.stringify({ status: "ok" }))
    return
  }
  res.writeHead(404)
  res.end("not found")
}

export const server = createServer(handler)

if (import.meta.main) server.listen(3000, () => console.log("demo-api on :3000"))

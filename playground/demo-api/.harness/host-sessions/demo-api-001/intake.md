# P0 接收单（Intake）

- **任务名称**：为 demo-api 增加 `/health` 健康检查端点
- **原始请求**（不改写）：加一个 /health 返回 ok
- **任务类型**：`small-change`
- **Assurance 模式**：`standard`
- **预估风险**：`R1`
- **是否需代码写入**：是
- **是否含外部副作用**：否（仅本地监听测试端口）
- **初始边界**
  - 允许：改 server.ts、新增集成测试
  - 禁止：引入外部依赖、改监听端口
  - 禁区：不破坏既有路由（当前仅 404 兜底）
- **Session**：`demo-api-001`（`.harness/host-sessions/demo-api-001/`）

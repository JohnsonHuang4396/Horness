# P0 接收单（Intake）

- **任务名称**：为 demo-cli 增加 `--version` 子命令
- **原始请求**（不改写）：给 demo-cli 加一个 `--version` 打印版本号
- **任务类型**：`small-change`
- **Assurance 模式**：`standard`
- **预估风险**：`R1`
- **是否需代码写入**：是
- **是否含外部副作用**：否
- **初始边界**
  - 允许：改 `src/index.ts`、新增测试
  - 禁止：改 package.json 版本语义、引入外部依赖
  - 禁区：不改 `greet` 既有行为
- **Session**：`demo-cli-001`（`.harness/host-sessions/demo-cli-001/`）

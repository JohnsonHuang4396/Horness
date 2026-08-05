# P0 接收单（Intake）

- **任务名称**：为 demo-react 增加 Counter 计数器组件
- **原始请求**（不改写）：页面加一个 -/+ 计数器
- **任务类型**：`small-change`
- **Assurance 模式**：`standard`
- **预估风险**：`R1`
- **是否需代码写入**：是
- **是否含外部副作用**：否
- **初始边界**
  - 允许：新增 counter 逻辑与 App 组件、测试
  - 禁止：引入状态库、改动构建配置
  - 禁区：不触碰 CV 之外的现有 UI
- **Session**：`demo-react-001`（`.harness/host-sessions/demo-react-001/`）

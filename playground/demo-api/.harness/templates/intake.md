# P0 接收单（Intake）

- **任务名称**：{{TASK_NAME}}
- **原始请求**（不改写）：{{RAW_REQUEST}}
- **任务类型**：`answer | small-change | feature | migration | debug | release`
- **Assurance 模式**：`fast | standard | high-assurance`（默认按 `.harness/config.json` 的 assuranceDefault）
- **预估风险**：`R0 | R1 | R2 | R3 | R4`
- **是否需代码写入**：是 / 否
- **是否含外部副作用**：是 / 否
- **初始边界**
  - 允许：{{}}
  - 禁止：{{}}
  - 禁区：{{}}
- **Session**：`{{SESSION_ID}}`（`.harness/host-sessions/<session>/`）
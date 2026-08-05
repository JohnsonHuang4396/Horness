# P4 任务拆分（Tasks）

- **批次概览**：单 TASK
- **任务表**
  | TASK | 写集合 | 禁止项 | 窄验证 | 批次验证 | 回滚 | 完成证据 |
  |---|---|---|---|---|---|---|
  | TASK-1 | src/counter.ts, src/counter.test.ts, src/App.tsx | 改 main/构建 | node --test counter | node --test 全绿 | git checkout | 测试通过 |
- **并行约束**：单任务

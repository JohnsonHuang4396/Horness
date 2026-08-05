# P4 任务拆分（Tasks）

- **批次概览**：单 TASK，small-change 合并 P6/P7
- **任务表**
  | TASK | 写集合 | 禁止项 | 窄验证 | 批次验证 | 失败路由 | 回滚 | 完成证据 |
  |---|---|---|---|---|---|---|---|
  | TASK-1 | src/index.ts, src/index.test.ts | 改 greet | node --test | node --test 全绿 | 修复后重跑 | git checkout index.ts | 测试通过 |
- **并行约束**：单任务无并行写冲突
- **恢复点**：改动前 `git status` 基线已记录

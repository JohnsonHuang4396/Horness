# P3 方案设计（Design）

- **现状**：`src/index.ts` 只有 `greet` 子命令，无版本入口
- **设计约束**：零外部依赖；Node 24 原生可跑
- **方案对比**
  | 方案 | 优点 | 缺点 | 结论 |
  |---|---|---|---|
  | A 顶层 if 分支 | 最小改动 | 测试 import 会误触发 | 备选 |
  | B `import.meta.main` 包裹 + 分支 | 可测试、隔离副作用 | 需 Node ≥20.11 | 选定 |
- **选定方案**
  - 模块：`version()` 纯函数 + `if (import.meta.main)` 入口
  - 接口契约：`version(): string` 返回 `1.0.0`
  - 错误处理：未知子命令打印 usage
  - 安全：无外部输入风险
- **追踪矩阵**：REQ-1→version()；REQ-2→VERSION 常量；REQ-3→不改 greet
- **决策与剩余风险**：版本号常量需与 package.json 手工对齐（小项目可接受）

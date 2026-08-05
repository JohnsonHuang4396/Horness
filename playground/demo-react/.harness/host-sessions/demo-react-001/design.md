# P3 方案设计（Design）

- **现状**：App 为空壳
- **设计约束**：React 18、零新增依赖
- **方案对比**
  | 方案 | 优点 | 缺点 | 结论 |
  |---|---|---|---|
  | A 逻辑内联在 App | 直观 | 无法 node 验证 | 备选 |
  | B 抽 `counter.ts` 纯函数 | 可 node 验证、解耦 | 多一个文件 | 选定 |
- **选定方案**
  - 组件：`App` 用 `useState(0)` + `increment/decrement`
  - 接口契约：`increment(n)=>n+1`, `decrement(n)=>n-1`
  - 错误处理：无（纯算术）
- **追踪矩阵**：REQ-1→App；REQ-2→counter.ts
- **决策与剩余风险**：UI 交互未自动化测试（无 DOM 工具），以纯函数测试覆盖核心逻辑

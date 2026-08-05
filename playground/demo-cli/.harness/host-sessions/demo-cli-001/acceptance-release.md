# P9 验收与发布（Acceptance / Release）

- **验收矩阵**
  | AC | 结果 | 新鲜证据 | 阻断 |
  |---|---|---|---|
  | AC-1.1 | 通过 | `node src/index.ts --version` → 1.0.0 | 无 |
  | AC-2.1 | 通过 | VERSION 常量 + package.json 均为 1.0.0 | 无 |
  | AC-3.1 | 通过 | `greet harness` 回归 | 无 |
- **影响/任务核销**：TASK-1 完成；IMP 无
- **发布准备**：无配置/迁移/兼容/监控需求
- **回滚**：`git checkout src/` 即可回退
- **剩余风险与批准**：版本号双写（常量+package.json），已记录
- **决定**：`代码可合并`
- **未执行检查**：无

# P1 需求基线（Requirements）

- **目标**：`demo-cli --version` 输出当前版本号 `1.0.0`
- **范围**
  - 包含：`--version` 与 `-v` 两个别名；与 `greet` 并列
  - 不包含：不触发网络、不改版本存储方式
- **需求表**
  | ID | 需求 | 来源 | 验收条件 |
  |---|---|---|---|
  | REQ-1 | `--version`/`-v` 打印版本号 | 用户原话 | AC-1.1 |
  | REQ-2 | 版本号单一来源，不与 package.json 漂移 | 推断 | AC-2.1 |
  | REQ-3 | 既有 `greet` 行为不变 | 推断 | AC-3.1 |
- **必须保持的契约**：`greet <name>` 输出 `hello, <name>`
- **假设**：版本号常量与 package.json 一致（本项目自维护）
- **未决问题**：无
- **追踪完整性**：REQ-1→AC-1.1；REQ-2→AC-2.1；REQ-3→AC-3.1

# .harness 证据账本

本目录是 Agent Harness 复刻的**运行时证据账本**（gitignore 状态），记录每次任务（Host Session）的修改、验证、风险和交付证据。

## 布局

```
.harness/
  host-sessions/<session>/   # 每次任务一个目录：adapter-events.jsonl + 阶段产物
  generated/                 # 扫描 / 规则 / 进化候选（未审批）
  packs/candidates/          # 新 Skill / 领域知识候选（未审批）
  migrations/                # 升级 / 回滚基线
  scripts/
    evidence.sh              # 证据事件脚本（session / event）
    hook-file-change.sh      # Claude Code FileChanged hook 入口
  current-session            # 当前 Host Session 指针（缓存，可重建）
```

## 脚本用法

```bash
.harness/scripts/evidence.sh session <session-id>   # 设置/切换当前 session
.harness/scripts/evidence.sh session                 # 读取当前 session
.harness/scripts/evidence.sh event <type> [path] [cmd] [exit]  # 追加事件
```

无当前 session 时 `event` 静默返回（不伪造事件）。`current-session` 只是缓存指针，损坏时按 `host-sessions/` 最新枚举恢复。

## 事件格式

`adapter-events.jsonl` 每行一个 JSON 事件：
```json
{"type":"file.changed","ts":"2026-08-04T07:00:00Z","path":"src/foo.ts","cmd":"pnpm typecheck","exit":0}
```

## 入口

- 任务流水线：`/harness`
- 扫描/候选：`/bootstrap`、`/scan`
- 使用检查：`/harness-check`；体检：`/doctor`
- 自进化：`/evolution`；卸载：`/uninstall`
#!/usr/bin/env bash
# 证据脚本自查：验证 session 管理、事件写入、无 session 不伪造三个核心行为。
set -euo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
EV="$ROOT/scripts/evidence.sh"
SID="test-$(date +%s)"

fail() { echo "FAIL: $1" >&2; exit 1; }

# 1. 无 session 时 event 静默，不建文件
"$EV" event file.changed x.ts
[ -z "$(ls -A "$ROOT/host-sessions" 2>/dev/null)" ] || fail "无 session 不应建事件文件"

# 2. 建 session 并写事件
"$EV" session "$SID" >/dev/null
"$EV" event file.changed src/a.ts "pnpm typecheck" 0
grep -q '"type":"file.changed"' "$ROOT/host-sessions/$SID/adapter-events.jsonl" || fail "事件未写入"

# 3. 读当前 session
cur="$("$EV" session)"
[ "$cur" = "$SID" ] || fail "当前 session 读回错误: $cur"

# 4. 清理
rm -rf "$ROOT/host-sessions/$SID" "$ROOT/current-session"
echo "PASS: 证据脚本自查通过"
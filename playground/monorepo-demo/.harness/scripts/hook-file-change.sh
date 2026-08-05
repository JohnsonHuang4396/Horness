#!/usr/bin/env bash
# Claude Code FileChanged hook → 把文件变化追加到当前 Host Session 的证据账本。
# stdin 是 JSON：{"file_path": "...", "event": "create|edit|delete|rename", ...}
# 无当前 session 时 evidence.sh 静默返回（不伪造事件）。
set -euo pipefail
read -r line
path="$(printf '%s' "$line" | sed -n 's/.*"file_path":"\([^"]*\)".*/\1/p')"
[ -n "$path" ] || exit 0
event="$(printf '%s' "$line" | sed -n 's/.*"event":"\([a-z]*\)".*/\1/p')"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
"$ROOT/.harness/scripts/evidence.sh" event "file.${event:-changed}" "$path"
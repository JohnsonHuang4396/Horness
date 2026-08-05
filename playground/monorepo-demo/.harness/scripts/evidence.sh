#!/usr/bin/env bash
# 证据事件脚本：把任务事件追加到当前 Host Session 的证据账本。
# 用法:
#   evidence.sh event <type> [path] [cmd] [exit_code]
#   evidence.sh session <session_id>          # 设置/切换当前 session
#   evidence.sh session                        # 打印当前 session id
# 无当前 session 时，event 类调用静默返回（不伪造事件）。
set -euo pipefail

HARNESS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CURRENT_POINTER="$HARNESS_DIR/current-session"
SESSIONS_DIR="$HARNESS_DIR/host-sessions"

now() { date -u +"%Y-%m-%dT%H:%M:%SZ"; }

cmd_session() {
  if [[ $# -eq 0 ]]; then
    [[ -f "$CURRENT_POINTER" ]] && cat "$CURRENT_POINTER" || true
  else
    mkdir -p "$SESSIONS_DIR/$1"
    printf '%s' "$1" > "$CURRENT_POINTER"
    printf '%s' "$1"
  fi
}

cmd_event() {
  local type="${1:-}"
  local path="${2:-}"
  local cmd="${3:-}"
  local exit_code="${4:-}"
  [[ -z "$type" ]] && { echo "usage: evidence.sh event <type> [path] [cmd] [exit_code]" >&2; exit 2; }
  [[ -f "$CURRENT_POINTER" ]] || return 0   # 无 session，不伪造事件
  local session
  session="$(cat "$CURRENT_POINTER")"
  local dir="$SESSIONS_DIR/$session"
  mkdir -p "$dir"
  # 事件行：JSONL，单行。转义双引号。
  local line
  line="{\"type\":\"$type\",\"ts\":\"$(now)\",\"path\":\"${path//\"/\\\"}\",\"cmd\":\"${cmd//\"/\\\"}\",\"exit\":${exit_code:-0}}"
  printf '%s\n' "$line" >> "$dir/adapter-events.jsonl"
}

case "${1:-}" in
  session) shift; cmd_session "$@" ;;
  event) shift; cmd_event "$@" ;;
  *) echo "usage: evidence.sh session [id] | event <type> [path] [cmd] [exit]" >&2; exit 2 ;;
esac
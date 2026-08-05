// Pi 扩展：把任务事件写入 Harness 证据账本。
// 复用共享运行时 `.harness/scripts/evidence.sh`（agent 无关）。
// 说明：Pi 通过 `pi.on("session_start"|"tool_call")` 订阅事件；
// 本文件提供的 API 签名按 Pi 扩展约定编写，若宿主版本不同，
// 以 `pi` 扩展 API 文档为准调整订阅名与回调参数。

import { execSync } from "node:child_process";

const EVIDENCE = [".harness", "scripts", "evidence.sh"].join("/");

function runEvidence(args: string[]): void {
  try {
    execSync([EVIDENCE, ...args].join(" "), { stdio: "ignore" });
  } catch {
    // 证据记录失败不阻断任务；无当前 session 时 evidence.sh 本就静默返回。
  }
}

// 文件变更类工具（写/编辑/删除会改变工作树，需记录证据）
const MUTATING_TOOLS = /^(write|edit|delete|rename|patch|move|creat|run(_in_background)?|bash)$/;

export function installEvidence(pi: {
  on(event: string, cb: (payload: Record<string, unknown>) => void): void;
}): void {
  // 会话开始时把当前 session id 写入证据指针
  pi.on("session_start", (payload) => {
    const sessionId = String(payload.session_id ?? payload.sessionId ?? "");
    if (sessionId) runEvidence(["session", sessionId]);
  });

  // 文件变更类工具调用（含写操作的 Bash）→ 记录证据事件
  pi.on("tool_call", (payload) => {
    const name = String(payload.tool ?? payload.name ?? "");
    const input = (payload.input ?? payload.args ?? {}) as Record<string, unknown>;
    if (!name) return;

    const isMutating = MUTATING_TOOLS.test(name);
    if (!isMutating) return;

    const path = String(input.path ?? input.file_path ?? "");
    const cmd = String(input.command ?? input.content ?? name);
    runEvidence(["event", "tool_call", path, cmd, "0"]);
  });
}
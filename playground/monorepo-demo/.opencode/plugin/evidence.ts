import type { Plugin } from "@opencode-ai/plugin"
import { execFile } from "node:child_process"
import { resolve } from "node:path"

// OpenCode plugin：把文件/工具事件追加到当前 Host Session 的证据账本。
// 复用 .harness/scripts/evidence.sh（无当前 session 时静默返回，不伪造事件）。
// 与 .claude/settings.json 的 FileChanged hook 作用一致，只是宿主适配。
//
// 注意：本文件按 opencode 1.18 插件 API 编写——
//   - 模块从 `@opencode-ai/plugin` 导入（opencode 运行时内置解析，无需 npm 安装）
//   - 导出 `Plugin` 函数，返回 hooks 对象
//   - 事件是判别联合，用 `event.type` 匹配（文件编辑 = "file.edited"）
// 旧版 `import { event } from "opencode"` + `export const hooks` 已废弃。
const ROOT = resolve(import.meta.dirname, "../..")

function toEvidence(type: string, path: string, cmd = "", exit = 0) {
  execFile(`${ROOT}/.harness/scripts/evidence.sh`, ["event", type, path, cmd, String(exit)])
}

export const Plugin: Plugin = async () => {
  return {
    async event({ event }) {
      // 文件编辑事件（opencode 只暴露粗粒度 file.edited，不再区分 create/edit/delete）
      if (event.type === "file.edited") toEvidence("file", event.properties.file)
    },
    async "tool.execute.after"({ tool }) {
      toEvidence("tool", "", tool)
    },
  }
}
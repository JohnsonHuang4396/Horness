---
name: node-backend-engineering
description: "在已确认 Node、TypeScript、NestJS、Express 或 Fastify 项目中维护 API、任务、依赖和运行时兼容，不混用 Harness 自身运行时。"
---

# Node/TypeScript 后端工程能力

## 触发与边界

先从 package.json、锁文件、tsconfig、启动入口确认 Node 版本和框架。业务项目可以是 Node 14/16 等旧版本；Harness 的 Node 20 只运行 Harness，不得改写业务 engines 或锁文件。

## 必须检查

- 追踪路由、中间件、校验、Service、数据访问、队列、定时任务和错误处理链。
- 核对 ESM/CJS、tsconfig、路径别名、序列化、流、超时、Abort、重试、连接池和进程退出。
- 保留 API 状态码/响应结构、鉴权、配置键、日志脱敏和兼容浏览器/客户端；依赖升级必须有影响与回滚。
- 运行项目自有 typecheck/build/test/lint，不把 Harness 的 npm 依赖安装到业务项目。

## 验证与失败

优先使用 npm/pnpm/yarn 已声明脚本，记录包管理器和 Node 实际版本。命令失败时保留输出并回到最小改动；不通过全局安装隐式修复环境。

详细检查清单见 `references/stack-pack.md` 与 `references/verification.md`。

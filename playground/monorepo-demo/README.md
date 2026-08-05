# monorepo-demo — pnpm workspace monorepo 演示

pnpm workspace 多包仓库，由 **horness** 验证 monorepo 技术栈检测：单一仓库内多个 workspace 各自携带不同技术栈，`horness init` 逐 workspace 识别并写入 `project.workspaces`。

## 结构

| workspace | 技术栈 | 信号 |
|---|---|---|
| `backend/` | Java Spring Boot | `pom.xml` 含 `spring-boot` |
| `frontend/` | Vue 3 | `package.json` 含 `"vue"` |
| `frontend2/` | React | `package.json` 含 `"react"` |

## 检测结果

```bash
$ horness init . --dry-run
技术栈: monorepo / multi
  backend:  java-spring / java / maven
  frontend: vue / ts / pnpm
  frontend2: react / ts / pnpm
  证据: pnpm-workspace.yaml
```

> 注：`backend/` 无 lockfile，包管理器向上回落到 maven；workspace 混合 Java 与 TS，整体语言为 `multi`。

## 复现

```bash
horness init ./monorepo-demo --name MonorepoDemo --dry-run
# 查看 .harness/config.json 的 project.workspaces
```
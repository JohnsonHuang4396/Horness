---
name: devops-engineering
description: "在 Docker、Kubernetes、Terraform、Helm 或 CI/CD 项目中维护构建、发布、健康检查、秘密边界、灰度和可回滚交付。"
---

# DevOps 与发布工程能力

## 触发与边界

需要 Dockerfile、Kubernetes/Helm/Terraform、CI 工作流或部署脚本等真实证据。不得自动执行发布、推送、删除资源或读取秘密；外部副作用必须单独审批。

## 必须检查

- 追踪源码、构建产物、镜像标签、配置/Secret 引用、探针、资源限制、网络和权限到部署环境。
- 核对可重复构建、缓存、供应链、SBOM/漏洞扫描、最小权限、日志/指标/告警和回滚版本。
- 设计发布顺序、迁移先后、灰度比例、观察窗口、停止条件和恢复负责人。
- 区分本地静态校验、CI 证据、预发证据和生产观察，不把任一层冒充全部通过。

## 验证与回退

只运行项目声明的 lint/validate/build/dry-run；生产动作默认预览。任何失败保留输出和最后稳定版本，按停止条件回滚。

详细检查清单见 `references/stack-pack.md` 与 `references/verification.md`。

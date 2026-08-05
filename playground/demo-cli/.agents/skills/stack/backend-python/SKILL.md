---
name: python-engineering
description: "在已确认 Python、FastAPI 或 Django 项目中实施服务、脚本、异步任务、数据处理和依赖变更，并保持运行时、类型和接口兼容。"
---

# Python 工程能力

## 触发与边界

仅在 pyproject.toml/requirements、Python 入口或 FastAPI/Django 证据命中时加载。先确认 Python 版本、虚拟环境、包管理器和部署方式；不得因 Harness Node 版本升级业务 Python。

## 必须检查

- 追踪路由/命令入口、Pydantic/Serializer、Service、数据库访问、队列、异步边界和配置加载。
- 核对同步/异步混用、事件循环、线程/进程、超时、取消、重试、幂等和资源释放。
- 保留响应状态、字段别名、异常格式、鉴权、环境变量键名和迁移兼容；检查类型、序列化和时区。
- 检查依赖锁定、导入副作用、Secrets、日志脱敏、数据脚本和生产启动命令。

## 实施与验证

先写需求/影响/验收，再按入口到边界分层修改。优先运行 `python -m compileall .`、项目定义的 `pytest`，再运行 `ruff check .`/`mypy`（仅在项目已配置时）。未配置的工具不能自行引入作为通过条件。

## 质量门禁

不得把静态类型通过当成运行时通过；外部服务、数据库、队列和凭据使用必须分别记录。失败保留最小复现、环境版本和回退路径。

详细检查清单见 `references/stack-pack.md` 与 `references/verification.md`。

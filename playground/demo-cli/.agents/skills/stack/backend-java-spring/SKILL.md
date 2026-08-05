---
name: java-spring-engineering
description: "在已确认 Java、Spring、Maven 或 Gradle 项目中实施后端 API、事务、配置、依赖和测试变更，并保持运行时与对外契约兼容。"
---

# Java/Spring 后端工程能力

## 触发与边界

只有项目证据同时命中 Java 与 Spring（例如 pom.xml/build.gradle、Spring Boot 入口或依赖）且任务涉及后端代码时加载。不能因为用户举例 Java 就激活，也不能把 Harness 自身 Node 版本当成业务 Java 版本。

## 必须检查

- 读取所有模块的 Maven/Gradle 构建文件、锁定版本、Java toolchain、Profile、插件和现有验证脚本。
- 从 Controller/Consumer/Job 入口追到 DTO、校验、Service、Mapper/Repository、XML、配置、缓存、消息和外部调用。
- 保留路径、HTTP 方法、请求/响应包装、错误码、序列化顺序、鉴权、事务边界和模型标识；变化必须进入影响账本。
- 检查 Spring 配置绑定、环境覆盖、Profile、密钥键名、日志脱敏、线程池、超时、重试和幂等。
- 数据库写入必须核对事务、并发、索引、迁移顺序和回滚，不能只看 Java 编译。

## 实施顺序

需求/契约 → 影响矩阵 → 方案与兼容策略 → DTO/校验 → Service/事务 → 数据访问/外部调用 → 配置/日志 → 测试 → 编译和依赖审计。

## 质量门禁

禁止在没有实际项目证据时升级 Spring/Java、替换 ORM、修改公共 API 或删除旧配置。编译通过不等于启动、远端依赖、数据库和权限通过；未启动项必须标记未知。

## 验证与回退

优先使用项目已有 wrapper；没有时依次尝试 `mvn -q -DskipTests compile`、`./mvnw -q -DskipTests compile`、`gradlew.bat compileJava`，并记录真实退出码。失败先保留原始输出，回退到最近检查点；迁移和配置变化必须保留旧键/兼容窗口或明确审批。

详细检查清单见 `references/stack-pack.md` 与 `references/verification.md`。

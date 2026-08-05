# Harness 通用模板 + 初始化脚本 计划

## 目标
把已复刻进 react-admin-kit 的 Harness（P0→P10 流水线 / 8 角色 / 64 技能 / 候选制 / 证据账本）提炼为**项目无关模板** + **node/ts 初始化脚本**，可对任意新项目一键初始化。

## 已确认决策
- 技能**全量拷贝 + 配置启用**（模板带全部 core/stack/optional/build-time，config 标注活跃栈）。
- 初始化脚本用 **node/ts**。
- 目录名按用户指定：`horness`（拼写如此，非 harness）。
- 当前 react-admin-kit 的 `.claude/`/`.harness/` 保持不动，模板是从它派生的新产物。

## 布局
```
horness/
  README.md / package.json / tsconfig.json
  bin/harness-init.ts + harness-init.test.ts
  src/detect.ts + copy.ts + config.ts
  registry/stack.json
  template/                    # 项目无关骨架
    .claude/{agents,commands,skills,settings.json}
    .harness/{scripts,templates,README,config.example.json,config.schema.json}
    AGENTS.md / HARNESS.md / gitignore.harness
  tasks/plan.md + todo.md
```

## 任务
详见 `tasks/todo.md`。

## 设计要点
1. 模板/实例分离：template 是纯骨架；实例化 = 骨架 + 生成的 `.harness/config.json` + 项目自己的 AGENTS.md 追加。
2. 占位符：settings.json 用项目根相对路径（已项目无关，无需占位符）；AGENTS.md 项目名由 init 填充。
3. 配置驱动：`config.json` 记录 project 与 harness 设置，bootstrap/scan 读它，不再硬编码前端检查。
4. 安全初始化：冲突备份、--dry-run、幂等、不覆盖用户文件。
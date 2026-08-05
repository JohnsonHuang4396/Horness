#!/bin/bash
# 获取 Git 变更文件列表和差异内容
# 用法:
#   ./get_git_diff.sh                    # 获取工作区变更（默认）
#   ./get_git_diff.sh <base> <target>    # 对比两个分支

BASE_BRANCH="${1:-}"
TARGET_BRANCH="${2:-}"

# 场景判断
if [ -z "$BASE_BRANCH" ]; then
    # 场景 A：无参数，获取工作区变更（已修改但未提交的文件）
    MODE="workspace"
else
    # 场景 B：有参数，对比分支
    MODE="branch"
    if [ -z "$TARGET_BRANCH" ]; then
        TARGET_BRANCH="HEAD"
    fi
fi

# 获取当前分支名
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "=== Git Diff Summary ==="
echo "Current Branch: $CURRENT_BRANCH"

if [ "$MODE" = "workspace" ]; then
    echo "Mode: Workspace Changes (未提交的变更)"
    echo ""

    # 获取工作区变更文件列表（已修改、已暂存、未跟踪）
    echo "=== Changed Files ==="
    echo "-- Staged Changes (已暂存) --"
    git diff --name-status --cached
    echo ""
    echo "-- Unstaged Changes (已修改未暂存) --"
    git diff --name-status
    echo ""
    echo "-- Untracked Files (新文件未跟踪) --"
    git ls-files --others --exclude-standard
    echo ""

    # 获取详细差异
    echo "=== Detailed Changes ==="
    echo "-- Staged Changes --"
    git diff --cached -- '*.ts' '*.tsx' '*.vue' '*.js' '*.jsx' '*.scss' '*.css' '*.md' '*.json'
    echo ""
    echo "-- Unstaged Changes --"
    git diff -- '*.ts' '*.tsx' '*.vue' '*.js' '*.jsx' '*.scss' '*.css' '*.md' '*.json'
else
    # 分支对比模式
    echo "Mode: Branch Comparison"
    echo "Base Branch: $BASE_BRANCH"
    echo "Target Branch: $TARGET_BRANCH"
    echo ""

    # 获取变更文件列表
    echo "=== Changed Files ==="
    git diff --name-status "$BASE_BRANCH...$TARGET_BRANCH"
    echo ""

    # 获取详细差异
    echo "=== Detailed Changes ==="
    git diff "$BASE_BRANCH...$TARGET_BRANCH" -- '*.ts' '*.tsx' '*.vue' '*.js' '*.jsx' '*.scss' '*.css' '*.md' '*.json'
fi

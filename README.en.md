<p align="center"><a href="README.md">中文</a> · <strong>English</strong></p>

# horness

> One command to install Agent Harness governance into your project.

<a href="https://www.npmjs.com/package/@johnsonhuang4396/horness"><img src="https://img.shields.io/npm/v/@johnsonhuang4396/horness.svg" alt="npm version"></a>
<a href="https://www.npmjs.com/package/@johnsonhuang4396/horness"><img src="https://img.shields.io/npm/dm/@johnsonhuang4396/horness.svg" alt="npm downloads"></a>

horness distills the governance discipline of Agent Harness — **the P0→P10 phase pipeline, 8 roles, candidate-based selection, and evidence ledger** — into a **project-agnostic, cross-agent** template installed into any project with a single command. The same governance rules drive **Claude Code / Codex / OpenCode / Pi** simultaneously, with zero duplicated maintenance.

## Features

- **One-command setup**: `horness init` auto-detects your stack and generates a complete governance scaffold.
- **Four agents, one standard**: the same governance semantics are emitted in each agent's native syntax for Claude Code / Codex / OpenCode / Pi.
- **Single source of skills**: the `.agents/skills/` hub is shared by all agents; Claude gets an automatic mirror.
- **Evidence ledger**: every file edit / tool call is appended to the evidence chain, leaving auditable stage artifacts.
- **Safe & idempotent**: existing assets are backed up to `.harness.backup-<ts>/`, never overwritten; re-running skips gracefully.
- **Self-contained CLI**: Node 24 native TS, zod-validated args & config, bundled by tsdown into a single executable file with zero runtime deps.

## Installation

```bash
pnpm add -D @johnsonhuang4396/horness
# or install globally
pnpm add -g @johnsonhuang4396/horness
```

> Requires Node.js ≥ 24.

## Quick start

From your project root:

```bash
horness init --name MyApp
```

Then restart your agent session and run the self-check (Claude / OpenCode / Pi can run `/harness-check`; Codex is driven by AGENTS.md rules + skills).

## Usage

### `horness init` — initialize the governance scaffold

```bash
# Initialize in the current directory (default)
horness init --name MyApp

# Point at a target directory
horness init /path/to/project --name MyApp

# Choose agents: claude / codex / opencode / pi, comma-separated
horness init --name MyApp --agents codex,pi

# Install all four agents at once
horness init --name MyApp --agents all

# Preview the actions without writing anything
horness init --name MyApp --dry-run

# Force re-initialization (overwrite existing config)
horness init /path/to/project --name MyApp --force
```

| Option | Description | Default |
| ------ | ----------- | ------- |
| `[target]` | Target project directory (first positional arg) | Current dir `.` |
| `--name` | Project name | `undefined` |
| `--stack` | Stack (e.g. `react`, `java-spring`); skips auto-detection | Auto-detected |
| `--agents` | Agents to scaffold, comma-separated or `all` | `claude` |
| `--dry-run` | List actions only, write nothing | `false` |
| `--force` | Force re-init when already initialized | `false` |

### Other commands

```bash
horness --help       # Show usage
horness --version    # Show version
```

## What `init` generates

A shared, agent-agnostic core plus per-agent scaffolds in the target project:

```
.harness/                 # agent-agnostic runtime: scripts + templates (stage artifacts) + config
.agents/skills/           # shared skill hub (read by codex/opencode/pi)
AGENTS.md                 # shared working rules (read by all agents)
HARNESS.md                # governance usage guide
gitignore rules           # .harness runtime ignore rules (merged into target .gitignore)
.claude/                  # Claude Code: agents(8) + commands(7) + settings.json + skills mirror
.codex/                   # Codex: config.toml + agents/*.toml + rules/*.rules
.opencode/                # OpenCode: agent(8) + command(7) + plugin (evidence hook) + opencode.json
.pi/                      # Pi: agents(8) + prompts(7) + extensions (evidence hook)
```

## Cross-agent support

| Capability | Claude Code              | Codex                  | OpenCode                 | Pi                     |
| ---------- | ------------------------ | ---------------------- | ------------------------ | ---------------------- |
| Config     | `.claude/settings.json`  | `.codex/config.toml`   | `opencode.json`          | `.pi/settings.json`    |
| Roles (8)  | `.claude/agents/*.md`    | `.codex/agents/*.toml` | `.opencode/agent/*.md`   | `.pi/agents/*.md`      |
| Commands (7) | `.claude/commands/*.md` | none (skills/AGENTS)   | `.opencode/command/*.md` | `.pi/prompts/*.md`     |
| Skills     | `.claude/skills` (mirror) | `.agents/skills`       | `.agents/skills`         | `.agents/skills`       |
| Evidence hook | settings.json hook    | config.toml hooks      | plugin/evidence.ts       | extensions/evidence.ts |

- **Shared core**: `.harness/` runtime, `AGENTS.md` rules, `.agents/skills/` hub — all agents consume the same copy, zero duplication.
- **Single source of skills**: `.agents/skills/` (auto-read by codex/opencode/pi); only Claude needs `.claude/skills`, mirrored at install.
- **Roles/commands/config emitted per agent**: the same governance semantics in each agent's syntax (TOML vs MD frontmatter vs TS hook).

## Configuration

`.harness/config.json` is generated by `init` and records the project info, Assurance level, enabled roles & skills, and the installed agent list. Full schema: `template/.harness/config.schema.json`.

## Development

Build from source and test locally:

```bash
git clone <repo> && cd horness
pnpm install         # install dependencies
pnpm build           # tsdown bundle to dist/horness.mjs (self-contained single file)
pnpm test            # run tests (node --test)
pnpm typecheck       # tsc --noEmit type check
```

Test the global command locally:

```bash
pnpm setup           # first time: configure PNPM_HOME (writes to shell; restart to take effect)
pnpm link --global   # register the `horness` command globally
horness init --name Demo   # usable in any directory from here on
```

> After `pnpm build` the global command reflects the latest version (bin points to `dist/horness.mjs`).

## Notes

- OpenCode is an **independent CLI** (npm package `opencode-ai`, also installable via curl), not a dependency of this project; horness only generates its config scaffold. Install the OpenCode CLI separately to run it.
- The `rules/*.rules` (Starlark execution policy) for codex and the TS hooks for opencode/pi are **reference implementations** per current docs; the agents' APIs may evolve, so adjust against your target version when integrating (see the in-file comments).
- Codex has no custom slash commands; the phase pipeline is driven by AGENTS.md rules + skills + roles.
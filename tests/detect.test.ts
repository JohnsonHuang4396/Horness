import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { detectStack } from '../src/detect.ts'

function mockDir(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), 'horness-detect-'))
  for (const [rel, content] of Object.entries(files)) {
    const p = join(dir, rel)
    mkdirSync(join(dir, rel.split('/').slice(0, -1).join('/')), { recursive: true })
    writeFileSync(p, content)
  }
  return dir
}

describe('单项目技术栈探测', () => {
  it('探测 react + pnpm', () => {
    const dir = mockDir({ 'pnpm-lock.yaml': '', 'package.json': '{"dependencies":{"react":"^18"}}' })
    try {
      const r = detectStack(dir)
      expect(r.stack).toBe('react')
      expect(r.lang).toBe('ts')
      expect(r.packageManager).toBe('pnpm')
      expect(r.isMonorepo).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('探测 vue + npm', () => {
    const dir = mockDir({
      'package-lock.json': '',
      'package.json': '{"dependencies":{"vue":"^3"}}',
    })
    try {
      const r = detectStack(dir)
      expect(r.stack).toBe('vue')
      expect(r.packageManager).toBe('npm')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('vue 优先于 node（package.json 含 vue）', () => {
    const dir = mockDir({ 'package.json': '{"dependencies":{"vue":"^3"}}' })
    try {
      expect(detectStack(dir).stack).toBe('vue')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('探测 java-spring + maven', () => {
    const dir = mockDir({
      'pom.xml': '<project><deps>spring-boot-starter</deps></project>',
    })
    try {
      const r = detectStack(dir)
      expect(r.stack).toBe('java-spring')
      expect(r.lang).toBe('java')
      expect(r.packageManager).toBe('maven')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('探测 node（仅 package.json，无框架）', () => {
    const dir = mockDir({ 'package.json': '{"name":"svc"}' })
    try {
      expect(detectStack(dir).stack).toBe('node')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('空目录 → unknown', () => {
    const dir = mockDir({})
    try {
      const r = detectStack(dir)
      expect(r.stack).toBe('unknown')
      expect(r.packageManager).toBe('unknown')
      expect(r.isMonorepo).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('monorepo 技术栈探测', () => {
  const POM = '<project><deps>spring-boot-starter</deps></project>'
  const WS = 'packages:\n  - "backend/*"\n  - "frontend/*"\n'

  it('pnpm-workspace：backend(java-spring) + frontend(vue) + frontend2(react)', () => {
    const dir = mockDir({
      'pnpm-workspace.yaml': WS,
      'pnpm-lock.yaml': '',
      'backend/pom.xml': POM,
      'frontend/package.json': '{"dependencies":{"vue":"^3"}}',
      'frontend2/package.json': '{"dependencies":{"react":"^18"}}',
    })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(true)
      expect(r.stack).toBe('monorepo')
      expect(r.packageManager).toBe('pnpm')
      const rels = r.workspaces.map(w => w.rel)
      expect(rels).toContain('backend')
      expect(rels).toContain('frontend')
      expect(rels).toContain('frontend2')
      const backend = r.workspaces.find(w => w.rel === 'backend')
      expect(backend).toMatchObject({ stack: 'java-spring', lang: 'java', packageManager: 'maven' })
      const fe2 = r.workspaces.find(w => w.rel === 'frontend2')
      expect(fe2).toMatchObject({ stack: 'react', lang: 'ts' })
      // 子项目无自有锁文件时继承根的 pnpm
      expect(r.workspaces.find(w => w.rel === 'frontend')?.packageManager).toBe('pnpm')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('package.json workspaces 字段识别 monorepo', () => {
    const dir = mockDir({
      'package.json': '{"workspaces":["apps/*","packages/*"],"name":"root"}',
      'apps/web/package.json': '{"dependencies":{"react":"^18"}}',
      'packages/core/package.json': '{"name":"core"}',
    })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(true)
      expect(r.workspaces.find(w => w.rel.startsWith('apps/web'))).toMatchObject({
        stack: 'react',
      })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('lerna.json 识别 monorepo', () => {
    const dir = mockDir({
      'lerna.json': '{"packages":["packages/*"],"version":"independent"}',
      'packages/pkg-a/package.json': '{"dependencies":{"vue":"^3"}}',
    })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(true)
      expect(r.workspaces.some(w => w.stack === 'vue')).toBe(true)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('nx.json 识别 monorepo', () => {
    const dir = mockDir({
      'nx.json': '{"workspaceLayout":{"appsDir":"apps"}}',
      'apps/api/package.json': '{"dependencies":{"express":"^4"}}',
      'apps/web/package.json': '{"dependencies":{"react":"^18"}}',
    })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(true)
      expect(r.workspaces.some(w => w.rel.startsWith('apps/api'))).toBe(true)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('扫描时跳过 node_modules/.git/dist 噪音目录', () => {
    const dir = mockDir({
      'pnpm-workspace.yaml': WS,
      'node_modules/fake/package.json': '{"dependencies":{"react":"^18"}}',
      'apps/.git/package.json': '{"dependencies":{"vue":"^3"}}',
      'apps/web/package.json': '{"dependencies":{"react":"^18"}}',
    })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(true)
      const rels = r.workspaces.map(w => w.rel)
      expect(rels.some(p => p.includes('node_modules'))).toBe(false)
      expect(rels.some(p => p.includes('.git'))).toBe(false)
      expect(rels.some(p => p.includes('apps/web'))).toBe(true)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('monorepo 根目录无子项目信号时 workspaces 为空但 isMonorepo 为 true', () => {
    const dir = mockDir({ 'pnpm-workspace.yaml': WS })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(true)
      expect(r.stack).toBe('monorepo')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('子项目 package.json 声明 packageManager 字段时优先于继承', () => {
    const dir = mockDir({
      'pnpm-workspace.yaml': WS,
      'pnpm-lock.yaml': '',
      'apps/web/package.json': '{"name":"web","packageManager":"yarn@4"}',
      'apps/api/package.json': '{"name":"api"}',
    })
    try {
      const r = detectStack(dir)
      // apps/web 声明 yarn → yarn；apps/api 无声明 → 向上到根 pnpm
      expect(r.workspaces.find(w => w.rel === 'apps/web')?.packageManager).toBe('yarn')
      expect(r.workspaces.find(w => w.rel === 'apps/api')?.packageManager).toBe('pnpm')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('子项目自带更近锁文件时优先于根，不上溯其内置工具目录', () => {
    const dir = mockDir({
      'pnpm-workspace.yaml': WS,
      'pnpm-lock.yaml': '',
      'packages/a/package-lock.json': '',
      'packages/a/package.json': '{"name":"a"}',
      'packages/a/node_modules/dep/package.json': '{"name":"dep"}',
    })
    try {
      const r = detectStack(dir)
      // packages/a 自带 package-lock → 就近 npm（而非根 pnpm）；node_modules 噪音被跳过
      const a = r.workspaces.find(w => w.rel === 'packages/a')
      expect(a?.packageManager).toBe('npm')
      expect(r.workspaces.some(w => w.rel.includes('node_modules'))).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('rush.json 识别为 pnpm 驱动的工作区', () => {
    const dir = mockDir({
      'rush.json': '{"projects":[{"packageName":"@x/a"}]}',
      'apps/a/package.json': '{"dependencies":{"react":"^18"}}',
    })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(true)
      expect(r.packageManager).toBe('pnpm')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('多项目目录（无 workspace 标记）', () => {
  const POM = '<project><deps>spring-boot-starter</deps></project>'

  it('backend(java-spring) + frontend(vue) + frontend2(react) 全部识别为 multi-project', () => {
    const dir = mockDir({
      'backend/pom.xml': POM,
      'frontend/package.json': '{"dependencies":{"vue":"^3"}}',
      'frontend2/package.json': '{"dependencies":{"react":"^18"}}',
    })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(true)
      expect(r.stack).toBe('multi-project')
      const rels = r.workspaces.map(w => w.rel)
      expect(rels).toEqual(expect.arrayContaining(['backend', 'frontend', 'frontend2']))
      expect(r.workspaces.find(w => w.rel === 'backend')).toMatchObject({
        stack: 'java-spring',
        lang: 'java',
        packageManager: 'maven',
      })
      expect(r.workspaces.find(w => w.rel === 'frontend')).toMatchObject({ stack: 'vue' })
      expect(r.workspaces.find(w => w.rel === 'frontend2')).toMatchObject({ stack: 'react' })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('根目录本身是单项目时不再当作容器扫描', () => {
    const dir = mockDir({
      'package.json': '{"dependencies":{"react":"^18"}}',
      'src/package.json': '{"name":"nested"}',
    })
    try {
      const r = detectStack(dir)
      expect(r.isMonorepo).toBe(false)
      expect(r.stack).toBe('react')
      expect(r.workspaces).toEqual([])
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('空目录仍 unknown', () => {
    const dir = mockDir({})
    try {
      const r = detectStack(dir)
      expect(r.stack).toBe('unknown')
      expect(r.isMonorepo).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { detectStack } from './detect.ts';

function mockDir(files: Record<string, string>): string {
  const dir = mkdtempSync(join(tmpdir(), 'horness-detect-'));
  for (const [rel, content] of Object.entries(files)) {
    const p = join(dir, rel);
    mkdirSync(join(dir, rel.split('/').slice(0, -1).join('/')), { recursive: true });
    writeFileSync(p, content);
  }
  return dir;
}

test('探测 react + pnpm', () => {
  const dir = mockDir({
    'pnpm-lock.yaml': '',
    'package.json': '{"dependencies":{"react":"^18"}}',
  });
  try {
    const r = detectStack(dir);
    assert.equal(r.stack, 'react');
    assert.equal(r.lang, 'ts');
    assert.equal(r.packageManager, 'pnpm');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('探测 java-spring + maven', () => {
  const dir = mockDir({
    'pom.xml': '<project><dependencies><dependency>spring-boot-starter</dependency></dependencies></project>',
  });
  try {
    const r = detectStack(dir);
    assert.equal(r.stack, 'java-spring');
    assert.equal(r.lang, 'java');
    assert.equal(r.packageManager, 'maven');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('空目录 → unknown', () => {
  const dir = mockDir({});
  try {
    const r = detectStack(dir);
    assert.equal(r.stack, 'unknown');
    assert.equal(r.packageManager, 'unknown');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('vue 优先于 node（package.json 含 vue）', () => {
  const dir = mockDir({
    'package.json': '{"dependencies":{"vue":"^3"}}',
  });
  try {
    const r = detectStack(dir);
    assert.equal(r.stack, 'vue');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
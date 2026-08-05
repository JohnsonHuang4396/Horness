import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateConfig, validateConfig, REQUIRED_SKILLS } from './config.ts';

test('generateConfig 产出合法配置', () => {
  const cfg = generateConfig({ name: 'MyApp', stack: 'react', packageManager: 'pnpm' });
  assert.equal(cfg.schema_version, 1);
  assert.equal(cfg.project.name, 'MyApp');
  assert.equal(cfg.project.stack, 'react');
  assert.equal(cfg.harness.assuranceDefault, 'standard');
  assert.deepEqual(cfg.harness.installedSkills, [...REQUIRED_SKILLS]);
  assert.equal(cfg.harness.hooks.FileChanged, '.harness/scripts/hook-file-change.sh');
  assert.equal(validateConfig(cfg).ok, true);
});

test('validateConfig 拒绝缺 project', () => {
  const r = validateConfig({ schema_version: 1, harness: {} });
  assert.equal(r.ok, false);
  assert.ok(r.errors.some((e) => e.includes('project')));
});

test('validateConfig 拒绝非法 assuranceDefault', () => {
  const cfg = generateConfig({ name: 'X' });
  (cfg.harness as { assuranceDefault: string }).assuranceDefault = 'bogus';
  const r = validateConfig(cfg);
  assert.equal(r.ok, false);
  assert.ok(r.errors.some((e) => e.includes('assuranceDefault')));
});

test('validateConfig 拒绝非对象', () => {
  assert.equal(validateConfig(null).ok, false);
  assert.equal(validateConfig('x').ok, false);
});

test('generateConfig 默认 agents 为 claude', () => {
  const cfg = generateConfig({ name: 'X' });
  assert.deepEqual(cfg.harness.agents, ['claude']);
  assert.equal(validateConfig(cfg).ok, true);
});

test('generateConfig 支持多 agent 清单', () => {
  const cfg = generateConfig({ name: 'X', agents: ['codex', 'opencode', 'pi'] });
  assert.deepEqual(cfg.harness.agents, ['codex', 'opencode', 'pi']);
  assert.equal(validateConfig(cfg).ok, true);
});
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // 只跑 tests/ 目录；排除 playground 里的演示工程测试与打包产物。
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules/**', 'dist/**', 'playground/**'],
  },
})
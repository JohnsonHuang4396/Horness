// tsdown 打包配置：把 bin/horness.ts 打成单个自包含可执行文件（含 zod/consola/registry/版本号）。
import { readFileSync } from 'node:fs'
import { defineConfig } from 'tsdown'

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'))

export default defineConfig({
  entry: ['./bin/horness.ts'],
  outDir: 'dist',
  format: ['esm'],
  platform: 'node',
  target: 'node24',
  clean: true,
  // 默认会 externalize dependencies；alwaysBundle 用正则覆盖 consola 全部子路径（./utils 等），
  // 把 zod/consola 全打进单文件，产物自包含。
  deps: {
    alwaysBundle: ['zod', /^consola/],
  },
  // 把版本号注入 `--version`，避免运行时依赖 ../package.json。
  define: {
    __HORNESS_VERSION__: JSON.stringify(pkg.version),
    // 打包后模板在 dist/template，注入让 templateRoot() 指向它，产物自包含。
    __HARNESS_TEMPLATE_ROOT__: JSON.stringify('./template/'),
  },
  // 把 template/ 拷进 dist/template，随产物一起分发（脚手架模板无法内联进 JS）。
  // to 相对 cwd 解析，且会拼上 basename(from)，故写 dist 得到 dist/template。
  copy: {
    from: 'template',
    to: 'dist',
    flatten: false,
  },
  name: 'horness',
})
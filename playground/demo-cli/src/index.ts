// demo-cli：最小 Node CLI。当前支持 greet 子命令；--version 由本次 harness 任务加入。
const VERSION = "1.0.0"

export function greet(name: string): string {
  return `hello, ${name || "world"}`
}

export function version(): string {
  return VERSION
}

if (import.meta.main) {
  const [, , sub] = process.argv
  if (sub === "--version" || sub === "-v") {
    console.log(version())
  } else if (sub === "greet") {
    console.log(greet(process.argv[3]))
  } else {
    console.log("usage: demo-cli greet <name> | demo-cli --version")
  }
}
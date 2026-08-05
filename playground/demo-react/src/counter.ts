// counter 纯逻辑（与 React 解耦，便于 node 直接验证）
export function increment(n: number): number {
  return n + 1
}
export function decrement(n: number): number {
  return n - 1
}

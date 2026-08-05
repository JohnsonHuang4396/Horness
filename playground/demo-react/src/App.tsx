import { useState } from "react"
import { decrement, increment } from "./counter"

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount((n) => increment(n))}>+</button>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount((n) => decrement(n))}>-</button>
    </div>
  )
}

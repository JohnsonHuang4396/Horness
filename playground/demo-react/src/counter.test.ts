import assert from "node:assert/strict"
import { test } from "node:test"
import { decrement, increment } from "./counter.ts"

test("increment +1", () => assert.equal(increment(0), 1))
test("decrement -1", () => assert.equal(decrement(1), 0))

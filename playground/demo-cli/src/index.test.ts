import assert from "node:assert/strict"
import { test } from "node:test"
import { greet, version } from "./index.ts"

test("greet 输出", () => assert.equal(greet("harness"), "hello, harness"))
test("version 输出 1.0.0", () => assert.equal(version(), "1.0.0"))
import test from "ava"

import React from "react"
import { createRenderer } from "react-addons-test-utils"
import expect from "expect"
import expectJSX from "expect-jsx"

import OfflineBanner from "../index.js"

expect.extend(expectJSX)

test("should render nothing by default", () => {
  const renderer = createRenderer()
  renderer.render(
    <OfflineBanner />
  )
  expect(renderer.getRenderOutput())
  .toEqual(null)
})

// @todo mock "offline-plugin/runtime" and write more test

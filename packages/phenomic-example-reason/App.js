import "whatwg-fetch"
import React from "react"
import { Router, Route, browserHistory } from "react-router"
import { createApp, createContainer } from "phenomic-preset-default/lib/client"

const wrapReComponent = Module => {
  console.log(
    createContainer(Module.comp, Module.queries),
    Module.comp,
    Module.queries,
  )
  return createContainer(Module.comp, Module.queries)
}

const Homepage = wrapReComponent(require("./lib/js/components/homepage"))

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={Homepage} />
  </Router>
))

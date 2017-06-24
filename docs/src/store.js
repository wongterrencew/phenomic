import { combineReducers } from "redux"
import createStore from "wongterrencew-fork-phenomic/lib/redux/createStore"
// eslint-disable-next-line import/no-namespace
import * as phenomicReducers from "wongterrencew-fork-phenomic/lib/redux/modules"

const store = createStore(
  combineReducers(phenomicReducers),
  { ...(typeof window !== "undefined") && window.__INITIAL_STATE__ },
)

export default store

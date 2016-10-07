// @flow

import React from "react"

import OfflineBanner from "../OfflineBanner"

const PhenomicAppContainer = (props: { children: any }) => {
  if (
    process.env.PHENOMIC_OFFLINE_MODE &&
    process.env.PHENOMIC_OFFLINE_BANNER
  ) {
    return (
      <div>
        <OfflineBanner />
        { props.children }
      </div>
    )
  }

  return props.children
}

export default PhenomicAppContainer

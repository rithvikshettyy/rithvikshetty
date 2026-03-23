"use client"

import React from 'react'
import CreativeHeader from './creative-header'

const CreativeTeaser = () => {
  return (
    <CreativeHeader 
      row1={{ left: "CRAFTING", center: "with", right: "INTENT" }}
      row2={{ left: "pixel", center: "PERFECT", right: "LOGIC" }} 
      indexOffset={1}
      floatingImage="/rocket3d.png"
    />
  )
}

export default CreativeTeaser

"use client"

import React, { useEffect, useRef, useState } from 'react'

const AsciiArt = () => {
    const [frame, setFrame] = useState('')

    useEffect(() => {
        let angleX = 0
        let angleY = 0
        let animationFrameId: number

        const chars = " .:-=+*#%@"
        const width = 80
        const height = 40
        
        const render = () => {
            const buffer = new Array(width * height).fill(' ')
            const zBuffer = new Array(width * height).fill(0)
            
            const radius = 1.5
            
            for (let phi = 0; phi < Math.PI; phi += 0.1) {
                for (let theta = 0; theta < 2 * Math.PI; theta += 0.05) {
                    // 3D coordinates
                    let x = radius * Math.sin(phi) * Math.cos(theta)
                    let y = radius * Math.sin(phi) * Math.sin(theta)
                    let z = radius * Math.cos(phi)

                    // Rotation X
                    let ny = y * Math.cos(angleX) - z * Math.sin(angleX)
                    let nz = y * Math.sin(angleX) + z * Math.cos(angleX)
                    y = ny
                    z = nz

                    // Rotation Y
                    let nx = x * Math.cos(angleY) + z * Math.sin(angleY)
                    nz = -x * Math.sin(angleY) + z * Math.cos(angleY)
                    x = nx
                    z = nz

                    // Projection
                    const ooz = 1 / (z + 4)
                    const xp = Math.floor(width / 2 + (x * 40 * ooz))
                    const yp = Math.floor(height / 2 + (y * 20 * ooz))

                    if (xp >= 0 && xp < width && yp >= 0 && yp < height) {
                        const idx = yp * width + xp
                        if (ooz > zBuffer[idx]) {
                            zBuffer[idx] = ooz
                            const luminance = (Math.cos(phi) * Math.sin(angleX) + Math.sin(phi) * Math.sin(theta) * Math.cos(angleX) + 1) / 2
                            const charIdx = Math.floor(luminance * (chars.length - 1))
                            buffer[idx] = chars[charIdx]
                        }
                    }
                }
            }

            let output = ""
            for (let i = 0; i < buffer.length; i++) {
                output += buffer[i]
                if ((i + 1) % width === 0) output += "\n"
            }
            
            setFrame(output)
            angleX += 0.02
            angleY += 0.03
            animationFrameId = requestAnimationFrame(render)
        }

        render()
        return () => cancelAnimationFrame(animationFrameId)
    }, [])

    return (
        <div className="font-mono text-[5px] md:text-[7px] lg:text-[8px] leading-[0.8] text-white/30 select-none pointer-events-none tracking-[0.1em]">
            <pre className="inline-block text-left bg-transparent whitespace-pre">
                {frame}
            </pre>
        </div>
    )
}

export default AsciiArt

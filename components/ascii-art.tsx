"use client"

import React, { useEffect, useRef, useState } from 'react'

interface AsciiArtProps {
    width?: number
    height?: number
    fontSize?: string
    color?: string
    className?: string
    mode?: "object" | "field"
    speedX?: number
    speedY?: number
    disintegrate?: number
}

const AsciiArt = ({ 
    width = 80, 
    height = 40, 
    fontSize = "text-[5px] md:text-[7px] lg:text-[8px]", 
    color = "text-white/60",
    className = "",
    mode = "object",
    speedX = 0.02,
    speedY = 0.03,
    disintegrate = 0
}: AsciiArtProps) => {
    const [frame, setFrame] = useState('')
    const mousePos = useRef({ x: 0, y: 0 })
    const currentDis = useRef(0)
    const targetDis = useRef(0)

    // Update target disintegration ref smoothly when prop changes
    useEffect(() => {
        targetDis.current = disintegrate
    }, [disintegrate])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            }
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useEffect(() => {
        let time = 0
        let angleX = Math.random() * Math.PI
        let angleY = Math.random() * Math.PI
        let animationFrameId: number

        const chars = " .:-=+*#%@"
        
        const render = () => {
            // Smoothly interpolate currentDis toward targetDis.current
            currentDis.current += (targetDis.current - currentDis.current) * 0.1
            const dVal = currentDis.current

            const buffer = new Array(width * height).fill(' ')
            
            if (mode === "field") {
                // ... (field mode code)
                const mx = mousePos.current.x
                const my = mousePos.current.y
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        const idx = y * width + x
                        const dx = (x / width) * 2 - 1 - mx
                        const dy = (y / height) * 2 - 1 - my
                        const dist = Math.sqrt(dx * dx + dy * dy)
                        const val = Math.sin(x * 0.1 + time + dist * 5) * Math.cos(y * 0.1 + time * 0.5)
                        const val2 = Math.sin((x + y) * 0.05 + time * 0.8 - dist * 3)
                        const combined = (val + val2 + 2) / 4
                        const charIdx = Math.floor(combined * (chars.length - 1))
                        buffer[idx] = chars[Math.max(0, Math.min(chars.length - 1, charIdx))]
                    }
                }
            } else {
                // Object mode: 3D rotating Torus with Smooth Disintegration
                const zBuffer = new Array(width * height).fill(0)
                const R1 = 1
                const R2 = 2
                
                for (let j = 0; j < 6.28; j += 0.07) {
                    for (let i = 0; i < 6.28; i += 0.02) {
                        const c = Math.sin(i)
                        const d = Math.cos(j)
                        const e = Math.sin(angleX)
                        const f = Math.sin(j)
                        const g = Math.cos(angleX)
                        const h = d + 2
                        const D = 1 / (c * h * e + f * g + 5)
                        const l = Math.cos(i)
                        const m = Math.cos(angleY)
                        const n = Math.sin(angleY)
                        const t = c * h * g - f * e
                        
                        let x = Math.floor(width / 2 + (width / 6) * D * (l * h * m - t * n))
                        let y = Math.floor(height / 2 + (height / 3) * D * (l * h * n + t * m))
                        
                        // Apply smooth disintegration offset
                        if (dVal > 0.01) {
                            x += Math.floor((Math.random() - 0.5) * dVal * width * 1.5)
                            y += Math.floor((Math.random() - 0.5) * dVal * height * 1.5)
                        }

                        if (height > y && y > 0 && x > 0 && width > x) {
                            const o = x + width * y
                            const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n))
                            
                            if (D > zBuffer[o]) {
                                zBuffer[o] = D
                                buffer[o] = chars[Math.max(0, Math.min(chars.length - 1, N > 0 ? N : 0))]
                            }
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
            time += 0.05
            angleX += speedX
            angleY += speedY
            animationFrameId = requestAnimationFrame(render)
        }

        render()
        return () => cancelAnimationFrame(animationFrameId)
    }, [width, height, mode, speedX, speedY])

    return (
        <div className={`font-mono ${fontSize} ${color} select-none pointer-events-none ${className}`}>
            <pre className="inline-block text-left bg-transparent whitespace-pre leading-[inherit] tracking-[inherit]">
                {frame}
            </pre>
        </div>
    )
}

export default AsciiArt

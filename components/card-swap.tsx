'use client'

// CardSwap (React Bits) — a 3D stack of cards; the front card drops away and
// tucks under the pile on a timer, with an elastic settle.
import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import './card-swap.css'

type CardProps = React.HTMLAttributes<HTMLDivElement> & { customClass?: string }

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
))
Card.displayName = 'Card'

const makeSlot = (i: number, distX: number, distY: number, total: number) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
})

const placeNow = (el: HTMLDivElement | null, slot: ReturnType<typeof makeSlot>, skew: number) =>
  el &&
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  })

type CardSwapProps = {
  width?: number | string
  height?: number | string
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  onCardClick?: (idx: number) => void
  skewAmount?: number
  easing?: 'linear' | 'elastic'
  /** false = no timer; swaps fire only when `step` increments. */
  autoplay?: boolean
  /** Controlled step counter — each increment flips one card. */
  step?: number
  children: React.ReactNode
}

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  autoplay = true,
  step,
  children,
}: CardSwapProps) => {
  const config = !autoplay
    ? {
        // Scroll-driven: snappy with a slight overshoot, so a flip completes
        // well within one scroll step and never lags behind the next one.
        ease: 'back.out(1.2)',
        durDrop: 0.55,
        durMove: 0.55,
        durReturn: 0.55,
        promoteOverlap: 0.6,
        returnDelay: 0.1,
      }
    : easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        }

  const childArr = useMemo(() => Children.toArray(children), [children])
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length],
  )

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i))

  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined)
  const container = useRef<HTMLDivElement>(null)
  // Latest swap()/swapBack() for controlled (scroll-driven) mode.
  const swapFnRef = useRef<(() => void) | null>(null)
  const swapBackFnRef = useRef<(() => void) | null>(null)
  const prevStepRef = useRef(step ?? 0)

  useEffect(() => {
    const total = refs.length
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount))

    const swap = () => {
      if (order.current.length < 2) return

      // If the previous flip is still mid-flight, jump it to its end state
      // first — overlapping timelines on the same cards desync the pile.
      if (tlRef.current?.isActive()) tlRef.current.progress(1)

      const [front, ...rest] = order.current
      const elFront = refs[front].current
      if (!elFront) return
      const tl = gsap.timeline()
      tlRef.current = tl

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      })

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`)
      rest.forEach((idx, i) => {
        const el = refs[idx].current
        if (!el) return
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, 'promote')
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        )
      })

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length)
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`)
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex })
        },
        undefined,
        'return',
      )
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return',
      )

      tl.call(() => {
        order.current = [...rest, front]
      })
    }

    // Reverse of swap(): the card most recently tucked under the pile drops
    // back down in front, while the visible cards shift one slot deeper.
    const swapBack = () => {
      if (order.current.length < 2) return
      if (tlRef.current?.isActive()) tlRef.current.progress(1)

      const arr = order.current
      const returning = arr[arr.length - 1]
      const visible = arr.slice(0, -1)
      const elBack = refs[returning].current
      if (!elBack) return

      const tl = gsap.timeline()
      tlRef.current = tl

      // Shift every visible card one slot deeper.
      visible.forEach((idx, i) => {
        const el = refs[idx].current
        if (!el) return
        const slot = makeSlot(i + 1, cardDistance, verticalDistance, refs.length)
        tl.set(el, { zIndex: slot.zIndex }, 0)
        tl.to(
          el,
          { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease },
          i * 0.05,
        )
      })

      // Teleport the returning card below the front slot, on top of the pile,
      // then raise it into place — the drop-away animation played backwards.
      const frontSlot = makeSlot(0, cardDistance, verticalDistance, refs.length)
      tl.set(elBack, { x: frontSlot.x, z: frontSlot.z, y: frontSlot.y + 500, zIndex: refs.length + 1 }, 0)
      tl.to(elBack, { y: frontSlot.y, duration: config.durDrop, ease: config.ease }, 0.05)
      tl.set(elBack, { zIndex: frontSlot.zIndex }, '>')

      tl.call(() => {
        order.current = [returning, ...visible]
      })
    }

    swapFnRef.current = swap
    swapBackFnRef.current = swapBack

    if (!autoplay) return

    swap()
    intervalRef.current = setInterval(swap, delay)

    if (pauseOnHover) {
      const node = container.current!
      const pause = () => {
        tlRef.current?.pause()
        clearInterval(intervalRef.current)
      }
      const resume = () => {
        tlRef.current?.play()
        intervalRef.current = setInterval(swap, delay)
      }
      node.addEventListener('mouseenter', pause)
      node.addEventListener('mouseleave', resume)
      return () => {
        node.removeEventListener('mouseenter', pause)
        node.removeEventListener('mouseleave', resume)
        clearInterval(intervalRef.current)
      }
    }
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, autoplay])

  // Controlled mode — one flip per step increment, one un-flip per decrement
  // (scroll-driven). Fast scrolls can jump several steps at once, so loop.
  useEffect(() => {
    if (step == null) return
    const prev = prevStepRef.current
    if (step > prev) {
      for (let i = prev; i < step; i++) swapFnRef.current?.()
    } else if (step < prev) {
      for (let i = prev; i > step; i--) swapBackFnRef.current?.()
    }
    prevStepRef.current = step
  }, [step])

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as React.ReactElement<any>, {
          key: i,
          ref: refs[i],
          style: { width, height, ...((child as React.ReactElement<any>).props.style ?? {}) },
          onClick: (e: React.MouseEvent) => {
            ;(child as React.ReactElement<any>).props.onClick?.(e)
            onCardClick?.(i)
          },
        })
      : child,
  )

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  )
}

export default CardSwap

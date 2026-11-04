// Remembers that the visitor left the homepage from the "Drag to explore"
// sphere, so coming back (Back button or browser back) lands on that section
// instead of the top of the page.
//
// Module state on purpose: it survives client-side navigations but resets on a
// full page load, so a reload or a fresh visit never jumps to the sphere.
let returnToWork = false

export function markReturnToWork() {
  returnToWork = true
}

export function hasReturnToWork() {
  return returnToWork
}

export function consumeReturnToWork() {
  const v = returnToWork
  returnToWork = false
  return v
}

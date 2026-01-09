import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(() => {
    if (typeof window === "undefined") return undefined
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(mql.matches)

    // Add listener with fallback for older browsers (Safari)
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
    } else if (typeof mql.addListener === "function") {
      // @ts-ignore - older API
      mql.addListener(onChange)
    }

    // Ensure state is correct on mount
    setIsMobile(mql.matches)

    return () => {
      if (typeof mql.removeEventListener === "function") {
        mql.removeEventListener("change", onChange)
      } else if (typeof mql.removeListener === "function") {
        // @ts-ignore - older API
        mql.removeListener(onChange)
      }
    }
  }, [])

  return !!isMobile
}

import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(() => {
    // Check if window is available (SSR safe)
    if (typeof window === "undefined") return undefined
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    // Use a simple function here (do NOT call hooks inside effects)
    const onChange = () => {
      setIsMobile(mql.matches)
    }

    // Set initial state
    setIsMobile(mql.matches)

    // Add listener with modern API, fallback to older API
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
    } else if (typeof mql.addListener === "function") {
      // @ts-ignore - older API
      mql.addListener(onChange)
    }

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

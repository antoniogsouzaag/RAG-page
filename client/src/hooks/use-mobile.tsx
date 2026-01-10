import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Stable initial value to prevent flickering - use sync check
function getInitialMobileState(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth < MOBILE_BREAKPOINT
}

// Cache the initial value at module load to prevent hydration mismatch
const INITIAL_IS_MOBILE = typeof window !== "undefined" 
  ? window.innerWidth < MOBILE_BREAKPOINT 
  : false

export function useIsMobile(): boolean {
  // Use a stable initial value (not undefined) to prevent layout shifts
  const [isMobile, setIsMobile] = React.useState<boolean>(INITIAL_IS_MOBILE)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    // Mark as hydrated on first effect
    setIsHydrated(true)
    
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Sync with actual value immediately
    setIsMobile(mql.matches)
    
    const onChange = () => {
      setIsMobile(mql.matches)
    }

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

  return isMobile
}

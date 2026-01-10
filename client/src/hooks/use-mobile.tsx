import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Immediate synchronous detection at module load - prevents any flash
const getIsMobileSync = (): boolean => {
  if (typeof window === "undefined") return false
  return window.innerWidth < MOBILE_BREAKPOINT
}

// Initialize cache immediately at module load - this runs BEFORE any component renders
const INITIAL_IS_MOBILE = typeof window !== "undefined" ? getIsMobileSync() : false

// Stable reference that never changes after initial load
let stableValue = INITIAL_IS_MOBILE

export function useIsMobile(): boolean {
  // CRITICAL: Use stable value as initial state - this prevents flash
  // The value is computed synchronously before first render
  const [isMobile, setIsMobile] = React.useState<boolean>(stableValue)
  
  React.useEffect(() => {
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Only update if device orientation actually changes (rare)
    const onChange = () => {
      const newValue = mql.matches
      if (newValue !== stableValue) {
        stableValue = newValue
        setIsMobile(newValue)
      }
    }

    // Add listener
    mql.addEventListener("change", onChange)

    return () => {
      mql.removeEventListener("change", onChange)
    }
  }, [])

  return isMobile
}

import * as React from "react"

const MOBILE_BREAKPOINT = 768

// Cache the initial value at module load to prevent hydration mismatch and re-renders
let cachedIsMobile: boolean | null = null

function getInitialMobileState(): boolean {
  if (typeof window === "undefined") return false
  if (cachedIsMobile !== null) return cachedIsMobile
  cachedIsMobile = window.innerWidth < MOBILE_BREAKPOINT
  return cachedIsMobile
}

// Initialize immediately at module load
if (typeof window !== "undefined") {
  getInitialMobileState()
}

export function useIsMobile(): boolean {
  // Use cached value - NEVER causes a re-render on initial mount
  const [isMobile, setIsMobile] = React.useState<boolean>(() => cachedIsMobile ?? false)
  const initializedRef = React.useRef(false)

  React.useEffect(() => {
    // Skip if already initialized with correct value
    if (initializedRef.current) return
    initializedRef.current = true
    
    if (typeof window === "undefined") return

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Only update if actually different to prevent re-render
    if (mql.matches !== isMobile) {
      cachedIsMobile = mql.matches
      setIsMobile(mql.matches)
    }
    
    const onChange = () => {
      cachedIsMobile = mql.matches
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
  }, [isMobile])

  return isMobile
}

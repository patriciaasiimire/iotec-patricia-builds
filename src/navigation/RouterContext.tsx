import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { PATHS, type AppPath } from './paths'

interface NavigateOptions {
  replace?: boolean
}


interface RouterContextValue {
  /*
First, we add search: string — that's the router's memory of the ?id=3 part.
Second, to: AppPath becomes to: string.
This is the actual blocker you hit before: AppPath is a union type that only allows
'/' | '/blog' | '/admin' | ... — so navigate('/blog?id=3') was a compile error, TypeScript refusing to let a non-path string through.
By widening to string we allow query strings, and we take responsibility for splitting them ourselves
*/ 
  pathname: string
  search: string
  navigate: (to: string, options?: NavigateOptions) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

function normalizePath(rawPath: string): string {
  if (!rawPath || rawPath === '/') return PATHS.LANDING
  return rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [pathname, setPathname] = useState<string>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : PATHS.LANDING,
  )
  /*
  The router keeps the current path in state so React re-renders when it changes.
  window.location.search is the browser's name for everything from the
  ? onward (e.g. ?id=3) — it does not include the ? itself... actually it does: location.search returns "?id=3" including the ?.
  We mirror that into state for the same reason as pathname: state changes trigger re-renders; reading window.location directly does not.
  */
  const [search, setSearch] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.search : '',
  )

  useEffect(() => {
    /*
    When the user hits the browser Back button, the browser fires popstate and we must sync both pieces of state.
    If we only synced pathname, going back from /blog?id=3 to /blog?id=1 would re-render but the page would still think the id is 3.
    */
    const handlePopState = () => {
      setPathname(normalizePath(window.location.pathname))
      setSearch(window.location.search)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
/*
- to.split('?') tears '/blog?id=3' into two pieces: rawPath = '/blog', rawSearch = 'id=3'. Array destructuring grabs them in one line. (If there's no ?, rawSearch is undefined.)
- The path gets normalized alone — that's why route matching in AppRouter still works: it compares against pathname, which stays a clean /blog.
- fullTarget is what actually goes into the browser's address bar via pushState — so the URL shows /blog?id=3.
- But our React state stores the two pieces separately: pathname = '/blog' (for matching routes) and search = '?id=3' (for pages to read).
- The guard line changed too: we now compare the full current URL against the full target, so navigating from /blog?id=1 to /blog?id=3 isn't wrongly skipped as "same page".
*/
  const navigate = useCallback((to: string, options?: NavigateOptions) => {
    const [rawPath, rawSearch] = to.split('?')
    const normalizedTarget = normalizePath(rawPath)
    const fullTarget = normalizePath + (rawSearch ? `?${rawSearch}` : '')

    if (window.location.pathname + window.location.search !== fullTarget) {
      if (options?.replace) {
        window.history.replaceState({}, '', fullTarget)
      } else {
        window.history.pushState({}, '', fullTarget)
      }
    }
    setPathname(normalizePath)
    setSearch(rawSearch ? `?${rawSearch}` : '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const value = useMemo(() => ({ pathname, search, navigate }), [pathname, search, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useLocation() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useLocation must be used within a RouterProvider')
  }
  return { pathname: context.pathname, search: context.search }
  // Any page can now call const { search } = useLocation() and get '?id=3'.
}

export function useNavigate() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useNavigate must be used within a RouterProvider')
  }
  return context.navigate
}

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: AppPath
  replace?: boolean
}

export function Link({ to, replace, onClick, children, ...rest }: LinkProps) {
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return
    }
    event.preventDefault()
    navigate(to, { replace })
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}

export interface NavLinkProps extends Omit<LinkProps, 'className' | 'children'> {
  to: AppPath
  className?: string | ((state: { isActive: boolean }) => string)
  children?: ReactNode | ((state: { isActive: boolean }) => ReactNode)
}

export function NavLink({ to, className, children, ...rest }: NavLinkProps) {
  const { pathname } = useLocation()
  const isActive = pathname === to

  const resolvedClassName =
    typeof className === 'function' ? className({ isActive }) : className

  const resolvedChildren =
    typeof children === 'function' ? children({ isActive }) : children

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={resolvedClassName}
      {...rest}
    >
      {resolvedChildren}
    </Link>
  )
}


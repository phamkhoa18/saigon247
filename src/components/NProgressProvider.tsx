'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export default function NProgressProvider() {
  const pathname = usePathname()
  const previousPath = useRef(pathname)

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a') as HTMLAnchorElement | null
      if (anchor?.href && anchor.origin === location.origin) {
        NProgress.start()
      }
    }

    window.addEventListener('click', handleLinkClick)

    return () => {
      window.removeEventListener('click', handleLinkClick)
    }
  }, [])

  useEffect(() => {
    if (previousPath.current !== pathname) {
      NProgress.done()
      previousPath.current = pathname
    }
  }, [pathname])

  return null
}

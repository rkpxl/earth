import React, { ReactNode, Suspense } from 'react'
import { validateToken } from '../../Utils/signin'
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter } from 'next/router'
import { getCookie } from '../../Utils/cookieUtils'

interface LayoutProps {
  children: ReactNode
  isAuthenticated?: boolean // Allow for prop override
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated }) => {
  const router = useRouter()
  const currentPath = router.pathname

  // Redirect if not authenticated on the server
  if (!isAuthenticated && typeof localStorage === 'undefined' && currentPath != '/login') {
    return <CircularProgress /> // Show loading placeholder
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const isTokenValid = validateToken()
    if (!isTokenValid && currentPath != '/login') {
      router.push('/login')
    }
  }, [router, currentPath])

  return <Suspense fallback={<CircularProgress />}>{children}</Suspense>
}

export default Layout

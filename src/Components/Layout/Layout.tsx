import React, { ReactNode, Suspense } from 'react';
import { validateToken } from '../../Utils/signup';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  
  React.useEffect(() => {
    if(typeof localStorage !== 'undefined' && !localStorage.getItem('exp')) {
      router.push('/login')
    } else {
      const isToeknFine = validateToken()
      if(!isToeknFine) {
        router.push('/login')
      }
    }
  }, [])

  return (
   <Suspense fallback={<CircularProgress />}>
    {children}
   </Suspense>
  );
};

export default Layout;

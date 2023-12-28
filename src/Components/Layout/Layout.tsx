import React, { ReactNode, Suspense } from 'react';
import { validateToken } from '../../Utils/signin';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { token } = router.query;
  
  React.useEffect(() => {
    if(typeof localStorage !== 'undefined' && !localStorage.getItem('exp')) {
      if (currentPath !== '/auth/update-password' || !token) {
        router.push('/login');
      }
    } else {
      const isToeknFine = validateToken()
      if(!isToeknFine) {
        router.push('/login')
      }
    }
  }, [])

  if( typeof localStorage === 'undefined') {
    return null
  }

  return (
   <Suspense fallback={<CircularProgress />}>
    {children}
   </Suspense>
  );
};

export default Layout;

export async function getServerSideProps() {
  return {
    props: {},
  };
}

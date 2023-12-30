import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { DashboardNavbar } from './dashboard-navbar';
import { Sidebar } from '../../Components/Home/Sidebar';
import { Navbar } from '../../Components/Home/Navbar'
import React from 'react';
import { validateToken } from '../../Utils/signup';
import { useRouter } from 'next/router';
import Layout from '../../Components/Layout/Layout';

const HomeLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

const HomeLayout = (props : any) => {
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get the user type from localStorage
    const userType = localStorage.getItem('type');

    // Update the isAdmin state based on the user type
    setIsAdmin(userType === 'superAdmin' || userType === 'admin');
  }, []);

  return (
    <main>
      {/* <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} /> */}
      <Sidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
        isAdmin={isAdmin}
      />
      <Navbar onSidebarOpen={() => setSidebarOpen(true)} />
        <HomeLayoutRoot>
          <Box
            sx={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            {children}
          </Box>
        </HomeLayoutRoot>
    </main>
  );
};

export default HomeLayout
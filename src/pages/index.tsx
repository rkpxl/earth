import React, { useContext } from 'react'
import type { NextPage } from 'next'
import Layout from '../Scenes/Home/HomeLayout'
import HomePage from '../Scenes/Home/Home'
import axiosInstance from '../Utils/axiosUtil'

const HomeContext = React.createContext<any>(null);

const Home: NextPage = ({ isAuthenticated, compliances, departments, allProtocols, allApprovals } : any) => {
  return (
    <HomeContext.Provider value={{ isAuthenticated, compliances, departments, allProtocols, allApprovals }}>
      <HomePage />
    </HomeContext.Provider>
  )
}

export const getServerSideProps = async function getServerSideProps(context : any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context);
    if(response.status === 200) {
      const compliances = await axiosInstance.get('/compliance');
      const departments = await axiosInstance.get('/department');
      const allProtocols = await axiosInstance.get('/protocol/get-all');
      const allApprovals = await axiosInstance.get('/approval/all-active');
      return {
        props: {
          isAuthenticated: true,
          compliances: compliances.data,
          departments: departments.data,
          allProtocols: allProtocols.data,
          allApprovals: allApprovals.data,
        },
      };
    }
  } catch (err) {
    console.error("home server error")
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}

export default Home

export const useHomeContext = () => {
  return useContext(HomeContext);
};
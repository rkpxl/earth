import React, { useContext } from 'react'
import type { NextPage } from 'next'
import Layout from '../Scenes/Home/HomeLayout'
import HomePage from '../Scenes/Home/Home'
import axiosInstance from '../Utils/axiosUtil'

const HomeContext = React.createContext<any>(null);

const Home: NextPage = ({ isAuthenticated, compliances, departments } : any) => {
  return (
    <Layout>
      <HomeContext.Provider value={{ isAuthenticated, compliances, departments }}>
        <HomePage />
      </HomeContext.Provider>
    </Layout>
  )
}

export const getServerSideProps = async function getServerSideProps(context : any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context);
    if(response.status === 200) {
      const compliances = await axiosInstance.get('/compliance');
      const departments = await axiosInstance.get('/department');
      return {
        props: {
          isAuthenticated: true,
          compliances: compliances.data,
          departments: departments.data
        },
      };
    }
  } catch (err) {
    console.error("error", err)
  }

  return {
    redirect: {
      destination: '/login',
      permanent: true,
    },
  };
}

export default Home

export const useHomeContext = () => {
  return useContext(HomeContext);
};
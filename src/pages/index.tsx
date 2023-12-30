import React from 'react'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Component from '../Scenes/Home'
import HomePage from '../Scenes/Home/Home'
import Layout from '../Components/Layout/Layout'
import { validateToken } from '../Utils/signin'
import { CircularProgress } from '@mui/material'
import axios from 'axios'
import axiosInstance from '../Utils/axiosUtil'



const Home: NextPage = ({ isAuthenticated } : any) => {
  return (
    <Layout>
      <Component>
        <HomePage />
      </Component>
    </Layout>
  )
}

export const getServerSideProps = async function getServerSideProps(context : any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context);
    if(response.status === 200) {
      return {
        props: {
          isAuthenticated: true,
        },
      };
    }
  } catch (err) {
    console.error("error", err)
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}

export default Home

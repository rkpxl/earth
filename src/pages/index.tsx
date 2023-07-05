import React from 'react'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Component from '../Scenes/Home'
import HomePage from '../Scenes/Home/Home'


const Home: NextPage = () => {
  const router = useRouter()

  React.useEffect(() => {
    if(typeof localStorage !== 'undefined' && !localStorage.getItem('USER')) {
      // router.push('/login')
    }
  }, [])

  return (
    <>
      <Component><HomePage /></Component>
    </>
  )
}

export default Home

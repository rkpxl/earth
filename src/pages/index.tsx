import React from 'react'
import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import Component from '../Scenes/Home'
import HomePage from '../Scenes/Home/Home'
import { validateToken } from '../Utils/signup'


const Home: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Component><HomePage /></Component>
    </>
  )
}

export default Home

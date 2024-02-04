import React from 'react'
import axiosInstance from '../../Utils/axiosUtil'

interface IProps {
  snapshot: any
}

export default function Snapshot({ snapshot }: IProps) {
  return <div>Snapshot</div>
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  const { id } = context.query
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token')
    if (response.status === 200) {
      const snapshot = await axiosInstance.get(`/snapshot/${id}`)
      return {
        props: {
          isAuthenticated: true,
          snapshot: snapshot.data,
        },
      }
    }
  } catch (err) {
    console.error('error', err)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}

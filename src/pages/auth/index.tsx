import { useEffect } from 'react'
import { useRouter } from 'next/router'

const IndexPage = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/auth/password-update')
  }, [router])
  return null
}

export default IndexPage

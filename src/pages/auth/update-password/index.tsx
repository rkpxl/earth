import Component from '../../../Scenes/Settings'
import { useRouter } from 'next/router'

const Register = () => {
  const router = useRouter()
  const { token } = router.query
  return (
    <>
      {token ? (
        <Component />
      ) : (
        <>
          <Component />
        </>
      )}
    </>
  )
}

export default Register

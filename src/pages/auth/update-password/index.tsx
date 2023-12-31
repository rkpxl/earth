import Component from '../../../Scenes/Settings';
import Layout from '../../../Scenes/Home';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const { token } = router.query;
  return (
    <>
      {token ? (
        <Component />
      ) : (
        <Layout>
          <Component />
        </Layout>
      )}
    </>
  );
};

export default Register;

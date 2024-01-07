import axios from 'axios';
import Layout from '../../Components/Layout/Layout';
import Component from '../../Scenes/Login/index'
import { validateToken } from '../../Utils/signin';
import axiosInstance from '../../Utils/axiosUtil';


const Login = () => {
  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export const getServerSideProps = async function getServerSideProps(context : any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context);
    console.log("response", response)
    if(response.status === 200) {
      console.log("inside response")
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  } catch (err) {
    console.error("error", err)
  }

  
  return {
    props: {
      isAuthenticated: false,
    },
  };
}


export default Login;

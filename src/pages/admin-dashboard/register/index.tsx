import Component from '../../../Scenes/Register/Register'
import Layout from '../../../Scenes/Home'
import axiosInstance from '../../../Utils/axiosUtil';
import { useDispatch } from 'react-redux';
import { AppDispatch, IDepartment } from '../../../Utils/types/type';

interface IProps {
  departments: Array<IDepartment>
}

const Register = ({ departments } : IProps) => {
  const dispatch : AppDispatch = useDispatch();

  return (
    <Layout>
      <Component departments={departments} />
    </Layout>
  );
};

export default Register;

export const getServerSideProps = async function getServerSideProps(context : any) {
  axiosInstance.context = context
  try {
    const departments = await axiosInstance.get('/department');
      return {
        props: {
          isAuthenticated: true,
          departments: departments.data
        },
      };
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


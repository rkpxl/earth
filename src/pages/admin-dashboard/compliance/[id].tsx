import Router, { useRouter } from 'next/router';
import Layout from '../../../Scenes/Home'
import axiosInstance from '../../../Utils/axiosUtil';
import { ICompliance, IGroup, IMember } from '../../../Utils/types/type';
import ManageCompliance from '../../../Scenes/AdminDashboard/Compliance/ManageCompliance';


interface IProps {
  isAuthenticated: boolean,
  compliace: ICompliance
}

const GroupDetail = (props : IProps) => {
  const {isAuthenticated, compliace} = props
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <ManageCompliance id={id} compliance={compliace} />
    </Layout>
  );
};

export const getServerSideProps = async function getServerSideProps(context : any) {
  const { id } = context.query
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token');
    if(response.status === 200) {
      const compliace = await axiosInstance.get(`/compliance/${id}`);
      return {
        props: {
          isAuthenticated: true,
          compliace: compliace.data,
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

export default GroupDetail;

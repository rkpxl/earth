import Router, { useRouter } from 'next/router';
import Layout from '../../../Scenes/Home'
import axiosInstance from '../../../Utils/axiosUtil';
import ManageGroup from '../../../Scenes/AdminDashboard/Groups/ManageGroup';
import { IGroup, IMember } from '../../../Utils/types/type';

interface IProps {
  isAuthenticated: boolean,
  group: IGroup,
  members: IMember
}

const GroupDetail = (props : IProps) => {
  const {isAuthenticated, group, members} = props
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <ManageGroup {...group} />
    </Layout>
  );
};

export const getServerSideProps = async function getServerSideProps(context : any) {
  const { id } = context.query
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token');
    if(response.status === 200) {
      const group = await axiosInstance.get(`/group/${id}`);
      const members = await axiosInstance.get(`/member/group/${id}`);
      return {
        props: {
          isAuthenticated: true,
          group: group.data,
          members: members.data,
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

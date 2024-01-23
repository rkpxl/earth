import PendingTask from '../../Scenes/PendingTasks';
import Layout from '../../Scenes/Home'
import axiosInstance from '../../Utils/axiosUtil';
import { IApproval, IProtocol } from '../../Utils/types/type';
import { useRouter } from 'next/router';
import EditableTable from '../../Components/Common/EditableTable';

interface IProps {
  allApprovals :IApproval[];
}

const PendingTasks = ({ allApprovals = []} : IProps) => {

  const router = useRouter()

  const handleRowClick = (e : any, row : IProtocol) => {
    e.preventDefault()
    router.push(`/forms/${row._id}`)
  }

  const allApprovalsProtocol = allApprovals?.map((a) => a?.protocol_id)


  return (
    <EditableTable data={allApprovalsProtocol || []} title="Approval Approvals" handleRowClick={handleRowClick}/>
  );
};



export const getServerSideProps = async function getServerSideProps(context : any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context);
    if(response.status === 200) {
      const allApprovals = await axiosInstance.get('/approval/all-active');
      return {
        props: {
          isAuthenticated: true,
          allApprovals: allApprovals.data,
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


export default PendingTasks;

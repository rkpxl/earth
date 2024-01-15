import Layout from '../../Scenes/Home'
import Component from '../../Scenes/DoneTasks';
import axiosInstance from '../../Utils/axiosUtil';
import { IProtocol } from '../../Utils/types/type';
import EditableTable from '../../Components/Common/EditableTable';

interface IProps {
  allProtocols: Array<IProtocol>
}

const DoneTasks = ({ allProtocols } : IProps) => {
  return (
    <Layout>
      <EditableTable data={allProtocols} title="All Protocols"/>
    </Layout>
  );
};


export const getServerSideProps = async function getServerSideProps(context : any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context);
    if(response.status === 200) {
      const allProtocols = await axiosInstance.get('/protocol/get-all');
      return {
        props: {
          isAuthenticated: true,
          allProtocols: allProtocols.data,
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


export default DoneTasks;
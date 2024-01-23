import React, { useContext } from 'react'
import ApprovalRule from "../../../Scenes/AdminDashboard/AprovalRule";
import axiosInstance from '../../../Utils/axiosUtil';

const ApprovalRulesContext = React.createContext<any>(null);

function Index({ approvalsRules } : any) {
  return (
   <ApprovalRulesContext.Provider value={{ approvalsRules }}>
    <ApprovalRule />
   </ApprovalRulesContext.Provider>
  )
}

export const getServerSideProps = async function getServerSideProps(context : any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token');
    if(response.status === 200) {
      const approvalRule = await axiosInstance.get('/approval-rules');
      return {
        props: {
          isAuthenticated: true,
          approvalsRules: approvalRule.data
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

export const useApprovalRulesContext = () => {
  return useContext(ApprovalRulesContext);
};

export default Index
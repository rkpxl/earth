import axiosInstance from '../../Utils/axiosUtil'
import { IApproval } from '../../Utils/types/type'
import { useRouter } from 'next/router'
import EditableTable from '../../Components/Common/EditableTable'

interface IProps {
  allApprovals: { data: IApproval[]; total: number }
}

const PendingTasks = ({ allApprovals }: IProps) => {
  const router = useRouter()

  const handleRowClick = (e: any, row: any) => {
    e.preventDefault()
    router.push(`/forms/${row?.protocol_id?._id}?approver=${row?._id}`)
  }

  return (
    <EditableTable data={allApprovals} title="Approval Approvals" handleRowClick={handleRowClick} />
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context)
    if (response.status === 200) {
      const allApprovals = await axiosInstance.get('/approval/all-review-ready')
      return {
        props: {
          isAuthenticated: true,
          allApprovals: allApprovals.data,
        },
      }
    }
  } catch (err) {
    console.error('error', err)
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}

export default PendingTasks

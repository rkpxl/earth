import axiosInstance from '../../Utils/axiosUtil'
import { IApproval } from '../../Utils/types/type'
import { useRouter } from 'next/router'
import EditableTable from '../../Components/Common/EditableTable'

interface IProps {
  allActiveApprovals: { data: IApproval[]; total: number }
}

const PendingTasks = ({ allActiveApprovals }: IProps) => {
  const router = useRouter()

  const handleRowClick = (e: any, row: any) => {
    e.preventDefault()
    router.push(`/forms/${row?.protocol_id?._id}?approver=${row?._id}`)
  }

  return (
    <EditableTable
      data={allActiveApprovals}
      title="All Approvals Status"
      handleRowClick={handleRowClick}
    />
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context)
    if (response.status === 200) {
      const allActiveApprovals = await axiosInstance.get('/approval/all-active')
      return {
        props: {
          isAuthenticated: true,
          allActiveApprovals: allActiveApprovals.data,
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

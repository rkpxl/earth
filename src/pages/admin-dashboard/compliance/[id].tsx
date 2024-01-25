import { useRouter } from 'next/router'
import axiosInstance from '../../../Utils/axiosUtil'
import { ICompliance } from '../../../Utils/types/type'
import ManageCompliance from '../../../Scenes/AdminDashboard/Compliance/ManageCompliance'

interface IProps {
  isAuthenticated: boolean
  compliance: ICompliance
  approvalRule: any
}

const GroupDetail = (props: IProps) => {
  const { isAuthenticated, compliance, approvalRule } = props

  const router = useRouter()
  const { id } = router.query

  return (
    <>
      <ManageCompliance id={id} compliance={compliance} approvalRule={approvalRule} />
    </>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  const { id } = context.query
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token')
    if (response.status === 200) {
      const compliance = await axiosInstance.get(`/compliance/${id}`)
      const approvalRule = await axiosInstance.get('/approval-rules')
      return {
        props: {
          isAuthenticated: true,
          compliance: compliance.data,
          approvalRule: approvalRule.data,
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

export default GroupDetail

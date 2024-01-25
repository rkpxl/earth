import axiosInstance from '../../Utils/axiosUtil'
import { IProtocol } from '../../Utils/types/type'
import EditableTable from '../../Components/Common/EditableTable'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Page } from '../../Utils/constants'

interface IProps {
  allProtocols: { data: Array<IProtocol>; total?: number }
}

const AllProtocols = ({ allProtocols }: IProps) => {
  const router = useRouter()
  const [pageData, setPageData] = useState({
    currentPage: Page.defaultPage,
    pageSize: Page.defaultPageSize,
  })

  const { data } = useQuery({
    queryKey: ['all-protocols', pageData.currentPage, pageData.pageSize],
    queryFn: async () => {
      try {
        const allProtocols = await axiosInstance.get('/protocol/get-all', {
          params: {
            page: pageData.currentPage,
            pageSize: pageData.pageSize,
          },
        })
        return allProtocols.data
      } catch (err) {
        console.error(err)
      }
    },
  })

  const finalData = data || allProtocols

  const handleRowClick = (e: any, row: IProtocol) => {
    e.preventDefault()
    router.push(`/forms/${row._id}`)
  }

  return (
    <>
      <EditableTable
        data={finalData}
        title="All Protocols"
        handleRowClick={handleRowClick}
        pageData={pageData}
        setPageData={setPageData}
      />
    </>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token', context)
    if (response.status === 200) {
      const allProtocols = await axiosInstance.get('/protocol/get-all')
      return {
        props: {
          isAuthenticated: true,
          allProtocols: allProtocols.data,
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

export default AllProtocols

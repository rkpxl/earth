import { Button, Card, Checkbox, Grid } from '@mui/material'
import React, { useMemo, useState } from 'react'
import axiosInstance from '../../../Utils/axiosUtil'
import { QueryKey, RefetchQueryFilters, useQuery, useQueryClient } from '@tanstack/react-query'
import Search from '../../../Components/Common/Search'
import MemberCard from '../../../Components/Common/MemberCard'
import { useRouter } from 'next/router'
import { showMessage } from '../../../Store/reducers/snackbar'
import { useDispatch } from 'react-redux'
import Loading from '../../../Components/Common/Loading'

export default function RemoveGroupMember(props: any) {
  const { group } = props
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState<string>('')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const { id } = router.query

  const {
    data: members,
    isLoading: memberIsLoading,
    isError: memberIdError,
  } = useQuery({
    queryKey: ['member', searchText],
    queryFn: async () => {
      const response = await axiosInstance.get(`/member/group/${id}`)
      return response.data
    },
  })

  const handleToggle = (id: any) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedEmail) => selectedEmail !== id)
      } else {
        return [...prevSelected, id]
      }
    })
  }

  const handleReset = async () => {
    setSelectedMembers([])
  }

  const handleRemove = async () => {
    try {
      const response = await axiosInstance.delete(`/member/${id}`, {
        data: {
          user_id: selectedMembers,
        },
      })
      if (response.status < 300) {
        dispatch(showMessage({ message: 'All Peoples Deleted', severity: 'success' }))
        queryClient.refetchQueries(['member', searchText] as RefetchQueryFilters)
      } else {
        dispatch(showMessage({ message: 'Try again with less peoples', severity: 'warning' }))
      }
    } catch (error) {
      dispatch(showMessage({ message: 'Try again with less peoples', severity: 'warning' }))
    }
    handleReset()
  }

  if (memberIsLoading) {
    return <Loading />
  }

  return (
    <Grid container spacing={5} px={3} pt={2} mb={1}>
      <Grid item xs={12} sm={12}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={2}>
            <Button
              sx={{
                width: '100%',
                height: '48px',
                borderRadius: '100px',
              }}
              color="primary"
              variant="contained"
              onClick={handleRemove}
              disabled={selectedMembers.length === 0}
            >
              Remove
            </Button>
          </Grid>
          <Grid item flexGrow={1} xs={12} sm={10}>
            <Search setText={setSearchText} />
          </Grid>
        </Grid>

        <Grid sx={{ maxHeight: '90vh', pb: 3, overflowY: 'auto' }}>
          {members?.map((ppl: any) => (
            <Card
              key={ppl.email}
              sx={{ mt: 1.5, borderRadius: '16px', display: 'flex', alignItems: 'center' }}
            >
              <Grid>
                <Checkbox
                  checked={selectedMembers.includes(ppl._id)}
                  onChange={(e) => {
                    handleToggle(ppl._id)
                  }}
                />
              </Grid>
              <MemberCard title={ppl?.user_id?.name} subtitle={ppl?.user_id?.email} />
            </Card>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

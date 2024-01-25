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
import Error from '../../../Components/Common/Error'

export default function AddGroupMember(props: any) {
  const { group } = props
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const [searchText, setSearchText] = useState<string>('')
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const { id } = router.query

  const {
    data: peoples,
    isLoading: peopleIsLoading,
    isError: peopleIsError,
  } = useQuery({
    queryKey: ['add-group-people', searchText],
    queryFn: async () => {
      if (searchText === '') {
        const response = await axiosInstance.get(`/user/users-of`)
        return response.data
      } else {
        const response = await axiosInstance.get(`/user/search?name=${searchText}`)
        return response.data
      }
    },
  })

  const {
    data: members,
    isLoading: memberIsLoading,
    isError: memberIdError,
  } = useQuery({
    queryKey: ['add-group-member', searchText],
    queryFn: async () => {
      const response = await axiosInstance.get(`/member/group/${id}`)
      return response.data
    },
  })

  const membersIds = useMemo(() => {
    return members?.map((m: any) => m.user_id._id)
  }, [members])

  const handleToggle = (email: any) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(email)) {
        return prevSelected.filter((selectedEmail) => selectedEmail !== email)
      } else {
        return [...prevSelected, email]
      }
    })
  }

  const handleReset = async () => {
    setSelectedMembers([])
  }

  const handleAdd = async () => {
    const response = await axiosInstance.post(`/member`, {
      user_id: selectedMembers,
      groupId: parseInt(id as string),
      group_id: group._id,
    })
    if (response.status < 300) {
      dispatch(showMessage({ message: 'All Peoples Added', severity: 'success' }))
      queryClient.refetchQueries(['add-group-people', searchText] as RefetchQueryFilters)
      queryClient.refetchQueries(['add-group-member', searchText] as RefetchQueryFilters)
      queryClient.refetchQueries(['member'] as RefetchQueryFilters)
    } else {
      dispatch(showMessage({ message: 'Try again with less peoples', severity: 'warning' }))
    }
    handleReset()
  }

  if (peopleIsLoading || memberIsLoading) {
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
                borderRadius: '100px',
                height: '48px',
              }}
              color="primary"
              variant="contained"
              onClick={handleAdd}
              disabled={selectedMembers.length === 0}
            >
              Add
            </Button>
          </Grid>
          <Grid item flexGrow={1} xs={12} sm={10}>
            <Search setText={setSearchText} />
          </Grid>
        </Grid>

        <Grid sx={{ maxHeight: '90vh', pb: 3, overflowY: 'auto' }}>
          {peoples?.map((ppl: any) => (
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
                  disabled={membersIds?.includes(ppl._id)}
                />
              </Grid>
              <MemberCard title={ppl?.name} subtitle={ppl.email || ''} />
            </Card>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

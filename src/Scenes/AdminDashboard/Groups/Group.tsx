/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import PopUp from './PopUp'
import Header from '../../../Components/Admin Dashboard/Common/Header'
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard'
import { CircularProgress } from '@mui/material'
import axiosInstance from '../../../Utils/axiosUtil'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Utils/types/type'
import ConfirmationPopup from '../../../Components/Common/ConfirmationDialog'
import * as type from '../../../Utils/types/type'
import { showMessage } from '../../../Store/reducers/snackbar'
import { openConfirmation } from '../../../Store/reducers/confirm'
import { fetchGroups } from '../../../Store/reducers/group'
import { useRouter } from 'next/router'
import GlobalPagination from '../../../Components/Common/GlobalPagination'

export default function Group(props: any) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<number>(0)
  const { data, loading, error } = useSelector((state: RootState) => state.group)
  const groups = data || props.groups || []
  const dispatch: type.AppDispatch = useDispatch()
  const [pageData, setPageData] = useState({
    currentPage: 1,
    pageSize: 10,
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleConfirmation = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/group/${id}`)
      if (response.status === 200) {
        dispatch(showMessage({ message: 'Group is deleted', severity: 'success' }))
      } else {
        dispatch(
          showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }),
        )
      }
    } catch (err) {
      console.error(err)
      dispatch(
        showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }),
      )
    }
    dispatch(fetchGroups())
  }

  const handleOpenConfirmation = (args: any[]) => {
    dispatch(
      openConfirmation({
        args,
      }),
    )
  }

  const redirectToGroup = (id: string) => {
    if (id) {
      router.push(`/admin-dashboard/groups/${id}`)
    } else {
      dispatch(showMessage({ message: 'Contact to admin', severity: 'warning', duration: 2000 }))
    }
  }

  // const onChangeAPICall = (page : number, pageSize: number) => {
  //   dispatch(fetchGroups({page: page, pageSize: pageSize}))
  // }

  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }

  if (error) {
    ;<>Try again</>
  }

  return (
    <Grid>
      <Header onClickHandle={handleClickOpen} title="Groups" buttonText="Create New Group" />
      <PopUp open={open} onClose={handleClose} onSave={handleClose} />
      {groups?.map((grp: any, index: number) => (
        <div key={index.toString()}>
          <AdminCard
            card={grp}
            onDelete={() => handleOpenConfirmation(grp.id)}
            onManageClick={() => redirectToGroup(grp.id)}
          />
        </div>
      ))}
      {/* {groups?.total > 10 ? 
            <GlobalPagination 
              totalItems={groups?.total} 
              onChange={setPageData}
              onChangeAPICall={onChangeAPICall}
              pageData={pageData}
            />
          : null} */}
      <ConfirmationPopup handleConfirm={handleConfirmation} />
    </Grid>
  )
}

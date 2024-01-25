import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import PopUp from './UpdateApprovalRuleDialog'
import Header from '../../../Components/Admin Dashboard/Common/Header'
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../Utils/types/type'
import { fetchGroups } from '../../../Store/reducers/group'
import CreateApprovalDialog from './CreateApprovalDialog'
import { useApprovalRulesContext } from '../../../pages/admin-dashboard/approval-rule'
import Loading from '../../../Components/Common/Loading'

export default function ApprovalRule() {
  const [open, setOpen] = useState(false)
  const [createNewShow, setCreateNewShow] = useState(false)
  const [selectedRule, setSelectedRule] = useState(null)
  const groups = useSelector((state: RootState) => state.group)
  const { approvalsRules } = useApprovalRulesContext()
  const dispatch: AppDispatch = useDispatch()
  !groups && dispatch(fetchGroups())

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const toggleCreateNewShow = () => {
    setCreateNewShow((prev) => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOnClick = (ar: any) => {
    setSelectedRule(ar)
    setOpen((prev) => !prev)
  }

  if (!approvalsRules) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <Grid>
      <Header
        onClickHandle={toggleCreateNewShow}
        title="Approvals"
        buttonText="Create New Approvals"
      />
      {open ? <PopUp open={open} onClose={handleClose} apiResponse={selectedRule} /> : null}
      {approvalsRules?.map((ar: any) => (
        <div key={ar._id}>
          <AdminCard card={ar} onManageClick={() => handleOnClick(ar)} />
        </div>
      ))}
      {createNewShow ? (
        <CreateApprovalDialog open={createNewShow} onClose={toggleCreateNewShow} />
      ) : null}
    </Grid>
  )
}

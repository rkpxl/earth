import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import PopUp from './PopUp'
import Header from '../Common/Header'
import AdminCard from '../Common/AdminCard'

const apiResponse = [
  {
    _id: '658925e9da1904eae77d97ab',
    name: 'Admin Approvals',
    id: '1',
    orgId: '1',
    type: 'department',
    isActive: 'true',
    primaryEmail: 'math@gmail.com',
    createdAt: '2023-12-25T06:49:13.767Z',
    updatedAt: '2023-12-25T06:49:13.767Z',
    __v: 0,
  },
]

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Grid>
      <Header onClickHandle={handleClickOpen} title="Approvals" buttonText="Create New Approvals" />
      <PopUp open={open} onClose={handleClose} onSave={handleClose} />
      <div onClick={handleClickOpen}>
        <AdminCard card={apiResponse[0]} />
      </div>
    </Grid>
  )
}

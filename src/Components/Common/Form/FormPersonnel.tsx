import React, { useState } from 'react'
import { ICompliance, IProtocol, RootState } from '../../../Utils/types/type'
import SearchPeopleDialog from '../SearchPeopleDialog'
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import axiosInstance from '../../../Utils/axiosUtil'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../../../Store/reducers/snackbar'
import { updateAnswer } from '../../../Store/reducers/form'

interface IProps {
  compliance: ICompliance
  protocol: IProtocol
}

interface IApprover {
  user_id: string
  name: string
  role: string
  access: string
  isNew: boolean
}

const initialState: IApprover = {
  user_id: '',
  name: '',
  role: '',
  access: '',
  isNew: true,
}

export default function FormPersonnel({ compliance, protocol }: IProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dispatch = useDispatch()
  const approvers = useSelector(
    (state: RootState) =>
      state?.form?.tabs['98']?.questions['approvers']?.answer ?? protocol?.approvers,
  )

  const setApprovers = (updatedData: any) => {
    dispatch(updateAnswer({ tabIndex: 98, id: 'approvers', answer: updatedData }))
  }

  const addPersonBasic = (user: any) => {
    const newPerson: IApprover = {
      user_id: user?._id,
      name: user.name,
      role: '',
      access: '',
      isNew: true,
    }
    setApprovers([...(approvers ? approvers : []), newPerson])
    setIsOpen((prev) => !prev)
  }

  const removeRow = (index: number) => {
    const result = approvers?.filter((_: any, i: any) => i !== index)
    setApprovers(result)
    updateApprovers(initialState, result, true)
  }

  const updateApprover = (index: number, key: string, value: string) => {
    const result = approvers?.map((a: any, i: any) => (i === index ? { ...a, [key]: value } : a))
    setApprovers(result)
    const currentIndexResult = result[index]
    updateApprovers(currentIndexResult, result, false)
  }

  // approver.isNew && approver.role && approver.access

  const updateApprovers = async (
    approver: IApprover,
    approvers: IApprover[],
    isDelete: boolean,
  ) => {
    if ((approver.isNew && approver.role && approver.access) || isDelete) {
      try {
        const result = await axiosInstance.put('/protocol', {
          _id: protocol._id,
          approvers: approvers
            .filter((ap) => ap.access && ap.name && ap.role && ap.user_id)
            .map(({ isNew, ...rest }, index) => {
              if (isNew) {
                return {
                  ...rest,
                  step: index,
                }
              }
              return { ...rest }
            }),
        })
        if (result.status < 300) {
          dispatch(showMessage({ message: 'Updated Successfully', severity: 'success' }))
        } else {
          dispatch(showMessage({ message: 'Something went wrong', severity: 'error' }))
        }
      } catch (err) {
        console.error(err)
        dispatch(showMessage({ message: 'Something went wrong', severity: 'error' }))
      }
    }
  }

  return (
    <>
      {approvers?.map((p: IApprover, index: number) => (
        <Paper key={index} elevation={3} style={{ padding: '10px', margin: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <TextField label="Name" variant="outlined" value={p.name} fullWidth disabled />
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={p.role}
                  onChange={(e) => updateApprover(index, 'role', e.target.value)}
                  label="Role"
                  disabled={p.isNew ? false : true}
                >
                  <MenuItem value="pi">PI</MenuItem>
                  <MenuItem value="copi">Co-PI</MenuItem>
                  <MenuItem value="advisor">Advisor</MenuItem>
                  <MenuItem value="assistance">Assistance</MenuItem>
                  <MenuItem value="labassistance">Lab-Assistance</MenuItem>
                  <MenuItem value="external">External</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Access</InputLabel>
                <Select
                  value={p.access}
                  onChange={(e) => updateApprover(index, 'access', e.target.value)}
                  label="Access"
                  disabled={p.isNew ? false : true}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="write">Write</MenuItem>
                  <MenuItem value="read">Read</MenuItem>
                  <MenuItem value="edit">Read</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={1} sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton onClick={() => removeRow(index)} color="secondary" aria-label="delete">
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Button variant="contained" color="primary" onClick={() => setIsOpen(true)}>
        Add Approver
      </Button>
      <SearchPeopleDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        addPerson={addPersonBasic}
      />
    </>
  )
}

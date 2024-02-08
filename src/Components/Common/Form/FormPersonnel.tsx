import React, { useEffect, useState } from 'react'
import { ICompliance, IProtocol, RootState } from '../../../Utils/types/type'
import SearchPeopleDialog from '../SearchPeopleDialog'
import {
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import axiosInstance from '../../../Utils/axiosUtil'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../../../Store/reducers/snackbar'
import { updateAnswer } from '../../../Store/reducers/form'
import GroupPersonDialog from '../GroupPersonDialog'

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
  const [isGroupOpen, setIsGroupOpen] = useState<boolean>(false)
  const [selectedApprover, setSelectedApprover] = useState(null)
  const dispatch = useDispatch()
  const aditionalApprovers = useSelector(
    (state: RootState) =>
      state?.form?.tabs['98']?.questions['aditionalApprovers']?.answer ??
      protocol?.aditionalApprovers,
  )

  const mandatoryApprovers = useSelector(
    (state: RootState) =>
      state?.form?.tabs['98']?.questions['mandatoryApprovers']?.answer ??
      protocol?.mandatoryApprovers,
  )

  useEffect(() => {
    dispatch(
      updateAnswer({ tabIndex: 98, id: 'mandatoryApprovers', answer: protocol.mandatoryApprovers }),
    )
  }, [protocol])

  const setApprovers = (updatedData: any) => {
    dispatch(updateAnswer({ tabIndex: 98, id: 'aditionalApprovers', answer: updatedData }))
  }

  const setMandatoryApprovers = async (updatedData: any) => {
    try {
      const response = await axiosInstance.put('/protocol', {
        _id: protocol._id,
        mandatoryApprovers: updatedData,
      })
      if (response.status < 300) {
        dispatch(showMessage({ message: 'Added Successfully', severity: 'success' }))
      } else {
        dispatch(showMessage({ message: 'Something went wrong', severity: 'error' }))
      }
    } catch (err) {
      dispatch(showMessage({ message: 'Something went wrong', severity: 'error' }))
      console.error(err)
    }
    dispatch(updateAnswer({ tabIndex: 98, id: 'mandatoryApprovers', answer: updatedData }))
  }

  const addPersonBasic = (user: any) => {
    const newPerson: IApprover = {
      user_id: user?._id,
      name: user.name,
      role: '',
      access: '',
      isNew: true,
    }
    setApprovers([...(aditionalApprovers ? aditionalApprovers : []), newPerson])
    setIsOpen((prev) => !prev)
  }

  const removeRow = (index: number) => {
    const result = aditionalApprovers?.filter((_: any, i: any) => i !== index)
    setApprovers(result)
    updateApprovers(initialState, result, true)
  }

  const updateApprover = (index: number, key: string, value: string) => {
    const result = aditionalApprovers?.map((a: any, i: any) =>
      i === index ? { ...a, [key]: value } : a,
    )
    setApprovers(result)
    const currentIndexResult = result[index]
    updateApprovers(currentIndexResult, result, false)
  }

  // approver.isNew && approver.role && approver.access

  const updateApprovers = async (
    approver: IApprover,
    aditionalApprovers: IApprover[],
    isDelete: boolean,
  ) => {
    if ((approver.isNew && approver.role && approver.access) || isDelete) {
      try {
        const result = await axiosInstance.put('/protocol', {
          _id: protocol._id,
          aditionalApprovers: aditionalApprovers
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

  const addApprover = (approver: any) => {
    setSelectedApprover(approver)
    setIsGroupOpen(true)
  }

  const addApproverData = (selectedApprover: any, user: any) => {
    const step = selectedApprover.step
    const updatedData = mandatoryApprovers.map((ma: any) => {
      if (step === ma.step) {
        return {
          ...ma,
          approver_id: user.user_id._id,
          approverName: user.user_id.name,
          isApproved: false,
        }
      }
      return ma
    })
    setMandatoryApprovers(updatedData)
    setIsGroupOpen(false)
  }

  return (
    <>
      {mandatoryApprovers?.length > 0 ? (
        <>
          <Typography variant="h5" fontWeight="bold">
            Mandatory Approvers
          </Typography>
          {mandatoryApprovers?.map((approver: any, index: number) => (
            <Paper key={index} elevation={3} sx={{ p: 2, m: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3.5}>
                  <TextField
                    label="Group Name"
                    variant="outlined"
                    value={approver.groupName}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={3.5}>
                  <TextField
                    label={approver.approverName ? '' : 'Approver Name'}
                    variant="outlined"
                    value={approver.approverName} // Make sure to correct the field name based on your actual data structure
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <FormControl fullWidth disabled>
                    <InputLabel>Access</InputLabel>
                    <Select
                      value={approver.access}
                      onChange={(e) => updateApprover(index, 'access', e.target.value)}
                      label="Access"
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="write">Write</MenuItem>
                      <MenuItem value="read">Read</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      addApprover(approver)
                    }}
                    sx={{ minHeight: '56px', width: '100%' }}
                  >
                    {' '}
                    Add Approver
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Divider sx={{ mt: 3, mb: 2 }} />
        </>
      ) : null}
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Aditional Approvers
      </Typography>
      {aditionalApprovers?.map((p: IApprover, index: number) => (
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
      {selectedApprover && isGroupOpen && (
        <GroupPersonDialog
          open={isGroupOpen}
          selectedApprover={selectedApprover}
          onClose={() => setIsGroupOpen(false)}
          addPerson={addApproverData}
        />
      )}
    </>
  )
}

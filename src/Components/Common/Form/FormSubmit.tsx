import React, { useEffect, useState } from 'react'
import { ICompliance, IProtocol, RootState } from '../../../Utils/types/type'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axiosInstance from '../../../Utils/axiosUtil'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from '../../../Store/reducers/snackbar'
import { validateForm, validateFormHelper } from '../../../Store/reducers/form'
import { useRouter } from 'next/router'

interface IProps {
  compliance: ICompliance
  tabNumber?: number
  protocol: IProtocol
}

export default function FormSubmit({ compliance, protocol }: IProps) {
  const [reviewer, setReviewer] = useState()
  const dispatch = useDispatch()
  const formRootData = useSelector((state: RootState) => state.form)
  const [isFormValid, setIsFormValid] = useState(false)
  const router = useRouter()

  const submitHandle = async () => {
    const isAllSet = validateFormHelper(formRootData)
    const { approver } = router.query
    console.log('id', router.query)
    dispatch(validateForm())
    if (isAllSet) {
      try {
        let response: any;
        if(reviewer === "Approve") {
          if(protocol.status === "Draft") {
            response = await axiosInstance.post('/flow', {
              protocol_id: protocol._id,
            })
          } else {
            response = await axiosInstance.put(`/approval/approve?_id=${approver}`)
          }
        }
        if (response?.status < 300) { 
          dispatch(showMessage({ message: 'Submited', severity: 'success' }))
          router.push('/')
        } else {
          dispatch(showMessage({ message: 'Not Submited', severity: 'warning' }))
        }
      } catch (err) {
        console.error(err)
        dispatch(showMessage({ message: 'Not Submited', severity: 'error' }))
      }
    } else {
      dispatch(
        showMessage({ message: 'Fill all required answers', severity: 'warning', duration: 5000 }),
      )
    }
  }

  useEffect(() => {
    setIsFormValid(formRootData.isAllRequiredFilled)
  }, [formRootData, dispatch])

  return (
    <Grid
      container
      columnSpacing={2}
      rowSpacing={2}
      maxWidth="1100px"
      sx={{ marginBottom: '64px' }}
    >
      <Grid item xs={12}>
        <TextField
          label="Comment"
          variant="outlined"
          // value={comment}
          // onChange={(e) => setComment(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth required>
          <InputLabel id="select" size="small">
            Select reviewer
          </InputLabel>
          <Select
            required
            label="Select reviewer"
            size="small"
            onChange={(e : any) => setReviewer(e.target.value)}
          >
            {/* {protocol?.approvers?.map((option: any, index: number) => (
              <MenuItem key={index} value={option}>
                {`${option.name} ${option?.role ? '-' : ''} ${option?.role || ''}`}
              </MenuItem>
            ))} */}
            {["Approve", "Reject"].map((option: any, index: number) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}
      >
        <Button
          sx={{ width: '100%', maxWidth: '148px', fontSize: '18px', height: '100%' }}
          variant="contained"
          onClick={submitHandle}
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}

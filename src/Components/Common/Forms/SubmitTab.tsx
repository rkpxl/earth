import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

interface SubmitTabProps {
  departmentAllUser: Array<any>,
  setReviewer: Function,
  submitHandle: Function,
  comment: string,
  setComment: Function,
  isView?: boolean
}

const SubmitTab = (props : SubmitTabProps) => {
  const { departmentAllUser, setReviewer, submitHandle, comment, setComment, isView = false} = props
  return (
    <>
      <Grid container columnSpacing={2} rowSpacing={2} maxWidth="1100px" sx={{ marginBottom: '64px'}}>
        <Grid item xs={12}>
          <TextField
            label="Comment"
            variant="outlined"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <FormControl
            fullWidth
            required
            >
            <InputLabel id="select" size="small">Select reviewer</InputLabel>
            <Select 
              required
              label="Select reviewer"
              size="small"
              onChange={(e : any) => setReviewer(e.target.value)}
            >
              {(isView ? [ {name: "Approve", userId: 'APPROVED'}, {name: "Reject", userId: 'REJECT'}, ...departmentAllUser] : departmentAllUser)?.map((option : any, index : number) => (
                <MenuItem key={index} value={option?.userId}>
                  {`${option.name} ${option?.role ? '-' : ''} ${option?.role || ''}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
            <Button sx={{ width: '100%' , maxWidth: '148px', fontSize: '18px', height: '100%' }} variant="contained" onClick={(e) => submitHandle(e)}>Submit</Button>
          </Grid>
      </Grid>
    </>
  )
}

export default SubmitTab
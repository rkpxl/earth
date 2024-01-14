import React, { useState } from 'react'
import { ICompliance, IProtocol } from '../../../Utils/types/type';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axiosInstance from '../../../Utils/axiosUtil';
import { useDispatch } from 'react-redux';
import { showMessage } from '../../../Store/reducers/snackbar';

interface IProps {
  compliance: ICompliance;
  tabNumber?: number;
  protocol: IProtocol;
}


export default function FormSubmit({ compliance, protocol} : IProps) {

  const [reviewer, setReviewer] = useState()
  const dispatch = useDispatch()
  const submitHandle = async () => {
    try {
      const response = await axiosInstance.post('/flow', {
        protocol_id: protocol._id
      })
      console.log('response', response)
      if(response.status < 300) {
        dispatch(showMessage({message: "Submited", severity: "success"}))
      } else {
        dispatch(showMessage({message: "Not Submited", severity: "warning"}))
      }
    } catch (err) {
      console.error(err)
      dispatch(showMessage({message: "Not Submited", severity: "error"}))
    }
  }
  return (
    <Grid container columnSpacing={2} rowSpacing={2} maxWidth="1100px" sx={{ marginBottom: '64px'}}>
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
          <FormControl
            fullWidth
            required
            >
            <InputLabel id="select" size="small">Select reviewer</InputLabel>
            <Select 
              required
              label="Select reviewer"
              size="small"
              // onChange={(e : any) => setReviewer(e.target.value)}
            >
              {(protocol?.approvers)?.map((option : any, index : number) => (
                <MenuItem key={index} value={option}>
                  {`${option.name} ${option?.role ? '-' : ''} ${option?.role || ''}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
            <Button sx={{ width: '100%' , maxWidth: '148px', fontSize: '18px', height: '100%' }} variant="contained" onClick={submitHandle}>Submit</Button>
          </Grid>
      </Grid>
  )
}

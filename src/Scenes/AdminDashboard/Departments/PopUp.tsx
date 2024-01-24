import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Grid } from '@mui/material';
import axiosInstance from '../../../Utils/axiosUtil';
import { showMessage } from '../../../Store/reducers/snackbar';
import { useDispatch, useSelector } from 'react-redux';
import * as type from '../../../Utils/types/type'
import { fetchDepartments } from '../../../Store/reducers/department';
import { Page } from '../../../Utils/constants';


const Popup = ({ open, onClose, onSave } : any) => {
  const [name, setName] = useState('');
  const [headName, setHeadName] = useState('');
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const dispatch: type.AppDispatch = useDispatch()

  const popUpClose = () => {
    setName('')
    onClose()
  }

  const onSubmit = async () => {
    if (name.trim() === '') {
      setNameError('Name is required');
      return;
    }
    try {
      const response = await axiosInstance.post("/department", {
        name,
        headName,
        primaryEmail
      })
      if(response.status < 300) {
        dispatch(showMessage({ message: 'Department is added', severity: 'success' }));
      } else {
        dispatch(showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }));
      }
    } catch (err) {
      console.error(err)
      dispatch(showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }));
    }
    dispatch(fetchDepartments())
    popUpClose()
  }

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogContent sx={{ padding: 2 }} >
        <DialogTitle sx={{padding: "0px"}}>New Department Details</DialogTitle>
        <TextField
          label="Enter Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          required={true}
          onChange={(e) => setName(e.target.value)}
          sx={{ minWidth: "450px" }}
          error={Boolean(nameError)}
          helperText={nameError}
        />
         <TextField
          label="Primary Email"
          variant="outlined"
          fullWidth
          required={false}
          margin="normal"
          value={primaryEmail}
          onChange={(e) => setPrimaryEmail(e.target.value)}
          sx={{ minWidth: "450px" }}
        />

        <TextField
          label="Head Name"
          variant="outlined"
          fullWidth
          required={false}
          margin="normal"
          value={headName}
          onChange={(e) => setHeadName(e.target.value)}
          sx={{ minWidth: "450px" }}
        />
        <Grid sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <Button type="submit" onClick={onSubmit} color="primary" sx={{ marginTop: 1 }}>
            Add
          </Button>
          <Button onClick={popUpClose} color="primary" sx={{ marginTop: 1 }}>
            Close
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
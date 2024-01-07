import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../../Utils/axiosUtil';
import { showMessage } from '../../../Store/reducers/snackbar';
import { fetchGroups } from '../../../Store/reducers/group';
import * as type from '../../../Utils/types/type';

const Popup = ({ open, onClose, onSave } : any) => {
  const [name, setName] = useState('');
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
      const response = await axiosInstance.post("/group", {
        name,
        primaryEmail
      })
      if(response.status <= 201) {
        dispatch(showMessage({ message: 'Group is added', severity: 'success' }));
      } else {
        dispatch(showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }));
      }
    } catch (err) {
      console.error(err)
      dispatch(showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }));
    }
    dispatch(fetchGroups())
    popUpClose()
  }

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogContent sx={{ padding: 2 }} >
        <DialogTitle sx={{padding: "0px"}}>New Group Details</DialogTitle>
        <TextField
          label="Enter Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          required={true}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(nameError)}
          helperText={nameError}
          sx={{ minWidth: "450px" }}
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

        {/* Buttons */}
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
import { Button, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

interface PersonnelTabProps {
  rows: Array<any>,
  handleInputChange: Function,
  removeRow: Function,
  toggelSearchBarToAddPerson: Function,
  isDisabled: boolean,
}

const PersonnelTab = (props : PersonnelTabProps) : JSX.Element => {

  const { rows, handleInputChange, removeRow, toggelSearchBarToAddPerson, isDisabled = false } = props

  if(!rows) {
    return (<><CircularProgress /></>);
  }

  return (
    <>
      {rows.map((row : any, index : number) => (
          <Paper key={index} elevation={3} style={{ padding: '10px', margin: '10px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <TextField
                  label="Name"
                  variant="outlined"
                  value={row.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  fullWidth
                  disabled={true}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={row.role}
                    onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                    label="Role"
                    disabled={index === 0 || isDisabled}
                  >
                    <MenuItem value="Creator">Creator</MenuItem>
                    <MenuItem value="Co-Creator">Co-Creator</MenuItem>
                    <MenuItem value="Advisor">Advisor</MenuItem>
                    <MenuItem value="Assistance">Assistance</MenuItem>
                    <MenuItem value="Lab-Assistance">Lab-Assistance</MenuItem>
                    <MenuItem value="External">External</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Access</InputLabel>
                  <Select
                    value={row.access}
                    onChange={(e) => handleInputChange(index, 'access', e.target.value)}
                    label="Access"
                    disabled={index === 0 || isDisabled}
                  >
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="WRITE">Write</MenuItem>
                    <MenuItem value="READ">Read</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={1} sx={{display: 'flex', justifyContent: 'center'}}>
                <IconButton
                  onClick={() => removeRow(index)}
                  color="secondary"
                  aria-label="delete"
                  style={{ float: 'left', height: "100%", fontSize: "32px" }}
                  disabled={index === 0 || isDisabled}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))}
        <Button variant="contained" color="primary" onClick={() => toggelSearchBarToAddPerson()} sx={{ margin: '8px'}} disabled={isDisabled}>
          Add
        </Button>
    </>
  )
}

export default PersonnelTab;
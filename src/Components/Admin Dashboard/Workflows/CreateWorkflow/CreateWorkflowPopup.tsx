import React from 'react'
import { Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button } from '@mui/material';


export default function CreateWorkflow({ open, onClose, onProceed } : any) {
  const [name, setName] = React.useState('');

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Workflow</DialogTitle> 
      <DialogContent sx={{ padding: 2 }}>
        <TextField
          label="Enter workflow name"
          variant="outlined"
          value={name}
          onChange={handleChange}
          sx={{ width: "450px", marginTop:"8px"}}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onProceed} color="primary">
          Proceed
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

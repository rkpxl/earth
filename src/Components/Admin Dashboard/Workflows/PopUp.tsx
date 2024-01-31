import React from 'react'
import { Dialog, DialogContent, DialogTitle, TextField, MenuItem, Button } from '@mui/material'

const Popup = ({ open, onClose, onSave }: any) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Details</DialogTitle>
      <DialogContent sx={{ padding: 2 }}>
        {/* Popup content */}
        <TextField label="Title" fullWidth margin="normal" />
        <TextField select label="Type" fullWidth margin="normal">
          <MenuItem value="x">X</MenuItem>
          <MenuItem value="y">Y</MenuItem>
          <MenuItem value="z">Z</MenuItem>
        </TextField>
        <TextField select label="Step Number" fullWidth margin="normal">
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </TextField>
        <TextField select label="Is Requires" fullWidth margin="normal">
          <MenuItem value="yes">Yes</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </TextField>
        <TextField label="Parent" fullWidth margin="normal" />
        <TextField label="Value" fullWidth margin="normal" />

        {/* Close button */}
        <Button onClick={onSave} color="primary" sx={{ marginTop: 2 }}>
          Save
        </Button>
        <Button onClick={onClose} color="primary" sx={{ marginTop: 2 }}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default Popup

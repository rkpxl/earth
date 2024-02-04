import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'

interface IProps {
  open: boolean
  data: {
    title: string
    description: string
  }
  setData: Function
  handleClose: Function
  handleSubmit: Function
}

const TitleDescriptionDialog = ({ open, data, setData, handleClose, handleSubmit }: IProps) => {
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Enter Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={data.title}
            onChange={(e) =>
              setData((prev: any) => {
                return { ...prev, title: e.target.value }
              })
            }
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            value={data.description}
            onChange={(e) =>
              setData((prev: any) => {
                return { ...prev, description: e.target.value }
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancel</Button>
          <Button onClick={() => handleSubmit()} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default TitleDescriptionDialog

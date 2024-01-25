import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Grid } from '@mui/material'
import { useDispatch } from 'react-redux'
import axiosInstance from '../../../Utils/axiosUtil'
import { showMessage } from '../../../Store/reducers/snackbar'
import * as type from '../../../Utils/types/type'
import { RefetchQueryFilters, useQueryClient } from '@tanstack/react-query'

const CreateApprovalDialog = ({ open, onClose, onSave }: any) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [nameError, setNameError] = useState('')
  const dispatch: type.AppDispatch = useDispatch()
  const queryClient = useQueryClient()

  const CreateApprovalDialogClose = () => {
    setTitle('')
    setDescription('')
    onClose()
  }

  const onSubmit = async () => {
    if (title.trim() === '') {
      setNameError('Title is required')
      return
    }
    try {
      const response = await axiosInstance.post('/approval-rules', {
        title,
        description: description || '',
        rules: [],
      })
      if (response.status <= 201) {
        dispatch(showMessage({ message: 'Approval Rule is added', severity: 'success' }))
      } else {
        dispatch(
          showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }),
        )
      }
      queryClient.refetchQueries(['get-approval-rules'] as RefetchQueryFilters)
    } catch (err) {
      console.error(err)
      dispatch(
        showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }),
      )
    }
    CreateApprovalDialogClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent sx={{ padding: 2 }}>
        <DialogTitle sx={{ padding: '0px' }}>New Workflow Details</DialogTitle>
        <TextField
          label="Enter Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          required={true}
          onChange={(e) => setTitle(e.target.value)}
          error={Boolean(nameError)}
          helperText={nameError}
          sx={{ minWidth: '450px' }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ minWidth: '450px' }}
        />

        {/* Buttons */}
        <Grid sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Button type="submit" onClick={onSubmit} color="primary" sx={{ marginTop: 1 }}>
            Add
          </Button>
          <Button onClick={CreateApprovalDialogClose} color="primary" sx={{ marginTop: 1 }}>
            Close
          </Button>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default CreateApprovalDialog

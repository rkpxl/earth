import React, { useReducer } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  FormHelperText,
  Select,
  MenuItem,
} from '@mui/material'
import axiosInstance from '../../../Utils/axiosUtil'
import { showMessage } from '../../../Store/reducers/snackbar'
import { AppDispatch } from '../../../Utils/types/type'
import { useDispatch } from 'react-redux'
import { fetchCompliances } from '../../../Store/reducers/compliance'
import { Page } from '../../../Utils/constants'
import { useQuery } from '@tanstack/react-query'

interface State {
  name: string
  description: string
  tabCount: number
  isParallelApproval: boolean
  isExternalSubmission: boolean
  approvalRulesId: string
  tabNames: string[]
  errors: {
    name?: string
    tabCount?: string
    general?: string
    stepName?: string
    description?: string
  }
}

type Action =
  | { type: 'change'; field: string; value: string | number | boolean | string[] }
  | { type: 'validate' }
  | { type: 'reset' }

const initialState: State = {
  name: '',
  description: '',
  tabCount: 1,
  isParallelApproval: false,
  isExternalSubmission: false,
  approvalRulesId: '',
  tabNames: Array(1).fill(''),
  errors: {},
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' },
      }
    case 'validate':
      const errors: State['errors'] = {}
      if (!state.name.trim()) {
        errors.name = 'Name is required'
      }
      if (state.tabCount < 1) {
        errors.tabCount = 'Tab Count should be greater than 0'
      }
      const isValid = state.tabNames.filter((name) => name === '')
      if (isValid.length > 0) {
        errors.stepName = "Tab Name can't be empty"
      }
      if (state.description === '') {
        errors.description = "Description can't be empty"
      }
      return { ...state, errors }
    case 'reset':
      return initialState
    default:
      return state
  }
}

interface AddDialogProps {
  open: boolean
  onClose: () => void
  onSubmit?: () => void
}

const AddDialog: React.FC<AddDialogProps> = ({ open, onClose, onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatcher: AppDispatch = useDispatch()

  const handleTabCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value, 10) || 1
    dispatch({ type: 'change', field: 'tabCount', value: count })

    // Update tabNames array when tabCount changes
    const tabNames = Array(count)
      .fill('')
      .map((_, index) => state.tabNames[index] || '')
    dispatch({ type: 'change', field: 'tabNames', value: tabNames })
  }

  const handleSwitchChange = (field: keyof State) => {
    dispatch({ type: 'change', field, value: !state[field] })
  }

  const handleTextChange = (field: string, value: string | number | boolean | string[]) => {
    dispatch({ type: 'change', field, value })
  }

  const { data: approvalRule } = useQuery({
    queryKey: ['get-approval-rules'],
    queryFn: async () => {
      try {
        const approvalRule = await axiosInstance.get('/approval-rules')
        return approvalRule.data
      } catch (err) {
        console.error(err)
      }
    },
  })

  const handleSave = async () => {
    await dispatch({ type: 'validate' })

    // Check if there are any errors
    const isValid = state.tabNames.filter((name) => name === '')
    if (!state.name || state.tabCount < 1 || isValid.length > 0) {
      return
    } else {
      try {
        // TODO: Replace the following API call with your actual API endpoint and payload
        const finalTabName = state.tabNames.map((step, index) => {
          return {
            name: step,
            position: index + 1,
          }
        })
        const response = await axiosInstance.post('/compliance', {
          title: state.name,
          description: state.description || '',
          stepCount: 1,
          tabCount: state.tabCount,
          isParallelApproval: state.isParallelApproval,
          isExternalSubmission: state.isExternalSubmission,
          approvalRulesId: state.approvalRulesId,
          stepNames: [],
          tabNames: finalTabName,
        })

        if (response.status < 300) {
          // TODO: Handle success, e.g., show a success message
          dispatcher(showMessage({ message: 'Compliance is added', severity: 'success' }))
          dispatcher(fetchCompliances())
          dispatch({ type: 'reset' })
          onClose()
        } else {
          // TODO: Handle failure, e.g., show an error message
          dispatcher(
            showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }),
          )
          console.error('Error adding item:', response.data)
        }
      } catch (error) {
        dispatcher(
          showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }),
        )
        console.error('Error adding item:', error)
      }
    }
  }

  const onDialogClose = () => {
    onClose()
    dispatch({ type: 'reset' })
  }

  const approvalRuleName =
    approvalRule?.filter((ap: any) => ap.id == parseInt(state.approvalRulesId))[0]?.id || ''

  return (
    <Dialog open={open} onClose={onDialogClose} maxWidth="xs" fullWidth>
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={state.name}
          onChange={(e) => handleTextChange('name', e.target.value)}
          error={!!state.errors.name}
          helperText={state.errors.name}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          value={state.description}
          error={!!state.errors.description}
          helperText={state.errors.description}
          onChange={(e) => handleTextChange('description', e.target.value)}
        />
        <TextField
          label="Tab Count"
          type="number"
          fullWidth
          margin="normal"
          value={state.tabCount}
          onChange={handleTabCountChange}
          error={!!state.errors.tabCount}
          helperText={state.errors.tabCount}
        />
        {state.tabNames.map((stepName, index) => (
          <TextField
            key={index}
            label={`Tab ${index + 1} Name`}
            fullWidth
            margin="normal"
            value={stepName}
            error={!!state.errors.stepName}
            helperText={state.errors.stepName}
            onChange={(e) => {
              const newTabNames = [...state.tabNames]
              newTabNames[index] = e.target.value
              handleTextChange('tabNames', newTabNames)
            }}
          />
        ))}
        <FormControlLabel
          control={
            <Switch
              checked={state.isParallelApproval}
              onChange={() => handleSwitchChange('isParallelApproval')}
            />
          }
          label="Is Parallel Approval"
        />
        <FormControlLabel
          control={
            <Switch
              checked={state.isExternalSubmission}
              onChange={() => handleSwitchChange('isExternalSubmission')}
            />
          }
          label="Is External Submission"
        />
        <Select
          sx={{ width: '100%' }}
          value={approvalRuleName}
          onChange={(e) => handleTextChange('approvalRulesId', e.target.value)}
        >
          {approvalRule?.map((rule: any) => (
            <MenuItem key={rule._is} value={rule.id}>
              {rule?.title}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText error>{state.errors.general}</FormHelperText>
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 1 }}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddDialog

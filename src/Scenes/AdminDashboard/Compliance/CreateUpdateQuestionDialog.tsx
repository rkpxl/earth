import React, { useEffect, useReducer, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Grid,
} from '@mui/material'
import axiosInstance from '../../../Utils/axiosUtil'
import { showMessage } from '../../../Store/reducers/snackbar'
import { AppDispatch, IQuestion, QuestionType } from '../../../Utils/types/type'
import { useDispatch } from 'react-redux'
import { fetchCompliances } from '../../../Store/reducers/compliance'
import { Page } from '../../../Utils/constants'

interface State {
  title: string
  description: string
  questionType: QuestionType
  priority: any
  valueCount: number
  answerOptions: any
  isActive: boolean
  depId?: number | null
  depValue?: any
  isFullWidth?: boolean
  isRequired: boolean
  errors: {
    title?: string
    description?: string
    questionType?: string
    priority?: string
    valueCount?: string
    answerOptions?: string
    general?: string
  }
}

type Action =
  | { type: 'change'; field: string; value: string | number | boolean | string[] }
  | { type: 'validate' }
  | { type: 'reset' }

const questionDropDown = [
  {
    name: 'Text',
    value: 'text',
  },
  {
    name: 'Big Text Box',
    value: 'bigtext',
  },
  {
    name: 'Dropdown',
    value: 'dropdown',
  },
  {
    name: 'Yes No',
    value: 'yesno',
  },
  {
    name: 'Multi Select',
    value: 'multiselect',
  },
  {
    name: 'Info',
    value: 'info',
  },
  {
    name: 'Date Time',
    value: 'datetime',
  },
]

const initialState: State = {
  title: '',
  description: '',
  questionType: 'text',
  priority: 10,
  valueCount: 0,
  isActive: true,
  depId: null,
  depValue: null,
  isFullWidth: false,
  isRequired: false,
  answerOptions: Array(1).fill(''),
  errors: {},
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'change':
      if (action.field === 'questionType') {
        state.valueCount = 0
        state.answerOptions = []
      }
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' },
      }
    case 'validate':
      const errors: State['errors'] = {}
      if (!state.title.trim()) {
        errors.title = 'Name is required'
      }
      if (state.questionType !== 'text' && state && state?.valueCount < 1) {
        if (state.questionType !== 'yesno') {
          errors.valueCount = 'Value Count should be greater than 0'
        }
      }
      const isValid =
        state.questionType !== 'text'
          ? state?.answerOptions.filter((title: any) => title === '')
          : []
      if (isValid.length > 0) {
        errors.answerOptions = "Value Name can't be empty"
      }
      if (state.description === '') {
        errors.description = "Description can't be empty"
      }
      return { ...state, errors }
    case 'reset':
      return { ...initialState }
    default:
      return state
  }
}

interface IProps {
  open: boolean
  data?: IQuestion | undefined | null
  onClose: () => void
  onSubmit?: () => void
  maxPriority?: number
  complianceId: string | string[] | undefined
  tabNumber: number
}

const CreateUpdateQuestionDialog: React.FC<IProps> = ({
  open,
  data,
  onClose,
  onSubmit,
  complianceId,
  tabNumber,
  maxPriority = 10,
}) => {
  const isUpdate = Boolean(data)
  if (isUpdate) {
    initialState.title = data?.title || ''
    initialState.description = data?.description || ''
    initialState.depId = data?.dependent?.key
    initialState.depValue = data?.dependent?.value
    initialState.questionType = data?.questionType || 'text'
    initialState.priority = data?.priority || 1
    initialState.valueCount = data?.answerOptions?.length || 1
    initialState.isActive = data?.isActive || true
    initialState.answerOptions = data?.answerOptions || []
    initialState.isFullWidth = data?.isFullWidth
    initialState.isRequired = data?.isRequired || false
  } else {
    initialState.title = ''
    initialState.description = ''
    initialState.questionType = 'text'
    initialState.priority = 10
    initialState.valueCount = 0
    initialState.isActive = true
    initialState.depId = null
    initialState.depValue = null
    initialState.isFullWidth = false
    initialState.isRequired = false
    initialState.answerOptions = Array(1).fill('')
    initialState.errors = {}
  }

  const priorities: number[] = Array.from({ length: maxPriority }, (_, index) => index + 1)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isEditing, setIsEditing] = useState<boolean>()
  const dispatcher: AppDispatch = useDispatch()

  useEffect(() => {
    setIsEditing(true)
  }, [open])

  const handleValueCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value, 10) || 1
    dispatch({ type: 'change', field: 'valueCount', value: count })

    // Update stepNames array when stepCount changes
    const answerOptions = Array(count)
      .fill('')
      .map((_, index) => state.answerOptions[index] || '')
    dispatch({ type: 'change', field: 'answerOptions', value: answerOptions })
  }

  const handleSwitchChange = (field: keyof State) => {
    dispatch({ type: 'change', field, value: !state[field] })
  }

  const handleTextChange = (field: string, value: string | number | boolean | string[]) => {
    dispatch({ type: 'change', field, value })
  }

  const handleSave = async () => {
    await dispatch({ type: 'validate' })

    // Check if there are any errors
    const isValid = state.answerOptions.filter((name: any) => name === '')
    if (!state.title || !state.description) {
      return
    } else {
      try {
        if ((!complianceId || !tabNumber || !data?.id) && isUpdate) {
          dispatcher(
            showMessage({
              message: "Somehitng went wrong, compliance Id Doesn't exist",
              severity: 'error',
            }),
          )
        }
        const finalStepName = state?.answerOptions
        const response = !isUpdate
          ? await axiosInstance.post('/questions', {
              complianceId: parseInt(complianceId as string),
              tabNumber: tabNumber,
              stepNumber: 1,
              dependent:
                state.depId && state.depValue
                  ? {
                      key: state.depId,
                      value: state.depValue,
                    }
                  : {},
              title: state.title,
              description: state.description || '',
              questionType: state.questionType,
              priority: state.priority + '',
              answerOptions: finalStepName,
              isActive: state.isActive,
              isFullWidth: state.isFullWidth,
              isRequired: state.isRequired,
            })
          : await axiosInstance.put(`/questions/${data?.id}`, {
              title: state.title,
              description: state.description,
              isFullWidth: state.isFullWidth,
              isRequired: state.isRequired,
            })

        if (response.status < 300) {
          // TODO: Handle success, e.g., show a success message
          dispatcher(
            showMessage({
              message: isUpdate ? 'Question is updated' : 'Question is added',
              severity: 'success',
            }),
          )
          dispatcher(fetchCompliances())
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
      } finally {
        dispatch({ type: 'reset' })
      }
    }
  }

  const onDialogClose = () => {
    onClose()
    dispatch({ type: 'reset' })
  }

  return (
    <Dialog open={open} onClose={onDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isUpdate ? 'Update Question' : 'Add New Question'}</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <TextField
            label="Title"
            fullWidth
            value={state.title}
            onChange={(e) => handleTextChange('title', e.target.value)}
            disabled={isUpdate ? isEditing : false}
            error={!!state.errors.title}
            helperText={state.errors.title}
          />
        </Box>
        <Box>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={state.description}
            error={!!state.errors.description}
            helperText={state.errors.description}
            onChange={(e) => handleTextChange('description', e.target.value)}
            disabled={isUpdate ? isEditing : false}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ my: 2 }}>
              <TextField
                label="Depedent ID"
                fullWidth
                value={state.depId}
                onChange={(e) => handleTextChange('depId', e.target.value)}
                disabled={isUpdate ? isEditing : false}
                error={!!state.errors.title}
                helperText={state.errors.title}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ my: 2 }}>
              <TextField
                label="Depedent Value"
                fullWidth
                value={state.depValue}
                onChange={(e) => handleTextChange('depValue', e.target.value)}
                disabled={isUpdate ? isEditing : false}
                error={!!state.errors.title}
                helperText={state.errors.title}
              />
            </Box>
          </Grid>
        </Grid>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel id="dropdown-label">Question Type</InputLabel>
            <Select
              labelId="Question Type"
              label="Question Type"
              id="dropdown"
              value={state.questionType}
              disabled={isUpdate ? true : false}
              onChange={(e) => handleTextChange('questionType', e.target.value)}
            >
              {questionDropDown.map((q) => (
                <MenuItem key={q.value} value={q.value}>
                  {q.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box marginBottom={2}>
          <FormControl fullWidth>
            <InputLabel id="priority-dropdown-label">Question Priority</InputLabel>
            <Select
              label="Question Priority"
              labelId="priority-dropdown-label"
              id="priority-dropdown"
              value={state.priority}
              disabled={isUpdate ? true : false}
              onChange={(e) => handleTextChange('priority', e.target.value)}
            >
              {priorities.map((q) => (
                <MenuItem key={q} value={q}>
                  {q}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {(state.questionType === 'dropdown' || state.questionType === 'multiselect') && (
          <Box marginBottom={2}>
            <TextField
              label="Value Count"
              type="number"
              fullWidth
              value={state.valueCount}
              onChange={handleValueCountChange}
              error={!!state.errors.valueCount}
              helperText={state.errors.valueCount}
              disabled={isUpdate ? true : false}
            />
          </Box>
        )}
        {state.questionType !== 'text' &&
          state.questionType !== 'yesno' &&
          state.questionType !== 'bigtext' &&
          state.answerOptions.map((v: any, index: number) => (
            <Box key={index} marginBottom={2}>
              <TextField
                label={`Value ${index + 1}`}
                fullWidth
                value={v}
                error={!!state.errors.answerOptions}
                helperText={state.errors.answerOptions}
                disabled={
                  isUpdate
                    ? true
                    : !(state.questionType !== 'text' && state.questionType !== 'yesno')
                }
                onChange={(e) => {
                  const newValues = [...state.answerOptions]
                  newValues[index] = e.target.value
                  handleTextChange('answerOptions', newValues)
                }}
              />
            </Box>
          ))}
        <Box marginBottom={2}>
          <FormControlLabel
            control={
              <Switch checked={state.isActive} onChange={() => handleSwitchChange('isActive')} />
            }
            disabled={isUpdate ? isEditing : false}
            label="Is Active"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.isFullWidth}
                onChange={() => handleSwitchChange('isFullWidth')}
              />
            }
            disabled={isUpdate ? isEditing : false}
            label="Fill Width"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.isRequired}
                onChange={() => handleSwitchChange('isRequired')}
              />
            }
            disabled={isUpdate ? isEditing : false}
            label="Is Required"
          />
        </Box>
        <FormHelperText sx={{ mb: 2 }} error>
          {state.errors.general}
        </FormHelperText>
        <Box>
          {isUpdate ? (
            <>
              {isEditing ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing((prev) => !prev)}
                >
                  Edit
                </Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              )}
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSave}>
              Add
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default CreateUpdateQuestionDialog

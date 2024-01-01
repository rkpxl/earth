import React, { useEffect, useReducer, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  TextField, Button, FormControlLabel,
  Switch, FormHelperText, FormControl,
  InputLabel, Select,  MenuItem, Box,
} from '@mui/material';
import axiosInstance from '../../../Utils/axiosUtil';
import { showMessage } from '../../../Store/reducers/snackbar';
import { AppDispatch, IQuestion, QuestionType } from '../../../Utils/types/type';
import { useDispatch } from 'react-redux';
import { fetchCompliances } from '../../../Store/reducers/compliance';

interface State {
  title: string;
  description: string;
  questionType: QuestionType;
  priority: number;
  valueCount: number;
  values: string[] ;
  isActive: boolean;
  errors: {
    title?: string;
    description?: string;
    questionType?: string;
    priority?: string;
    valueCount?: string;
    values?: string;
    general?: string,
  };
}

type Action =
  | { type: 'change'; field: string; value: string | number | boolean |string[] }
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
]

const initialState: State = {
  title: '',
  description: '',
  questionType: 'text',
  priority: 10,
  valueCount: 0,
  isActive: true,
  values: Array(1).fill(''),
  errors: {},
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'change':
      if(action.field === 'questionType') {
        state.valueCount = 0
        state.values = []
      }
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' },
      };
    case 'validate':
      const errors: State['errors'] = {};
      if (!state.title.trim()) {
        errors.title = 'Name is required';
      }
      if (state.questionType !== 'text' && state && state?.valueCount < 1) {
        errors.valueCount = 'Step Count should be greater than 0';
      }
      const isValid = state.questionType !== 'text' ? state?.values.filter(title => title === '') : []
      if(isValid.length > 0) {
        errors.values = "Step Name can't be empty";
      }
      if(state.description === '') {
        errors.description = "Description can't be empty";
      }
      return { ...state, errors}
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

interface IProps {
  open: boolean;
  data?: IQuestion | undefined | null;
  onClose: () => void;
  onSubmit?: () => void;
  maxPriority?: number;
}

const CreateUpdateQuestionDialog: React.FC<IProps> = ({ open, data, onClose, onSubmit, maxPriority = 10 }) => {
  const isUpdate = Boolean(data)
  const priorities: number [] = Array.from({ length: maxPriority }, (_, index) => index + 1);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditing, setIsEditing] = useState<boolean>()
  const dispatcher: AppDispatch = useDispatch()

  useEffect(() => {
    setIsEditing(true)
  }, [open])

  const handleValueCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value, 10) || 1;
    dispatch({ type: 'change',  field: 'valueCount', value: count });

    // Update stepNames array when stepCount changes
    const values = Array(count).fill('').map((_, index) => state.values[index] || '');
    dispatch({ type: 'change', field: 'values', value: values });
  };

  const handleSwitchChange = (field: keyof State) => {
    dispatch({ type: 'change', field, value: !state[field] });
  };

  const handleTextChange = (
    field: string,
    value: string | number | boolean | string[]
  ) => {
    dispatch({ type: 'change', field, value });
  };

  const handleSave = async () => {
    await dispatch({ type: 'validate' });

    // Check if there are any errors
    const isValid = state.values.filter(name => name === '')
    if (!state.title) {
      return;
    } else {
      try {
        // TODO: Replace the following API call with your actual API endpoint and payload
        const finalStepName = state.values.map((step, index) =>  {
          return {
          name: step,
          position: index + 1,
        } })
        const response = await axiosInstance.post('/compliance', {
          title: state.title,
          description: state.description || '',
          questionType: state.questionType,
          priority: state.priority,
          isActive: state.isActive,
          values: finalStepName,
        });
  
        if (response.status < 300) {
          // TODO: Handle success, e.g., show a success message
          dispatcher(showMessage({ message: 'Compliance is added', severity: 'success' }));
          dispatcher(fetchCompliances())
          dispatch({ type: 'reset' });
          onClose();
        } else {
          // TODO: Handle failure, e.g., show an error message
          dispatcher(showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }));
          console.error('Error adding item:', response.data);
        }
      } catch (error) {
        dispatcher(showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }));
        console.error('Error adding item:', error);
      }
    }
  };

  const onDialogClose = () => {
    onClose()
    dispatch({ type: 'reset' });
  }

  return (
    <Dialog open={open} onClose={onDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isUpdate ? 'Update Question' : 'Add New Question'}</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2}}>
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
        <Box marginBottom={2}>
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
        <Box marginBottom={2}>
          <TextField
            label="Value Count"
            type="number"
            fullWidth
            value={state.valueCount}
            onChange={handleValueCountChange}
            error={!!state.errors.valueCount}
            helperText={state.errors.valueCount}
            disabled={isUpdate ? true : !(state.questionType !== 'text' && state.questionType !== 'yesno')}
          />
        </Box>
        {state.values.map((v, index) => (
          <Box key={index} marginBottom={2}>
            <TextField
              label={`Value ${index + 1}`}
              fullWidth
              value={v}
              error={!!state.errors.values}
              helperText={state.errors.values}
              disabled={isUpdate ? true : !(state.questionType !== 'text' && state.questionType !== 'yesno')}
              onChange={(e) => {
                const newValues = [...state.values];
                newValues[index] = e.target.value;
                handleTextChange('values', newValues);
              }}
            />
          </Box>
        ))}
        <Box marginBottom={2}>
          <FormControlLabel
            control={
              <Switch
                checked={state.isActive}
                onChange={() => handleSwitchChange('isActive')}
              />
            }
            disabled={isUpdate ? isEditing : false}
            label="Is Active"
          />
        </Box>
        <FormHelperText sx={{ mb: 2 }} error>{state.errors.general}</FormHelperText>
        <Box>
          {isUpdate ? (
            <>
              {isEditing ? (
                <Button variant="contained" color="primary" onClick={() => setIsEditing((prev) => !prev)}>
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
  );
};

export default CreateUpdateQuestionDialog;

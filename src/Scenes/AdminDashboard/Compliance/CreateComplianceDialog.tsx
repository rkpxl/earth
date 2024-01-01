import React, { useReducer } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  FormHelperText,
} from '@mui/material';
import axiosInstance from '../../../Utils/axiosUtil';
import { showMessage } from '../../../Store/reducers/snackbar';
import { AppDispatch } from '../../../Utils/types/type';
import { useDispatch } from 'react-redux';
import { fetchCompliances } from '../../../Store/reducers/compliance';

interface State {
  name: string;
  description: string;
  stepCount: number;
  isParallelApproval: boolean;
  isExternalSubmission: boolean;
  approvalRulesId: string;
  stepNames: string[];
  errors: {
    name?: string;
    stepCount?: string;
    general?: string;
    stepName?: string,
    description?: string,
  };
}

type Action =
  | { type: 'change'; field: string; value: string | number | boolean |string[] }
  | { type: 'validate' }
  | { type: 'reset' }

const initialState: State = {
  name: '',
  description: '',
  stepCount: 1,
  isParallelApproval: false,
  isExternalSubmission: false,
  approvalRulesId: '',
  stepNames: Array(1).fill(''),
  errors: {},
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' },
      };
    case 'validate':
      const errors: State['errors'] = {};
      if (!state.name.trim()) {
        errors.name = 'Name is required';
      }
      if (state.stepCount < 1) {
        errors.stepCount = 'Step Count should be greater than 0';
      }
      const isValid = state.stepNames.filter(name => name === '')
      if(isValid.length > 0) {
        errors.stepName = "Step Name can't be empty";
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

interface AddDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const AddDialog: React.FC<AddDialogProps> = ({ open, onClose, onSubmit }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatcher: AppDispatch = useDispatch()

  const handleStepCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value, 10) || 1;
    dispatch({ type: 'change',  field: 'stepCount', value: count });

    // Update stepNames array when stepCount changes
    const stepNames = Array(count).fill('').map((_, index) => state.stepNames[index] || '');
    dispatch({ type: 'change', field: 'stepNames', value: stepNames });
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
    const isValid = state.stepNames.filter(name => name === '')
    if (!state.name || state.stepCount < 1 || isValid.length > 0) {
      return;
    } else {
      try {
        // TODO: Replace the following API call with your actual API endpoint and payload
        const finalStepName = state.stepNames.map((step, index) =>  {
          return {
          name: step,
          position: index + 1,
        } })
        const response = await axiosInstance.post('/compliance', {
          title: state.name,
          description: state.description || '',
          stepCount: state.stepCount,
          isParallelApproval: state.isParallelApproval,
          isExternalSubmission: state.isExternalSubmission,
          approvalRulesId: state.approvalRulesId,
          stepNames: finalStepName,
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
          label="Step Count"
          type="number"
          fullWidth
          margin="normal"
          value={state.stepCount}
          onChange={handleStepCountChange}
          error={!!state.errors.stepCount}
          helperText={state.errors.stepCount}
        />
        {state.stepNames.map((stepName, index) => (
          <TextField
            key={index}
            label={`Step ${index + 1} Name`}
            fullWidth
            margin="normal"
            value={stepName}
            error={!!state.errors.stepName}
            helperText={state.errors.stepName}
            onChange={(e) => {
              const newStepNames = [...state.stepNames];
              newStepNames[index] = e.target.value;
              handleTextChange('stepNames', newStepNames);
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
        <TextField
          label="Approval Rules ID"
          fullWidth
          margin="normal"
          value={state.approvalRulesId}
          onChange={(e) => handleTextChange('approvalRulesId', e.target.value)}
        />
        <FormHelperText error>{state.errors.general}</FormHelperText>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;

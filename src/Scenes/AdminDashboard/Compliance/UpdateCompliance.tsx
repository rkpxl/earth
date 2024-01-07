import React, { useEffect, useReducer, useState } from 'react'
import { AppDispatch, ICompliance } from '../../../Utils/types/type'
import { Button, Card, CardContent, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { showMessage } from '../../../Store/reducers/snackbar';
import { fetchCompliances } from '../../../Store/reducers/compliance';
import axiosInstance from '../../../Utils/axiosUtil';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { isObject } from 'formik';
import ConfirmationPopup from '../../../Components/Common/ConfirmationDialog';
import { openConfirmation } from '../../../Store/reducers/confirm';

interface IProps {
  compliance: ICompliance
}

interface State {
  name: string;
  description: string;
  tabCount: number;
  isParallelApproval: boolean;
  isExternalSubmission: boolean;
  approvalRulesId: string;
  tabNames: any[];
  errors?: {
    name?: string;
    tabCount?: string;
    general?: string;
    stepName?: string,
    description?: string,
  };
}

type Action =
  | { type: 'change'; field: string; value: string | number | boolean |string[] }
  | { type: 'update'; value: State }
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
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' },
      };
    case 'update':
      return {
        ...action.value
      };
    case 'validate':
      const errors: State['errors'] = {};
      if (!state.name.trim()) {
        errors.name = 'Name is required';
      }
      if (state.tabCount < 1) {
        errors.tabCount = 'Tab Count should be greater than 0';
      }
      const isValid = state.tabNames.filter(name => name === '')
      if(isValid.length > 0) {
        errors.stepName = "Tab Name can't be empty";
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

export default function UpdateCompliance(props: IProps) {
  const { compliance } = props
  const router = useRouter()
  const { id } = router.query
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<any>();
  const dispatcher: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'update', value: {
      name: compliance.title,
      description: compliance.description || '',
      tabCount: compliance.tabCount,
      isParallelApproval: compliance.isParallelApproval,
      isExternalSubmission: compliance.isExternalSubmission,
      approvalRulesId: compliance.approvalRulesId || '',
      tabNames: compliance.tabNames,
    }})
  }, [])

  const handleTabCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(event.target.value, 10) || 1;
    dispatch({ type: 'change',  field: 'tabCount', value: count });

    // Update tabNames array when tabCount changes
    const tabNames = Array(count).fill('').map((_, ind) => ((state?.tabNames && state.tabNames[ind]) ? state.tabNames[ind] : ''));
    dispatch({ type: 'change', field: 'tabNames', value: tabNames });
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

  const handleSave = async (id: string) => {
    try {
      const finalTabs = state.tabNames.map((step, index) => {
        return isObject(step) ? step : {
          name: step,
          positions: index+1
        }
      })
      const response = await axiosInstance.put(`/compliance/${id}`, {
        title: state.name,
        description: state.description || '',
        tabCount: state.tabCount,
        isParallelApproval: state.isParallelApproval,
        isExternalSubmission: state.isExternalSubmission,
        approvalRulesId: state.approvalRulesId,
        tabNames: finalTabs,
      });

      if (response.status < 300) {
        // TODO: Handle success, e.g., show a success message
        dispatcher(showMessage({ message: 'Compliance is updated', severity: 'success' }));
        dispatcher(fetchCompliances())
        dispatch({ type: 'reset' });
        router.push("/admin-dashboard/compliance")
      } else {
        // TODO: Handle failure, e.g., show an error message
        dispatcher(showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }));
        console.error('Error adding item:', response.data);
      }
    } catch (error) {
      dispatcher(showMessage({ message: 'Internal server error, contact to admin', severity: 'error' }));
      console.error('Error adding item:', error);
    }
  };


  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    // Implement your update logic here
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string | number) => {
    setUpdatedData((prevData : any) => ({ ...prevData, [field]: value }));
  };
  
  const handleOpenConfirmation = async () => {
    await dispatch({ type: 'validate' });

    // Check if there are any errors
    const isValid = state.tabNames.filter(name => name === '')
    if (!state.name || state.tabCount < 1 || isValid.length > 0) {
      return;
    } else {
      dispatcher(
        openConfirmation({
          args: id,
        })
      );
    }
  };
  
  return (
    <Grid sx={{ overflowY: 'auto' }}>
      <ConfirmationPopup handleConfirm={handleSave} />
      <Card sx={{ maxWidth: 750, margin: 'auto', marginTop: 4, marginBottom: 4, px: 2 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {isEditing ? 'Edit Details' : 'Compliance Details'}
          </Typography>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={state.name}
            onChange={(e) => handleTextChange('name', e.target.value)}
            error={!!state?.errors?.name}
            helperText={state?.errors?.name}
            disabled={!isEditing}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            margin="normal"
            value={state.description}
            error={!!state?.errors?.description}
            helperText={state?.errors?.description}
            onChange={(e) => handleTextChange('description', e.target.value)}
            disabled={!isEditing}
          />
          <TextField
            label="Tab Count"
            type="number"
            fullWidth
            margin="normal"
            value={state.tabCount}
            onChange={handleTabCountChange}
            error={!!state?.errors?.tabCount}
            helperText={state?.errors?.tabCount}
            disabled={!isEditing}
          />
          <Grid container spacing={2}>
            {state?.tabNames?.map((stepName, index) => (
              <Grid key={index} item xs={12} md={6}>
                <TextField
                  label={`Tab ${index + 1} Name`}
                  fullWidth
                  margin="normal"
                  value={stepName.name}
                  error={!!state?.errors?.stepName}
                  helperText={state?.errors?.stepName}
                  onChange={(e) => {
                    const newTabNames = [...state.tabNames];
                    newTabNames[index] = e.target.value;
                    handleTextChange('tabNames', newTabNames);
                  }}
                  disabled={!isEditing}
                />
              </Grid>
            ))}
          </Grid>
          <FormControlLabel
            control={
              <Switch
                checked={state.isParallelApproval}
                onChange={() => handleSwitchChange('isParallelApproval')}
              />
            }
            label="Is Parallel Approval"
            disabled={!isEditing}
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.isExternalSubmission}
                onChange={() => handleSwitchChange('isExternalSubmission')}
              />
            }
            label="Is External Submission"
            disabled={!isEditing}
          />
          <TextField
            label="Approval Rules ID"
            fullWidth
            margin="normal"
            value={state.approvalRulesId}
            onChange={(e) => handleTextChange('approvalRulesId', e.target.value)}
            disabled={!isEditing}
          />

          {isEditing ? (
            <Button variant="contained" color="primary" onClick={handleOpenConfirmation} sx={{marginTop: 2}}>
              Update
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleEdit} sx={{marginTop: 1}}>
              Edit
            </Button>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

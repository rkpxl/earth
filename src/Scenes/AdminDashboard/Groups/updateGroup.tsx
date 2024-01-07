import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axiosInstance from '../../../Utils/axiosUtil';
import { IGroup } from '../../../Utils/types/type';
import { showMessage } from '../../../Store/reducers/snackbar';
import { useDispatch } from 'react-redux';

const EditableGroup = ({ group }: any) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(group.name);
  const [email, setEmail] = useState(group.primaryEmail);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
        const response = await axiosInstance.put(`/group/${group.id}`, { name, primaryEmail: email });
        if(response.status < 300) {
          dispatch(showMessage({ message: "Group info saved", severity: 'success'}))
        } 
    } catch(err) {
        console.error(err)
        dispatch(showMessage({ message: "Group info not updated, try again", severity: 'error'}))
    }

    setIsEditing(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h5" gutterBottom>
            Edit Group
          </Typography>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" spacing={2} style={{ marginTop: 10 }}>
              {!isEditing ? (
                <Grid item>
                  <Button variant="contained" color="primary" onClick={handleEdit}>
                    Edit
                  </Button>
                </Grid>
              ) : (
                <>
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={handleSave} disabled={!(group.name !== name || group.primaryEmail !== email)}>
                      Save
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditableGroup;

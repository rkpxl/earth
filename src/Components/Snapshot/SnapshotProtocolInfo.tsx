import React from 'react';
import { Card, CardContent, List, ListItem, ListItemText, Typography, Divider, Grid } from '@mui/material';

const ProtocolInfo = ({ protocol } : any) => {
  return (
    <Card raised  sx={{ m: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Protocol Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Principal Investigator" secondary={protocol?.piName ||''} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Title" secondary={protocol?.title} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Description" secondary={protocol?.description} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <Grid container>
              <Grid item xs={12} sm={6}>
                <ListItemText primary="Status" secondary={protocol?.status} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ListItemText primary="Action Status" secondary={protocol?.actionStatus} />
              </Grid>
            </Grid>
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Protocol Action" secondary={protocol?.protocolAction} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Department" secondary={protocol?.department} />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Compliance ID" secondary={protocol?.complianceId} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ProtocolInfo;

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActions, Typography } from '@mui/material';


const WorkflowCard = ({ title = "t", createdDate, modifiedDate, isActive, onDelete } : any) => {
  const avatarLetter = title.charAt(0).toUpperCase();

  return (
    <Card sx={{ boxShadow: 5, height: "100px", margin: "16px" }}>
      <CardHeader
        avatar={<Avatar>{avatarLetter}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={`Created Date: ${createdDate} | Modified Date: ${modifiedDate}`}
      />

      <CardContent>
        {/* Your card content goes here */}
        <Typography variant="body2" color="text.secondary">
          {/* Additional content */}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {/* Options in the right side */}
        <IconButton aria-label="is active" onClick={() => console.log('Toggle Active')}>
          {isActive ? 'Active' : 'Inactive'}
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete}>
          Delete
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default WorkflowCard;

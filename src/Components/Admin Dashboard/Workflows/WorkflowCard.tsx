import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActions, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';


const WorkflowCard = ({ title = "t", createdDate, modifiedDate, isActive, onDelete } : any) => {
  const avatarLetter = title.charAt(0).toUpperCase();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditDetails = () => {
    console.log('Option 3');
    router.push('/admin-dashboard/workflows/123'); 
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ boxShadow: 5, height: "100px", margin: "16px" }}>
      <CardHeader
        avatar={<Avatar>{avatarLetter}</Avatar>}
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => console.log('Option 1')}>
                Make {isActive ? 'Inactive' : 'Active'}
              </MenuItem>
              <MenuItem onClick={handleEditDetails}>
                Edit Details
              </MenuItem>
              <MenuItem onClick={() => console.log('Option 2')}>
                Delete
              </MenuItem>
            </Menu>
          </>
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
    </Card>
  );
};

export default WorkflowCard;

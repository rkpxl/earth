import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CardActions, Grid, Typography } from '@mui/material';
import { getStandatedDate } from '../../../Utils/dateTime';
import {
  Menu,
  MenuItem,
} from '@mui/material';


const DepartmentCard = ({ department } : any) => {

  const { name, createdAt, updatedAt, primaryEmail, isActive, onDelete } = department
  const avatarLetter = name.charAt(0).toUpperCase();
  const [toggle, setToggle] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event : any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleBar = () => { setToggle((prev) => !prev) }

  return (
    <Card sx={{ boxShadow: 5, height: "100px", margin: "16px" }}>
      <CardHeader
        avatar={<Avatar>{avatarLetter}</Avatar>}
        action={
          <Grid>
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {/* Add your dropdown menu items here */}
              <MenuItem onClick={() => console.log('Option 1 clicked')}>
              {!(Boolean(isActive)) ? 'Activate' : 'Inactivate'}
              </MenuItem>
              <MenuItem onClick={() => console.log('Option 2 clicked')}>
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        }
        title={name}
        subheader={`Created Date: ${getStandatedDate(createdAt)} | Modified Date: ${getStandatedDate(updatedAt)}`}
      />
    </Card>
  );
};

export default DepartmentCard;

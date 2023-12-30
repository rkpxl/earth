import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Grid } from '@mui/material';
import { getStandatedDate } from '../../../Utils/dateTime';
import {
  Menu,
  MenuItem,
} from '@mui/material';


const AdminCard = ({ card, onDelete } : any) => {

  const { name, createdAt, updatedAt, isActive } = card
  const avatarLetter = name.charAt(0).toUpperCase();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event : any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnDelete = () => {
    handleMenuClose()
    onDelete()
  }

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
              <MenuItem onClick={handleOnDelete}>
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

export default AdminCard;

import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Grid } from '@mui/material'
import { getStandatedDate } from '../../../Utils/dateTime'
import { Menu, MenuItem } from '@mui/material'

const AdminCard = ({ card, onDelete, onManageClick }: any) => {
  const { name, createdAt, updatedAt, isActive, manageActive, title } = card
  const avatarLetter = name ? name.charAt(0).toUpperCase() : title.charAt(0).toUpperCase()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuClick = (event: any) => {
    event.preventDefault()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (event: any) => {
    event.preventDefault()
    setAnchorEl(null)
  }

  const handleOnDelete = (event: any) => {
    event.preventDefault()
    handleMenuClose(event)
    onDelete()
  }

  const onManageClickHandle = (e: any) => {
    handleMenuClose(e)
    onManageClick()
  }

  return (
    <Card
      sx={{
        boxShadow: 5,
        height: '100px',
        margin: '16px',
        transition: 'box-shadow 0.3s ease',
        '&:hover': {
          boxShadow: 10,
        },
      }}
    >
      <CardHeader
        avatar={<Avatar>{avatarLetter}</Avatar>}
        sx={{ 
          padding: { xs: '8px', sm: '8px', lg: '16px' },
         }}
        action={
          <Grid
            sx={{ zIndex: '2', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px' }}
          >
            <IconButton aria-label="settings" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              {/* Add your dropdown menu items here */}
              {manageActive ? (
                <MenuItem onClick={manageActive}>
                  {!Boolean(isActive) ? 'Activate' : 'Inactivate'}
                </MenuItem>
              ) : null}
              {onManageClick ? <MenuItem onClick={onManageClickHandle}>Manage</MenuItem> : null}
              <MenuItem onClick={handleOnDelete}>Delete</MenuItem>
            </Menu>
          </Grid>
        }
        title={name ? name : title}
        subheader={`${card?.id ? 'Id' + ' ' + card.id + ' | ' : ''}Created Date: ${getStandatedDate(createdAt)} | Modified Date: ${getStandatedDate(updatedAt)}`}
      />
    </Card>
  )
}

export default AdminCard

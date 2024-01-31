import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { Box, MenuItem, MenuList, Popover, Typography } from '@mui/material'
import { removeAllCookie } from '../../Utils/cookieUtils'

export const AccountPopover = (props: any) => {
  const { anchorEl, onClose, open, ...other } = props
  const [userName, setUserName] = React.useState('')

  React.useEffect(() => {
    const storedName = localStorage.getItem('name')
    setUserName(storedName || '')
  }, [])

  const handleSignOut = async () => {
    localStorage.clear()
    removeAllCookie()
    try {
      Router.push('/login').catch(console.error)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: { width: '300px' },
      }}
      {...other}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {userName}
        </Typography>
      </Box>
      <MenuList
        disablePadding
        sx={{
          '& > *': {
            '&:first-of-type': {
              borderTopColor: 'divider',
              borderTopStyle: 'solid',
              borderTopWidth: '1px',
            },
            padding: '12px 16px',
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  )
}

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
}

import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { UserCircle as UserCircleIcon } from '../../icons/user-circle'
import { AccountPopover } from '../Common/AccountPopover'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const NavbarRoot = styled(AppBar)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme?.shadows[5],
}))

export const Navbar = (props: any) => {
  const { onSidebarOpen, ...other } = props
  const settingsRef = useRef(null)
  const [openAccountPopover, setOpenAccountPopover] = useState(false)
  const router = useRouter()

  return (
    <>
      <NavbarRoot {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          {router.pathname !== '/' && ( // Conditionally render the back button
            <IconButton
              onClick={() => router.back()} // Use router.back() to navigate to the previous page
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 1 }}>
              <Badge badgeContent={4} color="primary" variant="dot">
                <NotificationsNoneIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            onClick={() => setOpenAccountPopover(true)}
            ref={settingsRef}
            sx={{
              cursor: 'pointer',
              height: 40,
              width: 40,
              ml: 1,
            }}
            src="/static/images/avatars/avatar_1.png"
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </NavbarRoot>
      <AccountPopover
        anchorEl={settingsRef.current}
        open={openAccountPopover}
        onClose={() => setOpenAccountPopover(false)}
      />
    </>
  )
}

Navbar.propTypes = {
  onSidebarOpen: PropTypes.func,
}

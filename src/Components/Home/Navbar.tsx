import { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { AppBar, Avatar, Badge, Box, CircularProgress, Container, Divider, FormControlLabel, FormGroup, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Popover, Switch, Toolbar, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { UserCircle as UserCircleIcon } from '../../icons/user-circle'
import { AccountPopover } from '../Common/AccountPopover'
import { useRouter } from 'next/router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Utils/types/type'
import axiosInstance from '../../Utils/axiosUtil'
import { updateNotificationData } from '../../Store/reducers/notification'
import theme from '../../Theme'
import { getStandatedDate } from '../../Utils/dateTime'
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import React from 'react'
import Loading from '../Common/Loading'

const NavbarRoot = styled(AppBar)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme?.shadows[5],
}))

export const Navbar = (props: any) => {
  const { onSidebarOpen, ...other } = props
  const settingsRef = useRef(null)
  const [openAccountPopover, setOpenAccountPopover] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const { total, data } = useSelector((state: RootState) => state.notification)
  const [anchorEl, setAnchorEl] = useState(null);
  const [page, setPage] = useState(1);
  const [fetchMore, setFetchingMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [markedRead, setMarkedRead] = useState<{ [key: string]: boolean }>({});
  const [allCount, setAllCount] = useState(0);
  const observerRef = useRef<any>();

  async function markAsRead(id : any) {
    try {
      const response = await axiosInstance.post('/notification/read-mark', {
        _id: id
      })
      if(response.data.success) {
        return true
      }
      return false
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const fetchNotification = async (page = 1) => {
    setIsLoadingMore(true);
    try {
      const response = await axiosInstance.get('/notification/', {
        params: {
          page,
        }
      });
      setAllCount(response.data.total)
      dispatch(updateNotificationData({ data: [...data, ...response.data.data]}))
    } catch (err) {
      console.error(err)
    }
    setIsLoadingMore(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[entries?.length - 1];
        if (lastEntry.isIntersecting && allCount > data?.length && !isLoadingMore) {
          setFetchingMore(true);
          fetchNotification(page+1)
          setPage((prev) => prev + 1);
        }
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-notification-id') as unknown as string;
            // @ts-ignore
            const readed = data.filter((n : any) => n._id === id)[0]?.isReaded || true;
            if(readed || markedRead[id]) {
              if(!markedRead[id]) setMarkedRead((prev) => ({ ...prev, [id]: true }))
            } else {
              const response = await markAsRead(id);
              if (response && id) {
                setMarkedRead((prev) => ({ ...prev, [id]: true }));
              }
            }
          }
        });
      },
      { threshold: 0.8 } 
    )

    observerRef.current = observer;
    data.forEach((notification : any) => {
      const element = document.querySelector(`[data-notification-id="${notification._id}"]`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [data, fetchNotification, markedRead, page, total])

  const addObserver = (el : any) => {
    if (el) {
      observerRef?.current.observe(el);
    }
  };
  
  const handleClick = async (event : any) => {
    setAnchorEl(event.currentTarget);
    await fetchNotification();
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
            <IconButton onClick={handleClick}>
              <Badge badgeContent={total} color="primary">
                <NotificationsNoneIcon fontSize="medium" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Container sx={{ paddingLeft: { xs: '12px', sm: '16px' }, paddingRight: { xs: '12px', sm: '16px' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
                <Typography variant="h6">Notifications</Typography>
                <IconButton aria-label="DraftsOutlinedIcon">
                  <DraftsOutlinedIcon />
                </IconButton>
              </Box>
              <List sx={{  width: '100%', maxWidth: '380px', maxHeight: '50vh', bgcolor: 'background.paper', py: 0 }}>
                {data.map((notification : any, index: number) => (
                  <React.Fragment key={notification._id}>
                    <ListItem
                      alignItems='flex-start'
                      data-notification-id={notification._id}
                      data-notification-readed={notification.isReaded}
                      sx={{ 
                      p: 0,
                      pb: 1, 
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        transition: 'transform 0.3s',
                        backgroundColor: theme.palette.grey[100],
                      },}}
                      ref={(el) => {
                        addObserver(el)
                      }}
                      
                    >
                      <ListItemAvatar>
                         <IconButton aria-label="settings" sx={{ background: theme.palette.grey[100] }}>
                          {(markedRead[notification._id] || notification.isReaded) ? <NotificationsNoneOutlinedIcon sx={{ fontWeight: 'bold' }} /> :
                          <NotificationsActiveOutlinedIcon sx={{ fontWeight: 'bold' }} />
                        }
                        </IconButton>
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Typography>{notification.title}</Typography>}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                              sx={{ display: 'block'}} // Use display block for proper spacing
                            >
                              {notification?.description || 'No d webcuhweb cuweb cuw bexuwbxuyb escription available.'}
                            </Typography>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{ display: 'block' }} // Use display block for dates or additional info
                            >
                              {getStandatedDate(notification.createdAt)}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < data.length - 1 && <Divider sx={{m: 0}} variant="inset" component="li" />}
                  </React.Fragment>
                ))}
                {isLoadingMore ? <ListItem sx={{ display: 'flex', alignItems:'center', justifyContent:"center" }}>
                <CircularProgress size={24} />
                </ListItem> : null }
              </List>
            </Container>
          </Popover>
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
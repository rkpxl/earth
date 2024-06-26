import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Divider, Drawer, List, Typography, useMediaQuery } from '@mui/material'
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar'
import { Cog as CogIcon } from '../../icons/cog'
import { UserAdd as UserAddIcon } from '../../icons/user-add'
import { SidebarItem } from './SidebarItem'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ShieldIcon from '@mui/icons-material/Shield'
import GroupIcon from '@mui/icons-material/Group'
import ApartmentIcon from '@mui/icons-material/Apartment'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import RouteIcon from '@mui/icons-material/Route'
import AnalyticsIcon from '@mui/icons-material/Analytics'

export const Sidebar = (props: any) => {
  const { open, onClose } = props
  const router = useRouter()
  const lgUp = useMediaQuery((theme: any) => theme?.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false,
  })
  const [items, setItems] = useState([
    {
      href: '/',
      icon: <ChartBarIcon fontSize="small" />,
      title: 'Home',
    },
    {
      href: '/settings',
      icon: <CogIcon fontSize="small" />,
      title: 'Settings',
    },
    // {
    //   href: '/publication',
    //   icon: <LibraryBooksIcon fontSize="small" />,
    //   title: 'Publication',
    // },
  ])

  useEffect(
    () => {
      const dashboardItem = {
        href: '/admin-dashboard',
        icon: <InboxIcon fontSize="small" />,
        title: 'Dashboard',
        subRoute: [
          {
            href: '/admin-dashboard/dashboard',
            icon: <InboxIcon fontSize="small" />,
            title: 'Protocols',
          },
          {
            href: '/admin-dashboard/analytics',
            icon: <AnalyticsIcon fontSize="small" />,
            title: 'Analytics',
          },
          // {
          //   href: '/admin-dashboard/approvals',
          //   icon: (<DraftsIcon fontSize="small" />),
          //   title: 'Approvals'
          // },
          // {
          //   href: '/admin-dashboard/workflows',
          //   icon: (<SendIcon fontSize="small" />),
          //   title: 'Workflows'
          // },
          {
            //   href: '/admin-dashboard/reports',
            //   icon: (<StarBorder fontSize="small" />),
            //   title: 'Reports'
            // },
            // {
            href: '/admin-dashboard/departments',
            icon: <ApartmentIcon fontSize="small" />,
            title: 'Departments',
          },
          {
            href: '/admin-dashboard/groups',
            icon: <GroupIcon fontSize="small" />,
            title: 'Gropus',
          },
          {
            href: '/admin-dashboard/compliance',
            icon: <ShieldIcon fontSize="small" />,
            title: 'Compliance',
          },
          {
            href: '/admin-dashboard/approval-rule',
            icon: <RouteIcon fontSize="small" />,
            title: 'Approval Rule',
          },
          {
            href: '/admin-dashboard/register',
            icon: <UserAddIcon fontSize="small" />,
            title: 'Register',
          },
        ],
      }

      if (
        localStorage.getItem('type') === 'superAdmin' ||
        localStorage.getItem('type') === 'admin'
      ) {
        setItems((prev): any => {
          const isDashboardItemAdded = prev.some((item) => item.href === dashboardItem.href)
          if (!isDashboardItemAdded) {
            return [...prev, dashboardItem]
          }
          return prev
        })
      }

      if (!router.isReady) {
        return
      }

      if (open) {
        onClose?.()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath],
  )

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div>
          {/* <Box sx={{ px: 3, paddingTop: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box> */}
          <Box sx={{ px: 3, paddingTop: 3 }}>
            <div>
              <Typography color="inherit" variant="subtitle1">
                Knowledge Link
              </Typography>
            </div>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <List>
            {items.map((item: any, index: number) => (
              <SidebarItem
                key={index.toString()}
                icon={item.icon}
                href={item.href}
                title={item.title}
                isAdmin={item?.subRoute?.length > 0}
                subRoute={item?.subRoute || []}
              />
            ))}
          </List>
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        ></Box>
      </Box>
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 250,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 250,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}

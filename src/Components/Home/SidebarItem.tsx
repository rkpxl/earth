import React, { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes, { any } from 'prop-types'
import { ListItem } from '@mui/material'
import Collapse from '@mui/material/Collapse'
import { SidebarItemButton } from './SidebarItemButton'

export const SidebarItem = (props: any) => {
  const { href, icon, title, isAdmin, subRoute, ...others } = props
  const router = useRouter()
  const [open, setOpen] = React.useState(router.pathname.includes('admin-dashboard'))
  const active = href ? router.pathname === href : false

  const handleClick = () => {
    setOpen(true)
  }

  const handleClickClose = () => {
    setOpen(false)
  }

  return (
    <>
      {!isAdmin ? (
        <ListItem
          key={title}
          disableGutters
          sx={{
            display: 'flex',
            mb: 0.5,
            py: 0,
            px: 2,
            width: '100%',
          }}
          {...others}
        >
          <NextLink style={{ width: '100%' }} href={href} passHref>
            <SidebarItemButton
              handleClick={handleClickClose}
              title={title}
              open={false}
              isAdmin={false}
              icon={icon}
              active={active}
            />
          </NextLink>
        </ListItem>
      ) : (
        <ListItem
          key={title}
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            mb: 0.5,
            py: 0,
            px: 2,
            width: '100%',
          }}
          {...others}
        >
          <NextLink style={{ width: '100%' }} href={href} passHref>
            <SidebarItemButton
              handleClick={open ? handleClickClose : handleClick}
              key={title}
              title={title}
              open={open}
              isAdmin={true}
              icon={icon}
              active={active}
            />
          </NextLink>
          <Collapse
            in={open}
            sx={{
              width: '100%',
              mt: 0.5,
              pl: 2,
              ml: 4,
            }}
          >
            {subRoute.map((route: any, index: any) => {
              return (
                <ListItem
                  key={index.toString()}
                  disableGutters
                  sx={{
                    display: 'flex',
                    mb: 0.5,
                    py: 0,
                    px: 2,
                    width: '100%',
                  }}
                  {...others}
                >
                  <NextLink style={{ width: '100%' }} href={route.href} passHref>
                    <SidebarItemButton
                      handleClick={() => {}}
                      title={route.title}
                      open={false}
                      isAdmin={false}
                      icon={route.icon}
                      active={router.pathname.startsWith(`${route.href}`)}
                    />
                  </NextLink>
                </ListItem>
              )
            })}
          </Collapse>
        </ListItem>
      )}
    </>
  )
}

SidebarItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  isAdmin: PropTypes.bool,
  subRoute: PropTypes.array,
}

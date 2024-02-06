import React from 'react'
import Head from 'next/head'
import { Box, Button, Container, Grid } from '@mui/material'
import { LatestTasks } from '../../Components/Home/LatestTasks'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ProtocolPopUp from '../../Components/Common/ProtocolDialog'
import { useHomeContext } from '../../pages'
import { ICompliance } from '../../Utils/types/type'
import HomePageCard from '../../Components/Home/HomePageCard'

const Home = () => {
  const homeContext = useHomeContext()
  const { compliances, allProtocols, allApprovals, allActiveApprovals } = homeContext
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [popOpen, setPopOpen] = React.useState(false)
  const [complianceType, setComplianceType] = React.useState<ICompliance>()
  const open = Boolean(anchorEl)

  const homeCard = [
    {
      title: 'Your Protocol Portfolio',
      icon: '/static/images/tick.svg',
      nextPageRoute: '/all-protocols',
      count: allProtocols?.total,
    },
    {
      title: 'Pending Decision Protocols',
      icon: '/static/images/info.svg',
      nextPageRoute: '/pending-protocols',
      count: allApprovals?.total,
    },
    {
      title: 'Protocol Portfolio History',
      icon: '/static/images/paper.svg',
      nextPageRoute: '/all-protocol-status',
      count: allActiveApprovals?.total,
    },
  ]

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handlePopOpen = (): void => {
    setPopOpen(true)
    handleClose()
  }
  const handlePopClose = (): void => {
    setPopOpen(false)
  }
  const handleSubmitProtocol = (): void => {
    handlePopClose()
  }

  const onComplienceClick = (comp: ICompliance) => {
    setComplianceType(comp)
    handlePopOpen()
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Box
          sx={{
            pb: 2,
            pr: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
          }}
        >
          <Button
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="primary"
            sx={{ background: 'primary.main' }}
          >
            Create new protocol
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{ mt: 5 }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {compliances?.map((comp: ICompliance) => (
              <MenuItem key={comp._id} onClick={() => onComplienceClick(comp)}>
                {comp.title}
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Container maxWidth={false}>
          <Grid container spacing={2} mb={2}>
            {homeCard.map((card) => (
              <Grid item key={card.title} lg={4} sm={6} xl={3} xs={12}>
                <HomePageCard
                  count={card.count}
                  title={card.title}
                  icon={card.icon}
                  nextPageRoute={card.nextPageRoute}
                />
              </Grid>
            ))}
          </Grid>
          <LatestTasks />
          <ProtocolPopUp
            handleClose={handlePopClose}
            popOpen={popOpen}
            handleSubmit={handleSubmitProtocol}
            complianceType={complianceType}
          />
        </Container>
      </Box>
    </>
  )
}

export default Home

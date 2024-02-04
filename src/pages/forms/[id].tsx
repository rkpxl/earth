import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Utils/axiosUtil'
import {
  AppDispatch,
  ICompliance,
  IFlow,
  IProtocol,
  ISnapshot,
  RootState,
} from '../../Utils/types/type'
import { Box, Menu, MenuItem, Tab, Tabs } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import CustomTabPanel from '../../Components/Common/CustomTabPanel'
import Protocol from '../../Scenes/Protocol'
import FormAttachment from '../../Components/Common/Form/FormAttachments'
import FormSubmit from '../../Components/Common/Form/FormSubmit'
import FormPersonnel from '../../Components/Common/Form/FormPersonnel'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Components/Common/Loading'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { generatePDF } from '../../Utils/fileGenerator'
import { startLoading, endLoading } from '../../Store/reducers/loading'
import LifeCycle from '../../Scenes/Protocol/Manage'
import { showMessage } from '../../Store/reducers/snackbar'
import { updateAnswer } from '../../Store/reducers/form'
import TitleDescriptionDialog from '../../Components/Common/TitleDescriptionDialog'

interface IProps {
  compliance: ICompliance
  protocol: IProtocol
  snapshots: Array<ISnapshot>
  flow: Array<IFlow>
}

function a11yProps(index: number) {
  return {
    id: `dyf-tab-${index}`,
    'aria-controls': `dyf-tabpanel-${index}`,
  }
}

export default function DynamicForm(props: IProps) {
  const router = useRouter()
  const { compliance, protocol, flow, snapshots } = props
  const { id: protocol_id } = router.query as { id: string }
  const formData = useSelector((state: RootState) => state.form)
  const [value, setValue] = useState<number>(0)
  const [tabValue, setTabValue] = useState<number>(0)
  const [snapshot, setSnapshot] = useState({
    title: '',
    description: '',
  })
  const [isSnapshotDialogOpen, setIsSnapshotDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dispatch: AppDispatch = useDispatch()

  const {
    data: protocolData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [`basicprotocol-${protocol._id}`],
    queryFn: async () => {
      try {
        const protocol: any = await axiosInstance.get(`/protocol/${protocol_id}`)
        if (protocol.status < 300) {
          return protocol.data
        }
      } catch (err) {
        console.error('Error', err)
      }
    },
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleDownloadOption = async () => {
    dispatch(startLoading())
    await generatePDF(formData, protocolData)
    dispatch(endLoading())
    handleMenuClose()
  }

  const handleSnapshot = async () => {
    try {
      dispatch(startLoading())
      const response = await axiosInstance.post('/snapshot', {
        protocol_id,
        title: snapshot.title,
        description: snapshot.description,
      })
      if (response.status < 300) {
        dispatch(showMessage({ message: 'Snapshot has been taken', severity: 'success' }))
      } else {
        dispatch(showMessage({ message: 'Please try again', severity: 'warning' }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(endLoading())
      setIsSnapshotDialogOpen(false)
      handleMenuClose()
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  useEffect(() => {
    dispatch(
      updateAnswer({ tabIndex: 98, id: 'mandatoryApprovers', answer: protocol.mandatoryApprovers }),
    )
  }, [protocol])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <IconButton
          onClick={handleMenuOpen}
          size="large"
          color="inherit"
          aria-controls="download-menu"
          aria-haspopup="true"
          edge="end"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>

        <Menu
          id="download-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDownloadOption}>Download PDF</MenuItem>
          <MenuItem onClick={() => setIsSnapshotDialogOpen(true)}>Take Snapshot</MenuItem>
        </Menu>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="basic tabs example"
        >
          <Tab label="Manage" {...a11yProps(0)} />
          {compliance?.tabNames
            ?.sort((a: any, b: any) => parseInt(a.position) - parseInt(b.position))
            .map((step) => {
              return (
                <Tab
                  key={step.position}
                  label={step.name}
                  {...a11yProps(step.position)}
                  style={
                    formData?.tabs[step.position]?.tabInfo?.isError
                      ? { color: 'red' }
                      : { color: '#65748B ' }
                  }
                />
              )
            })}
          <Tab
            label="Personnel"
            {...a11yProps(compliance?.tabNames?.length + 1)}
            style={
              formData?.tabs['98']?.tabInfo?.isError ? { color: 'red' } : { color: '#65748B ' }
            }
          />
          <Tab label="Attachment" {...a11yProps(compliance?.tabNames?.length + 2)} />
          <Tab label="Submit" {...a11yProps(compliance?.tabNames?.length + 3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <LifeCycle flow={flow} snapshots={snapshots} />
      </CustomTabPanel>
      {compliance?.tabNames
        ?.sort((a: any, b: any) => parseInt(a.position) - parseInt(b.position))
        .map((step, index: number) => {
          return (
            <CustomTabPanel key={step.name} value={value} index={index + 1}>
              <Protocol
                key={step.name}
                compliance={compliance}
                tabNumber={index + 1}
                step={step}
                protocol={protocolData || protocol}
              />
            </CustomTabPanel>
          )
        })}
      <CustomTabPanel value={value} index={compliance?.tabNames?.length + 1}>
        <FormPersonnel compliance={compliance} protocol={protocol} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={compliance?.tabNames?.length + 2}>
        <FormAttachment compliance={compliance} protocol={protocol} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={compliance?.tabNames?.length + 3}>
        <FormSubmit compliance={compliance} protocol={protocol} />
      </CustomTabPanel>
      <TitleDescriptionDialog
        open={isSnapshotDialogOpen}
        data={snapshot}
        setData={setSnapshot}
        handleClose={() => setIsSnapshotDialogOpen(false)}
        handleSubmit={handleSnapshot}
      />
    </>
  )
}

export const getServerSideProps = async function getServerSideProps(context: any) {
  const { id } = context.query
  axiosInstance.context = context
  try {
    const response = await axiosInstance.get('/auth/validate-token')
    if (response.status === 200) {
      const protocol: any = await axiosInstance.get(`/protocol/${id}`)
      if (!protocol) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
      const [compliance, flow, snapshots] = await Promise.all([
        axiosInstance.get(`/compliance/${protocol.data.complianceId}`),
        axiosInstance.get(`/flow/protocol/${id}`),
        axiosInstance.get(`/snapshot/protocol?id=${id}`),
      ])
      return {
        props: {
          isAuthenticated: true,
          compliance: compliance.data,
          protocol: protocol.data,
          flow: flow?.data || [],
          snapshots: snapshots?.data || [],
        },
      }
    }
  } catch (err) {
    console.error('error', err)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}

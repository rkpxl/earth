import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { getStandatedDate, getStandatedDateWithTime } from '../../Utils/dateTime'
import axiosInstance from '../../Utils/axiosUtil'
import { IFlow, ISnapshot } from '../../Utils/types/type'
import { useDispatch } from 'react-redux'
import { openConfirmation } from '../../Store/reducers/confirm'
import ConfirmationPopup from '../../Components/Common/ConfirmationDialog'
import { useRouter } from 'next/router'
import Loading from '../../Components/Common/Loading'
import { showMessage } from '../../Store/reducers/snackbar'
import { endLoading, startLoading } from '../../Store/reducers/loading'
import MoreInfo from '../../Components/Common/Form/MoreInfo'

interface DetailsData {
  [key: string]: any
}

interface IProps {
  flow: Array<IFlow>
  snapshots: Array<ISnapshot>
  moreInfo: Array<any>
}

const ApprovalAction = [
  { key: 'AMENDMENT', value: 'Amendment' },
  { key: 'REVISE', value: 'Revise' },
  { key: 'EXPIRE', value: 'Expire' },
  { key: 'CLOSURE', value: 'Closure' },
  { key: 'CONREV', value: 'Continuous Review' },
]

export default function LifeCycle({ flow, snapshots, moreInfo }: IProps) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [detailsData, setDetailsData] = useState<DetailsData>({})
  const [accordionLoading, setAccordionLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (action?: string) => {
    if (action) {
      dispatch(
        openConfirmation({
          args: action,
        }),
      )
    }
    setAnchorEl(null)
  }

  const handleConfirmation = async (action: string) => {
    try {
      dispatch(startLoading())
      const response = await axiosInstance.post('/flow/action', {
        protocol_id: id,
        actionType: action,
      })
      if (response.status < 300) {
        dispatch(showMessage({ message: 'Your action performed', severity: 'success' }))
      }
    } catch (err) {
      dispatch(
        showMessage({
          message: 'Please complete your current approval process',
          severity: 'warning',
        }),
      )
      console.error(err)
    } finally {
      dispatch(endLoading())
    }
  }

  const handleAccordionChange = async (panelIndex: number, item: any) => {
    if (!detailsData[panelIndex]) {
      try {
        const response = await axiosInstance.get(`/approval/flow/${item._id}`)
        setDetailsData({ ...detailsData, [panelIndex]: response.data })
      } catch (error) {
        console.error('Error fetching data: ', error)
      }
    }
  }

  return (
    <div style={{}}>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Grid item>
          <Typography variant="h5">Life Cycle</Typography>
        </Grid>
        <Grid item>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="contained"
          >
            Action
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
            sx={{
              mt: 1,
            }}
          >
            {ApprovalAction.map((a) => (
              <MenuItem key={a.key} onClick={() => handleClose(a.key)}>
                {a.value}
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      </Grid>
      <AccordionSummary
        aria-controls={`panel-header-a-content`}
        id={`panel-headera-header`}
        sx={{
          background: 'white',
          marginBottom: '12px',
          borderRadius: '12px',
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" fontSize="18px">
              Action
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" fontSize="18px">
              Status
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" fontSize="18px">
              Active
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body1" fontSize="18px">
              Created At
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <Box
        sx={{
          maxHeight: '50vh',
          overflowY: 'auto',
          backgroundColor: 'transparent',
        }}
      >
        {flow.map((item: any, index: any) => (
          <Accordion
            key={item._id + index}
            style={{ margin: '10px' }}
            onChange={() => handleAccordionChange(index, item)}
            elevation={12}
            sx={{
              borderRadius: '12px',
              '&:before': {
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: '10px 0',
              },
              transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease', // Smooth transition for shadow and transform
              '&:hover': {
                transform: 'translateY(-3px)', // Slight lift effect on hover
                boxShadow: '0 6px 16px rgba(0,0,0,0.2)', // Increased shadow on hover for more depth
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${index}-a-content`}
              id={`panel-${index}-a-header`}
            >
              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2" fontSize="16px">
                    {item?.actionType || ''}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2">{item?.status || ''}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2">{item?.isActive ? 'Yes' : 'No'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="body2">
                    {item?.createdAt ? getStandatedDateWithTime(item?.createdAt) : ''}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body1" fontWeight={500}>
                    Under Review
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body1" fontWeight={500}>
                    PI Name
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body1" fontWeight={500}>
                    Approver Name
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body1" fontWeight={500}>
                    Status
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body1" fontWeight={500}>
                    Created At
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Typography variant="body1" fontWeight={500}>
                    Updated At
                  </Typography>
                </Grid>
              </Grid>
              {detailsData[index] ? (
                detailsData[index].map((e: IFlow) => {
                  return (
                    <Grid container sx={{ mt: 1 }} key={e._id}>
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2">{e?.groupName || ''}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2">{e?.piName || ''}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2">{e?.approver_name || ''}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2">
                          {e?.status.toString() == 'Review' ? 'Under Review' : e?.status}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2">
                          {e?.createdAt || '' ? getStandatedDate(e?.createdAt) : ''}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={2}>
                        <Typography variant="body2">
                          {e?.updatedAt || '' ? getStandatedDate(e?.updatedAt) : ''}
                        </Typography>
                      </Grid>
                    </Grid>
                  )
                })
              ) : (
                <Loading />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Divider sx={{ mt: 4 }} />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Snapshots
          </Typography>
          {snapshots.length > 0 ? (
            <TableContainer component={Paper} elevation={3}>
              <Table aria-label="snapshots table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {snapshots.map((snapshot) => (
                    <TableRow
                      key={snapshot._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" noWrap>
                          {snapshot.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {snapshot.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                          {getStandatedDate(snapshot.createdAt)}{' '}
                          {/* Assuming getStandatedDate is a function you've defined */}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          href={`/snapshot/${snapshot._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ display: 'block' }}
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center' }}>
              No Snapshot Found
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Notifications
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'center' }}>
            No Notification Found
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 4 }} />
      <MoreInfo moreInfo={moreInfo} />
      <ConfirmationPopup handleConfirm={handleConfirmation} />
    </div>
  )
}

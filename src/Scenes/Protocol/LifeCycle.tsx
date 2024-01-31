import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Box, Grid } from '@mui/material'
import { getStandatedDateWithTime } from '../../Utils/dateTime'
import axiosInstance from '../../Utils/axiosUtil'
import { ApprovalAction, IFlow } from '../../Utils/types/type'

interface DetailsData {
  [key: string]: any
}

interface IProps {
  flow: Array<IFlow>
}

export default function LifeCycle({ flow }: IProps) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [detailsData, setDetailsData] = useState<DetailsData>({})
  const [accordionLoading, setAccordionLoading] = useState(false)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
    <div style={{ margin: '20px' }}>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="contained"
            sx={{
              mb: 2,
            }}
          >
            Action
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              mt: 1,
            }}
          >
            <MenuItem onClick={handleClose}>Amendment</MenuItem>
            <MenuItem onClick={handleClose}>Admin Amendment</MenuItem>
            <MenuItem onClick={handleClose}>Continue Review</MenuItem>
            <MenuItem onClick={handleClose}>Terminate</MenuItem>
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
            <Typography variant="h6" fontSize="18px">
              Action
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <Typography variant="h6" fontSize="18px">
              Status
            </Typography>
          </Grid>
          <Grid item xs={12} sm={7} md={3}>
            <Typography variant="h6" fontSize="18px" sx={{ pl: 0 }}>
              Active
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontSize="18px">
              Created At
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      {flow.map((item: any, index: any) => (
        <Accordion
          key={item._id + index}
          style={{ marginBottom: '10px' }}
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
                  {/* @ts-ignore */}
                  {ApprovalAction?.[item?.actionType] || ''}
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
                  Description
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
            {detailsData[index] &&
              detailsData[index].map((e: IFlow) => {
                return (
                  <Grid container sx={{ mt: 1 }} key={e._id}>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2">{e?.description || ''}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2">{e?.piName || ''}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2">{e?.approver_name || ''}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2">{e?.status || ''}</Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2">
                        {e?.createdAt || '' ? getStandatedDateWithTime(e?.createdAt) : ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Typography variant="body2">
                        {e?.updatedAt || '' ? getStandatedDateWithTime(e?.updatedAt) : ''}
                      </Typography>
                    </Grid>
                  </Grid>
                )
              })}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}

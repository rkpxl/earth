import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React, { useState } from 'react'
import { Grid, Menu, MenuItem } from '@mui/material'
import axiosInstance from '../../../Utils/axiosUtil'
import { useDispatch } from 'react-redux'
import { endLoading, startLoading } from '../../../Store/reducers/loading'
import { ICompliance } from '../../../Utils/types/type'
import TitleDescriptionDialog from '../../Common/TitleDescriptionDialog'
import { useQuery } from '@tanstack/react-query'
import { fetchCompliances } from '../../../Store/reducers/compliance'

const Header = ({ title, buttonText, onClickHandle, isCompliance = false }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [data, setData] = React.useState([])
  const [isopen, setIsOpen] = useState(false)
  const [selectedCompliance, setSelectedCompliance] = useState<ICompliance>()
  const [dialogData, setDialogData] = useState({
    title: '',
    description: '',
  })
  const dispatch = useDispatch()
  const open = Boolean(anchorEl)

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    try {
      dispatch(startLoading())
      const response = await axiosInstance.get('/compliance/global-import')
      setData(response.data)
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(endLoading())
    }
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  const handleDialogSubmit = async () => {
    if (!selectedCompliance) {
      return
    }

    try {
      dispatch(startLoading())
      setIsOpen(false)
      const response = await axiosInstance.post('/compliance/copy', {
        sourceComplianceId: selectedCompliance._id + '',
        title: dialogData?.title || '',
        describe: dialogData?.description || '',
      })
      // @ts-ignore
      dispatch(fetchCompliances())
    } catch (err) {
      console.error(err)
    } finally {
      dispatch(endLoading())
    }
  }

  const handleImportComplianceCLick = async (c: ICompliance) => {
    handleClose()
    setSelectedCompliance(c)
    setDialogData({
      title: c.title,
      description: c.description,
    })
    setIsOpen(true)
  }

  return (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: 'black', fontSize: '22px' }}
        >
          {title}
        </Typography>

        <Grid container spacing={2} alignItems="flex-end" justifyContent="flex-end">
          <Grid item>
            {isCompliance && (
              <>
                <Button
                  id="demo-positioned-button"
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  color="primary"
                  variant="contained"
                >
                  Import
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  sx={{ mt: 1 }}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  {data?.map((comp: any) => (
                    <MenuItem key={comp._id} onClick={() => handleImportComplianceCLick(comp)}>
                      {comp.title}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={onClickHandle}>
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
      <TitleDescriptionDialog
        open={isopen}
        data={dialogData}
        setData={setDialogData}
        handleClose={() => setIsOpen(false)}
        handleSubmit={handleDialogSubmit}
      />
    </div>
  )
}

export default Header

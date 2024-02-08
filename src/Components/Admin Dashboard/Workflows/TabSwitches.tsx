import React, { useState } from 'react'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const SwitchRow: React.FC = () => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const [isSwitchOn, setIsSwitchOn] = useState(false)

  const handleSwitchClick = () => {
    setIsSwitchOn(!isSwitchOn)
    // Add your custom logic here when the switch is clicked
  }

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '40%',
            maxWidth: '256px',
          }}
        >
          <Typography variant="subtitle1">Document Tab</Typography>
          <Switch color="primary" checked={isSwitchOn} onChange={handleSwitchClick} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '40%',
            maxWidth: '256px',
          }}
        >
          <Typography variant="subtitle1">Submit Tab</Typography>
          <Switch color="primary" checked={isSwitchOn} onChange={handleSwitchClick} />
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '16px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '40%',
            maxWidth: '256px',
          }}
        >
          <Typography variant="subtitle1">Document Tab</Typography>
          <Switch color="primary" checked={isSwitchOn} onChange={handleSwitchClick} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '40%',
            maxWidth: '256px',
          }}
        >
          <Typography variant="subtitle1">Submit Tab</Typography>
          <Switch color="primary" checked={isSwitchOn} onChange={handleSwitchClick} />
        </div>
      </div>
    </div>
  )
}

export default SwitchRow

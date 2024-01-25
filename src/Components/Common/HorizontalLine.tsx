// components/HorizontalLine.tsx
import React from 'react'
import Box from '@mui/material/Box'

interface HorizontalLineProps {
  thickness?: 'thin' | 'thick'
  color?: string
  style?: React.CSSProperties
  isHorizontal?: boolean
}

const HorizontalLine: React.FC<HorizontalLineProps> = ({
  thickness = 'thin',
  color = 'primary',
  style,
  isHorizontal = false,
}) => {
  const lineStyle = isHorizontal
    ? {
        width: '100%',
        height: '1px',
        background: 'black',
      }
    : {
        width: '1px',
        background: 'black',
        height: '100%',
      }

  return <Box sx={{ ...lineStyle, ...style }} />
}

export default HorizontalLine

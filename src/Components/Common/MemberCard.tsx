import { Avatar, CardHeader } from '@mui/material'
import React from 'react'

interface IProps {
  title: string
  subtitle: string
  imgUrl?: string
}

export default function MemberCard({ title, subtitle }: IProps) {
  return (
    <CardHeader
      avatar={
        <>
          <Avatar>{title[0] || ''}</Avatar>
        </>
      }
      sx={{ m: 0, p: 1.5 }}
      title={title}
      subheader={subtitle}
    />
  )
}

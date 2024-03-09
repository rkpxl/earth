import React, { useState } from 'react'
import Header from '../../../Components/Admin Dashboard/Common/Header'
import ScheduleMeetingDialog from './ScheduleDialog'
import AdminCard from '../../../Components/Admin Dashboard/Common/AdminCard'
import { useRouter } from 'next/router'

export default function UpComing({ schedulers } : any) {

  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const redirectToGroup = (id: string) => {
    router.push(`/admin-dashboard/scheduling/${id}`)
  }

  return (
    <>
      <Header
        onClickHandle={handleClickOpen}
        title=""
        buttonText="Schedual"
      />
      <ScheduleMeetingDialog open={open} onClose={() => setOpen(false)} />
      {schedulers?.data?.map((comp: any) => (
        <div key={comp.id}>
          <AdminCard
            card={comp}
            onDelete={() => {}}
            onManageClick={() => redirectToGroup(comp._id)}
            isSchedulers={true}
          />
        </div>
      ))}
      </>
  )
}

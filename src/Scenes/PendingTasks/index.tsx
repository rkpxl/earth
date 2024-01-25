import React from 'react'
import TasksTable from '../../Components/Common/TasksTable'
import { GetStaticPaths, GetStaticProps } from 'next'

const PendingTasks = (): JSX.Element => {
  return (
    <>
      <TasksTable title="Pending Tasks" type="pending" />
    </>
  )
}

export default PendingTasks

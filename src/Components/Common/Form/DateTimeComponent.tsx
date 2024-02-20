import React, { useState } from 'react'
import { Grid, TextField, Typography } from '@mui/material'
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; // Ensure correct import
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { useProtocolQuestionContext } from './FormQuestionRenderer'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
interface DateTimeProps {
  questionNumber?: number
}

const DateTimeComponent: React.FC<DateTimeProps> = ({ questionNumber }) => {
  const { title, handleAnswerChange, handleQuestionSubmit, compliance, answers, question } =
    useProtocolQuestionContext()

  const handleDateChange = (newValue: any) => {
    handleAnswerChange(newValue ? newValue.toISOString() : '')
    if (newValue) {
      handleQuestionSubmit()
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontWeight: '420', fontSize: '16px', marginBottom: '6px' }}
            variant="h6"
          >
            {questionNumber ? `Q${questionNumber} ` : ''}
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            renderInput={(props) => <TextField {...props} fullWidth />}
            label="Select Date"
            value={
              answers[question?._id]?.answer ? new Date(answers[question?._id]?.answer) : new Date()
            }
            onChange={handleDateChange}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default DateTimeComponent

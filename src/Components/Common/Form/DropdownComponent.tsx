import React from 'react'
import { Grid, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import CommentJustification from './CommentJustification'
import { useProtocolQuestionContext } from './FormQuestionRenderer'

interface DropdownComponentProps {
  questionNumber?: number
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  questionNumber,
}: DropdownComponentProps) => {
  const { title, handleAnswerChange, handleQuestionSubmit, compliance, answers, question } =
    useProtocolQuestionContext()

  const handleChange = (event: any) => {
    handleAnswerChange(event.target.value as string)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontWeight: '420', fontSize: '16px', marginBottom: '6px' }} variant="h6">
          {questionNumber ? 'Q' + questionNumber + ' ' : ''} {title}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <FormControl fullWidth variant="outlined" onBlur={(e) => handleQuestionSubmit(e)}>
          <InputLabel>Select an option</InputLabel>
          <Select
            value={answers[question?._id]?.answer}
            onChange={handleChange}
            label="Select an option"
          >
            {question?.answerOptions?.map((option: any, index: any) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <CommentJustification
        comment={''}
        justification={''}
        question_id={question?._id}
        complianceId={compliance.id}
      />
    </Grid>
  )
}

export default DropdownComponent

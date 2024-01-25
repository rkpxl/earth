import React from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import CommentJustification from './CommentJustification'
import { useProtocolQuestionContext } from './FormQuestionRenderer'

interface TextFieldComponentProps {
  questionNumber?: number
  bigBox?: boolean
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({ questionNumber, bigBox }) => {
  const { title, handleAnswerChange, handleQuestionSubmit, compliance, answers, question } =
    useProtocolQuestionContext()
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontWeight: '420', fontSize: '16px', marginBottom: '6px' }} variant="h6">
          {questionNumber ? 'Q' + questionNumber + ' ' : ''} {title}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <TextField
          label="Answer"
          variant="outlined"
          fullWidth
          multiline
          inputProps={{ style: bigBox ? { minHeight: '100px' } : {} }}
          onChange={(e) => handleAnswerChange(e.target.value)}
          onBlur={handleQuestionSubmit}
          value={answers[question?._id]?.answer || ''}
          error={answers[question?._id]?.isError}
          helperText={answers[question?._id]?.isError ? 'This field is required' : ''}
        />
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

export default TextFieldComponent

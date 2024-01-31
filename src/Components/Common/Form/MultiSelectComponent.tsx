import React from 'react'
import { Grid, FormControl, FormGroup, FormControlLabel, Checkbox, Typography } from '@mui/material'
import CommentJustification from './CommentJustification'
import { useProtocolQuestionContext } from './FormQuestionRenderer'

interface MultiSelectComponentProps {
  questionNumber?: number
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({ questionNumber }) => {
  const { title, handleAnswerChange, handleQuestionSubmit, compliance, answers, question } =
    useProtocolQuestionContext()

  const handleOptionChange = (option: string) => {
    const updatedOptions = answers[question?._id]?.answer?.includes(option)
      ? answers[question?._id]?.answer?.filter(
          (selectedOption: string) => selectedOption !== option,
        )
      : [...(answers[question?._id]?.answer ? answers[question?._id]?.answer : []), option]
    handleAnswerChange(updatedOptions)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontWeight: '420', fontSize: '16px', marginBottom: '6px' }} variant="h6">
          {questionNumber ? 'Q' + questionNumber + ' ' : ''} {title}
        </Typography>
      </Grid>
      <Grid item xs={11}>
        <FormControl component="fieldset" onBlur={(e) => handleQuestionSubmit(e)}>
          <FormGroup>
            {question?.answerOptions?.map((option: any, index: any) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={answers[question?._id]?.answer?.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
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

export default MultiSelectComponent

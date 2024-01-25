import React from 'react';
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Typography } from '@mui/material';
import CommentJustification from './CommentJustification';
import { useProtocolQuestionContext } from './FormQuestionRenderer';

interface SingleSelectComponentProps {
  questionNumber?: number;
}

const SingleSelectComponent: React.FC<SingleSelectComponentProps> = ({ questionNumber }) => {
  const { title, handleAnswerChange, handleQuestionSubmit, compliance, answers, question } = useProtocolQuestionContext()

  return (
    <Grid container spacing={1} >
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontWeight: "420", fontSize: "16px", marginBottom: "6px" }} variant="h6">{questionNumber ? 'Q' + questionNumber + ' ': ''} {title}</Typography>
      </Grid>
      <Grid item xs={11}>
        <FormControl component="fieldset" onBlur={(e) => handleQuestionSubmit(e)}>
          <RadioGroup 
            style={{ display: 'flex', flexDirection: 'row' }}
            value={answers[question?._id]?.answer || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <CommentJustification comment={''} justification={''} question_id={question._id} complianceId={compliance._id} />
    </Grid>
  );
};

export default SingleSelectComponent;

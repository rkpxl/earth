import React from 'react';
import { Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Typography } from '@mui/material';
import CommentJustification from './CommentJustification';

interface SingleSelectComponentProps {
  title: string;
  comment?: string;
  justification?: string;
  questionNumber?: number;
  handleAnswerChange: Function;
  answer: string;
}

const SingleSelectComponent: React.FC<SingleSelectComponentProps> = ({ title, answer, handleAnswerChange, comment, justification, questionNumber }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontWeight: "420", fontSize: "16px", marginBottom: "6px" }} variant="h6">{questionNumber ? 'Q' + questionNumber + ' ': ''} {title}</Typography>
      </Grid>
      <Grid item xs={11}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Answer</FormLabel>
          <RadioGroup 
            style={{ display: 'flex', flexDirection: 'row' }}
            value={answer}
            onChange={(e) => handleAnswerChange(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <CommentJustification comment={comment} justification={justification}/>
    </Grid>
  );
};

export default SingleSelectComponent;

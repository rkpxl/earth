import React from 'react';
import { Grid, TextField, Typography } from '@mui/material';
import CommentJustification from './CommentJustification';

interface TextFieldComponentProps {
  title: string;
  questionNumber?: number;
  comment?: string;
  justification?: string;
  bigBox?: boolean;
  handleAnswerChange: any;
  answer: string;
}

const TextFieldComponent: React.FC<TextFieldComponentProps> = ({ title, comment, questionNumber, answer, justification, bigBox, handleAnswerChange }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontWeight: "420", fontSize: "16px", marginBottom: "6px" }} variant="h6">{questionNumber ? 'Q' + questionNumber + ' ': ''} {title}</Typography>
      </Grid>
      <Grid item xs={11}>
        <TextField 
          label="Answer" 
          variant="outlined" 
          fullWidth multiline
          inputProps={{ style: bigBox ? { minHeight: '100px' } : {} }} 
          onChange={(e) => handleAnswerChange(e.target.value)}
          value={answer}
        />
      </Grid>
      <CommentJustification comment={comment} justification={justification}/>
    </Grid>
  );
};

export default TextFieldComponent;

import React from 'react';
import { Grid, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import CommentJustification from './CommentJustification';

interface DropdownComponentProps {
  questionTitle: string;
  options: string[];
  title: string,
  comment?: string;
  justification?: string;
  values?: any[]
  questionNumber?: number;
  handleAnswerChange: Function;
  answer: string;
}

const DropdownComponent: React.FC<DropdownComponentProps> = (props) => {
  const { title, answer, questionNumber, comment, justification, values, handleAnswerChange } = props

  const handleChange = (event: any) => {
    handleAnswerChange(event.target.value as string);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontWeight: "420", fontSize: "16px", marginBottom: "6px" }} variant="h6">{questionNumber ? 'Q' + questionNumber + ' ': ''} {title}</Typography>
      </Grid>
      <Grid item xs={11}>
        <FormControl fullWidth variant="outlined">
          <InputLabel>Select an option</InputLabel>
          <Select
            value={answer}
            onChange={handleChange}
            label="Select an option"
          >
            {values?.map((option, index) => (
              <MenuItem key={index} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <CommentJustification comment={comment} justification={justification}/>
    </Grid>
  );
};

export default DropdownComponent;

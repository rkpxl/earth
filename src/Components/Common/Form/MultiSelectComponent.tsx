import React from 'react';
import { Grid, FormControl, FormGroup, FormControlLabel, Checkbox, TextField, Typography } from '@mui/material';
import CommentJustification from './CommentJustification';

interface MultiSelectComponentProps {
  title: string;
  answerOptions: string[];
  comment?: string;
  justification?: string;
  questionNumber?: number;
  handleAnswerChange: Function;
  answer: any;
}

const MultiSelectComponent: React.FC<MultiSelectComponentProps> = ({ answer, title, questionNumber, answerOptions, comment, justification, handleAnswerChange }) => {
  const handleOptionChange = (option: string) => {
    const updatedOptions = answer.includes(option)
      ? answer.filter((selectedOption: string) => selectedOption !== option)
      : [...answer, option];
      handleAnswerChange(updatedOptions);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12}>
        <Typography sx={{ fontWeight: "420", fontSize: "16px", marginBottom: "6px" }} variant="h6">{questionNumber ? 'Q' + questionNumber + ' ': ''} {title}</Typography>
      </Grid>
      <Grid item xs={11}>
        <FormControl component="fieldset">
          <FormGroup>
            {answerOptions?.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={answer.includes(option)}
                    onChange={() => handleOptionChange(option)}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
      <CommentJustification comment={comment} justification={justification}/>
    </Grid>
  );
};

export default MultiSelectComponent;

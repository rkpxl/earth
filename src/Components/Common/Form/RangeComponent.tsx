import React from 'react';
import { Grid, Slider, TextField } from '@mui/material';
import CommentJustification from './CommentJustification';

interface RangeComponentProps {
  questionTitle: string;
  comment?: string;
  justification?: string;
  questionNumber?: number;
  handleAnswerChange: Function;
}

const RangeComponent: React.FC<RangeComponentProps> = ({ questionTitle, comment, justification }) => {
  const [value, setValue] = React.useState<number>(5);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={11}>
        <h3>{questionTitle}</h3>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
        />
      </Grid>
      <CommentJustification comment={comment} justification={justification}/>
    </Grid>
  );
};

export default RangeComponent;

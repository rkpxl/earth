import React from 'react';
import { Grid, Slider, TextField } from '@mui/material';
import CommentJustification from './CommentJustification';
import { useProtocolQuestionContext } from './FormQuestionRenderer';

interface RangeComponentProps {
  questionNumber?: number;
}

const RangeComponent: React.FC<RangeComponentProps> = ({ questionNumber }) => {
  const [value, setValue] = React.useState<number>(5);
  const { title, handleAnswerChange, handleQuestionSubmit, compliance, answers, question } = useProtocolQuestionContext()

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={11}>
        <h3>{title}</h3>
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
      <CommentJustification comment={''} justification={''} question_id={''} complianceId={1} />
    </Grid>
  );
};

export default RangeComponent;

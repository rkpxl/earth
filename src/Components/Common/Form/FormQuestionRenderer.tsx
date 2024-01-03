import React, { useMemo } from 'react';
import TextFieldComponent from './TextFieldComponent';
import SingleSelectComponent from './SingleSelectComponent';
import MultiSelectComponent from './MultiSelectComponent';
import DropdownComponent from './DropdownComponent';
import RangeComponent from './RangeComponent';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Utils/types/type';
import { updateAnswer } from '../../../Store/reducers/form';

const questionContainerStyle = {
  padding: '4px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  marginBottom: '16px',
};

interface FormQuestionRendererProps {
  question: any;
  questionNumber: number;
  values?: any[];
  tabId: string
}

const FormQuestionRenderer: React.FC<FormQuestionRendererProps> = ({ tabId, question, questionNumber }) => {
  const { questionType, dependent, isFullWidth,  ...rest } = question;
  const dispatch = useDispatch()
  const stateAnswer = useSelector((state: RootState) => state.form.answers[tabId] ?? {});

  const answers = useMemo(() => stateAnswer, [stateAnswer]);
  const handleAnswerChange = (newAnswer: string) => {
    dispatch(updateAnswer({ tabIndex: tabId, id: question?.id, answer: newAnswer }));
  };

  if(dependent?.key && dependent?.value) {
    if(!answers[dependent?.key] || answers[dependent?.key].toLocaleLowerCase() !==  dependent.value.toLocaleLowerCase()) {
      return;
    }
  }

  return (
    <Grid item xs={12} sm={isFullWidth ? 12 : 6}>
      {questionType === 'text' && 
        <TextFieldComponent 
          {...rest} 
          questionNumber={questionNumber} 
          handleAnswerChange={handleAnswerChange} 
          answer={answers[question?.id] || ''}
        />}
      {questionType === 'yesno' && 
        <SingleSelectComponent 
          {...rest} 
          questionNumber={questionNumber} 
          handleAnswerChange={handleAnswerChange} 
          answer={answers[question?.id] || ''}
        />}
      {questionType === 'multiselect' && 
        <MultiSelectComponent 
          {...rest} 
          questionNumber={questionNumber} 
          handleAnswerChange={handleAnswerChange} 
          answer={answers[question?.id] || ''}
        />}
      {questionType === 'dropdown' && 
        <DropdownComponent 
          {...rest} 
          questionNumber={questionNumber} 
          handleAnswerChange={handleAnswerChange} 
          answer={answers[question?.id] || ''}
        />}
      {questionType === 'range' && 
        <RangeComponent 
          {...rest} 
          questionNumber={questionNumber} 
          handleAnswerChange={handleAnswerChange} 
          answer={answers[question?.id] || ''}
        />}
    </Grid>
  );
};

export default FormQuestionRenderer;



function dispatch(arg0: { payload: { tabIndex: string; id: number; answer: string; }; type: "form/updateAnswer"; }) {
  throw new Error('Function not implemented.');
}


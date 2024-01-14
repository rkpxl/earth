import React, { ReactEventHandler, useContext, useMemo } from 'react';
import TextFieldComponent from './TextFieldComponent';
import SingleSelectComponent from './SingleSelectComponent';
import MultiSelectComponent from './MultiSelectComponent';
import DropdownComponent from './DropdownComponent';
import RangeComponent from './RangeComponent';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../Utils/types/type';
import { updateAnswer } from '../../../Store/reducers/form';
import axiosInstance from '../../../Utils/axiosUtil';
import { showMessage } from '../../../Store/reducers/snackbar';
import Router from 'next/router';
import { useProtocolContext } from '../../../Scenes/Protocol/Protocol';

interface FormQuestionRendererProps {
  question: any;
  questionNumber: number;
  tabId: number
}

const ProtocolQuestionContext = React.createContext<any>(null);

const FormQuestionRenderer: React.FC<FormQuestionRendererProps> = ({ tabId, question }) => {
  const { questionType, dependent, isFullWidth,  ...rest } = question;
  const { id } = Router.query
  const { compliance, questionNumber  } = useProtocolContext()
  const dispatch = useDispatch()
  const answers = useSelector((state: RootState) => state.form.answers[tabId] ?? {});


  const handleAnswerChange = (newAnswer: string) => {
    dispatch(updateAnswer({ tabIndex: tabId, id: question?._id, answer: newAnswer }));
  };

  if(dependent?.key && dependent?.value) {
    if(!answers[dependent?.key] || answers[dependent?.key].toLocaleLowerCase() !==  dependent.value.toLocaleLowerCase()) {
      return;
    }
  }

  const handleQuestionSubmit = async (e : React.FocusEvent<HTMLElement>) => {
    if(e) {
      e.preventDefault()
    }
    
    try {
      const response : any = await axiosInstance.post('/answer', {
        answer: answers[question?._id] || '',
        question_id: question._id,
        tabId: tabId,
        protocol_id: id,
        complianceId:compliance.id
      })
      if(response.status < 300) {
        dispatch(showMessage({message: 'Youe Answer Saved', severity: 'success', duration: 500}))
      } else {
        dispatch(showMessage({message: 'Youe Answer Not Saved', severity: 'warning', duration: 600}))
      }
    } catch (err) {
      console.log('Error', err)
      dispatch(showMessage({message: 'Youe Answer Not Saved, Please try after some time', severity: 'error', duration: 2000}))
    }
  }

  return (
    <ProtocolQuestionContext.Provider value={{ ...rest, handleAnswerChange, handleQuestionSubmit, compliance, answers, question }}>
      <Grid item xs={12} sm={isFullWidth ? 12 : 6}>
        {(questionType === 'text' || questionType === 'bigtext') && 
          <TextFieldComponent 
            questionNumber={questionNumber} 
            bigBox={questionType === 'bigtext'}
          />}
        {questionType === 'yesno' && 
          <SingleSelectComponent 
            {...rest} 
            questionNumber={questionNumber} 
          />}
        {questionType === 'multiselect' && 
          <MultiSelectComponent 
            {...rest} 
            questionNumber={questionNumber} 
          />}
        {questionType === 'dropdown' && 
          <DropdownComponent 
            {...rest} 
            questionNumber={questionNumber} 
          />}
        {questionType === 'range' && 
          <RangeComponent 
            {...rest} 
            q uestionNumber={questionNumber} 
          />}
      </Grid>
    </ProtocolQuestionContext.Provider>
  );
};

export default FormQuestionRenderer;

export const useProtocolQuestionContext = () => {
  return useContext(ProtocolQuestionContext);
};


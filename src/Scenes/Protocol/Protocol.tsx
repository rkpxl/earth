/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { IAnswer, ICompliance, IProtocol, RootState } from '../../Utils/types/type';
import axiosInstance from '../../Utils/axiosUtil';
import { Grid, Paper } from '@mui/material';
import FormQuestionRenderer from '../../Components/Common/Form/FormQuestionRenderer';
import { useQuery } from '@tanstack/react-query';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { updateAnswer } from '../../Store/reducers/form';
import Loading from '../../Components/Common/Loading';
import NoDataFound from '../../Components/Common/NoData';

interface IProps {
  compliance: ICompliance;
  tabNumber: number;
  protocol: IProtocol;
  step?: any;
}

const questionContainerStyle = {
  padding: '24px',
  border: '1px solid #ddd',
  borderRadius: '20px',
  marginBottom: '24px',
};

const ProtocolContext = React.createContext<any>(null);


export default function Protocol(props: IProps) {
  const { tabNumber, compliance, step, protocol } = props;
  const { id } = Router.query
  const dispatch = useDispatch()
  let questionNumber = 1;

  const { data, isLoading, isError} = useQuery({
    queryKey: [`compliance-${compliance.id}-${tabNumber}`],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/questions/compliance/${compliance.id}?tabNumber=${tabNumber}`);
        return response.data; // Return the data
      } catch (error) {
        throw error; // Rethrow the error to be handled by the query
      }
    }
  })
  const { data: answerDtaa, isLoading : answerLoading, } = useQuery({
    queryKey: [`answer-${id}`],
    queryFn: async () => {
      try {
        const answers = await axiosInstance.get(`/answer/${id}`);
        answers?.data?.map((answer : IAnswer) => {
          dispatch(updateAnswer({ tabIndex: answer.tabId, id: answer.question_id, answer: answer.answer }));
        })
        return answers.data
      } catch (error) {
        throw error; // Rethrow the error to be handled by the query
      }
    }
  })

  if(isLoading || answerLoading) {
    return (<Loading />)
  }

  if(isError || data?.length < 1) {
    return (<NoDataFound />)
  }


  return (
    <ProtocolContext.Provider value={{ tabNumber, compliance, step, protocol, questionNumber }}>
        <Grid sx={{p:0}}>
          <Paper elevation={3} style={questionContainerStyle}>
            <Grid container spacing={2}>
              {data?.map((question : any, index : number) => (
                <FormQuestionRenderer 
                  key={index} 
                  question={question} 
                  questionNumber={questionNumber} 
                  tabId={tabNumber}
                />
              ))}
          </Grid>
        </Paper>
      </Grid>
    </ProtocolContext.Provider>
  );
}

export const useProtocolContext = () => {
  return useContext(ProtocolContext);
};

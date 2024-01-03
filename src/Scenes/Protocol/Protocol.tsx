/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { ICompliance, RootState } from '../../Utils/types/type';
import axiosInstance from '../../Utils/axiosUtil';
import { Grid, Paper } from '@mui/material';
import FormQuestionRenderer from '../../Components/Common/Form/FormQuestionRenderer';

interface IProps {
  compliance: ICompliance;
  complianceId: string | string[] | undefined;
  tabNumber: number;
  values?: any[];
}

const formContainerStyle = {
  padding: '0px',
};

const questionContainerStyle = {
  padding: '24px',
  border: '1px solid #ddd',
  borderRadius: '20px',
  marginBottom: '24px',
};


export default function Protocol(props: IProps) {
  const { complianceId, tabNumber, compliance, values } = props;
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Check if data is already cached in the state
        if (data) {
          // Data is already available, no need to make an API call
          setIsLoading(false);
          return;
        }

        // Fetch data from the API
        const response = await axiosInstance.get(`/questions/compliance/${complianceId}?tabNumber=${tabNumber}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data when the component mounts
    fetchData();
  }, [complianceId, tabNumber]);


  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : data ? (
        <div style={formContainerStyle}>
          <Paper elevation={3} style={questionContainerStyle}>
            <Grid container spacing={2}>
              {data.map((question : any, index : number) => (
                <FormQuestionRenderer 
                  key={index} 
                  question={question} 
                  questionNumber={index+1} 
                  values={values}
                  tabId={tabNumber}
                />
              ))}
          </Grid>
        </Paper>
      </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

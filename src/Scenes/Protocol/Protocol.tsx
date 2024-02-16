import React, { useContext } from 'react'
import { IAnswer, ICompliance, IProtocol, IQuestion } from '../../Utils/types/type'
import axiosInstance from '../../Utils/axiosUtil'
import { Grid, Paper, Typography, List, ListItem, ListItemText } from '@mui/material'
import FormQuestionRenderer from '../../Components/Common/Form/FormQuestionRenderer'
import { useQuery } from '@tanstack/react-query'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { updateAnswer, updateTab, updateTabInfo } from '../../Store/reducers/form'
import Loading from '../../Components/Common/Loading'
import NoDataFound from '../../Components/Common/NoData'

interface IProps {
  compliance: ICompliance
  tabNumber: number
  protocol: IProtocol
  step?: any
}

const questionContainerStyle = {
  padding: '24px',
  border: '1px solid #ddd',
  borderRadius: '20px',
  marginBottom: '24px',
}

const ProtocolContext = React.createContext<any>(null)

export default function Protocol(props: IProps) {
  const { tabNumber, compliance, step, protocol } = props
  const { id } = Router.query
  const dispatch = useDispatch()
  let questionNumber = 1

  // dispatch()

  const { data, isLoading, isError } = useQuery({
    queryKey: [`compliance-${compliance.id}`],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`/questions/compliance/${compliance.id}`)
        compliance.tabNames.map(async (t) => {
          await dispatch(updateTabInfo({ tabIndex: t.position, tabTitle: t?.name }))
        })
        response?.data?.map(async (q: IQuestion) => {
          await dispatch(
            updateTab({
              tabIndex: q?.tabNumber || 0,
              id: q?._id || '',
              isRequired: q?.isRequired || false,
              questionTitle: q?.title,
            }),
          )
        })
        return response.data // Return the data
      } catch (error) {
        throw error // Rethrow the error to be handled by the query
      }
    },
  })

  const { data: answerDtaa, isLoading: answerLoading } = useQuery({
    queryKey: [`answer-${id}`],
    queryFn: async () => {
      try {
        const answers = await axiosInstance.get(`/answer/${id}`)
        answers?.data?.map(async (answer: IAnswer) => {
          await dispatch(
            updateAnswer({ tabIndex: answer.tabId, id: answer.question_id, answer: answer.answer }),
          )
        })
        return answers.data
      } catch (error) {
        throw error // Rethrow the error to be handled by the query
      }
    },
  })

  if (isLoading || answerLoading) {
    return <Loading />
  }

  if (isError || data?.length < 1) {
    if(tabNumber != 100) {
      return <NoDataFound />
    } else {
      return;
    }
  }

  const infos = data.filter((q: IQuestion) => (q?.questionType === 'info' && q?.tabNumber === tabNumber))
  const tabQuestion = data.filter((q: IQuestion) => q?.tabNumber === tabNumber)

  return (
    <ProtocolContext.Provider value={{ tabNumber, compliance, step, protocol, questionNumber }}>
      <Grid sx={{ p: 0 }}>
        {infos?.map((info: any, index: any) => (
          <>
            <Typography variant="h6" gutterBottom>
              {info?.title}
            </Typography>
            <Typography color="textSecondary" paragraph sx={{ m: 0, p: 0 }}>
              {info?.description}
            </Typography>
            <List sx={{ m: 0, p: 0 }}>
              {info?.answerOptions?.map((point: any, index: any) => (
                <ListItem key={index} sx={{ m: 0, pt: 1, pb: 0 }}>
                  <Typography sx={{ marginRight: '24px' }}>•</Typography>
                  <ListItemText primary={point} />
                </ListItem>
              ))}
            </List>
          </>
        ))}
        <Paper elevation={3} style={questionContainerStyle}>
          <Grid container spacing={2}>
            {tabQuestion?.map((question: any, index: number) => (
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
  )
}

export const useProtocolContext = () => {
  return useContext(ProtocolContext)
}

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Alert, AlertColor, FormLabel, InputLabel, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next/types'
import { ViewForm } from '../../Components/Common/Forms/ViewForm';

const questions = [
  {id: 1, question: '1. what is vision of your study?', answer: '1', options: []},
  {id: 2, question: '2. what is mission of your study?', answer: '2', options: []},
  {id: 3, question: '3. Enumerate the anticipated advantages resulting from the research.', answer: '3', options: []},
  {id: 4, question: '4. Provide an estimated completion date for the entire research study.', answer: '4', options: []},
  {id: 5, question: '5. Describe the measures taken to minimize and manage these risks.', answer: '5', options: []},
  {id: 6, question: '6. Assess the potential economic impact on the study participants.', answer: '6', options: []},
  {id: 7, question: '7. Outline the sequential actions the research team will undertake with recruited and consented participants.', answer: '7', options: []},
  {id: 8, question: '8. Identify potential risks to study participants.', answer: '8', options: []},
  {id: 9, question: `9. Specify the study's location or setting.`, answer: '9', options: []},
  {id: 10, question: '10. Indicate whether the study encompasses participants under the age of ?', answer: '10', options: []},
  {id: 11, question: '11. How long do you anticipate it will take to enroll all study participants?', answer: '11', options: []},
  {id: 12, question: '12. ', answer: '12', options: []},
  {id: 13, question: '13. Confirm who will have the chance to review their data.', answer: '13', options: []},
  {id: 14, question: '14. Are there any planned surveys or interviews?', answer: '14', options: []},
  {id: 15, question: '15. Will genetic testing be conducted as part of the study?', answer: '15', options: []}
]

const ViewTask = () : JSX.Element => {
  
  const router = useRouter()
  const [departmentAllUser, setDepartmentAllUser] = React.useState([])
  const [data, setData] = useState<any>();
  const [questionData, setQuestionData] = React.useState<any>([]);
  const [reviewer, setReviewer] = React.useState('')

  const [snackMessage, setSnackMessage] = React.useState('')
  const [snackShow, setSnackShow] = React.useState(false)
  const [snackType, setSnackType] = React.useState<AlertColor | undefined>('success')

  const handleSnackbar = (message: string, type : AlertColor) => {
    setSnackMessage(message)
    setSnackType(type)
    setSnackShow(true);

    setTimeout(() => {
      setSnackShow(false);
    }, 2000);
    
  }

  // React.useEffect(() => {
  //   const id = router.query["id"]
  //   if(id) {
  //     axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/tasks/${id}`).then((response) => {
  //       setQuestionData(JSON.parse(response?.data?.rawJson).data)

  //       setData(response.data)
  //     }).catch((e) => { console.log(e) })
  //   } else {
  //     router.back()
  //   }
  // }, [])

  // React.useEffect(() => {
  //   axios.post(process.env.NEXT_PUBLIC_HOST_URL + '/users/usersOf', {
  //     org: localStorage.getItem('org') || 'space'
  //     })
  //       .then((response : any) => {
  //         // Handle the response
  //         // Store the token in local storage or a secure HTTP-only cookie
  //         if(response.status < 300) {
  //           const userId : string = localStorage.getItem('_id')?.toString() || '';
  //           setDepartmentAllUser(response.data.filter((obj : any) => obj?._id != userId))
  //         }
  //       })
  //       .catch((error) => {
  //         // Clear the form values
  //         console.error(error);
  //       });
  // }, [])

  // const submitHandle = (e : React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   if(reviewer) {
  //     const isReviewerPerson = !(reviewer === "APPROVED" || reviewer === "REJECT")
  //     axios.post(process.env.NEXT_PUBLIC_HOST_URL + '/tasks/review', {
  //       status: isReviewerPerson ? "PENDING" : reviewer,
  //       currentUserId: localStorage.getItem('_id'),
  //       taskId: data._id,
  //       isNextPerson: isReviewerPerson,
  //       nextPersonId: isReviewerPerson ? reviewer : "",
  //     })
  //     .then((response) => {
  //       if(response.status < 300) {
  //         handleSnackbar('task send', 'success')
  //         setTimeout(() => {
  //           router.push('/')
  //         }, 2000);
  //       }        
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       handleSnackbar('Something went wrong', 'error')
  //     });
  //   }
  // }

  return (
    <>
     <ViewForm />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params } : any) => {
  return {
    props: {},
  };
}
export default ViewTask;

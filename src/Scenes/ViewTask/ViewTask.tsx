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

  React.useEffect(() => {
    const id = router.query["id"]
    if(id) {
      axios.get(`http://localhost:3000/tasks/${id}`).then((response) => {
        setQuestionData(JSON.parse(response?.data?.rawJson).data)
        setData(response.data)
      }).catch((e) => { console.log(e) })
    } else {
      router.back()
    }
  }, [])

  React.useEffect(() => {
    axios.post('http://localhost:3000/users/usersOf', {
      org: localStorage.getItem('org') || 'space'
      })
        .then((response : any) => {
          // Handle the response
          // Store the token in local storage or a secure HTTP-only cookie
          if(response.status < 300) {
            const userId : string = localStorage.getItem('_id')?.toString() || '';
            setDepartmentAllUser(response.data.filter((obj : any) => obj?._id != userId))
          }
        })
        .catch((error) => {
          // Clear the form values
          console.error(error);
        });
  }, [])

  const submitHandle = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(reviewer) {
      const isReviewerPerson = !(reviewer === "APPROVED" || reviewer === "REJECT")
      axios.post('http://localhost:3000/tasks/review', {
        status: isReviewerPerson ? "PENDING" : reviewer,
        currentUserId: localStorage.getItem('_id'),
        taskId: data._id,
        isNextPerson: isReviewerPerson,
        nextPersonId: isReviewerPerson ? reviewer : "",
      })
      .then((response) => {
        if(response.status < 300) {
          handleSnackbar('task send', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000);
        }        
      })
      .catch((error) => {
        console.error(error);
        handleSnackbar('Something went wrong', 'error')
      });
    }
  }

  return (
    <>
      <form 
        style={{width: "auto", display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '24px', marginLeft: '24px', marginRight: '24px'}}
        onSubmit={submitHandle}
      >
        
        <Typography variant="h4" gutterBottom maxWidth="1100px">{questionData?.title || ''}</Typography>
        <Typography variant="subtitle1" maxWidth="1100px">{questionData?.description || ''}</Typography>
        <Typography variant="subtitle2" gutterBottom maxWidth="1100px" sx={{marginBottom: '48px', textAlign: 'center'}}>{questionData?.dept || ''}</Typography>

        <Grid container rowSpacing={2} columnSpacing={2} maxWidth="1100px" sx={{ marginLeft: '24px', marginRight: '24px', marginBottom: '24px'}}>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[0].question}</Box>
            <TextField
              disabled
              value={questionData[0]?.answer || ''}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[1].question}</Box>
            <TextField
              disabled
              value={questionData[1]?.answer || ''}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[2].question}</Box>
            <TextField
              disabled
              value={questionData[2]?.answer || ''}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[3].question}</Box>
            <TextField
              disabled
              value={questionData[3]?.answer || ''}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[4].question}</Box>
            <TextField
              disabled
              value={questionData[4]?.answer || ''}
              variant="outlined"
              fullWidth
              multiline={true}
              size="medium"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[5].question}</Box>
            <TextField
              disabled
              value={questionData[5]?.answer || ''}
              variant="outlined"
              fullWidth
              multiline={true}
              size="medium"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[6].question}</Box>
            <TextField
              disabled
              value={questionData[6]?.answer || ''}
              variant="outlined"
              fullWidth
              size="medium"
              required
            />
          </Grid>


          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[7].question}</Box>
              <FormControl fullWidth variant="outlined" size="small">
                <Select
                  disabled
                  value={questionData[7]?.answer || ''}
                  required
                  >
                  {['None', 'Low', 'Medium', 'Heigh'].map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[8].question}</Box>
              <FormControl fullWidth variant="outlined" size="small">
                <Select
                  disabled
                  value={questionData[8]?.answer || ''}
                  required
                  >
                  {['Inside org', 'Other org same country', 'Other country'].map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[9].question}</Box>
              <FormControl fullWidth variant="outlined" size="small">
                <Select
                  disabled
                  value={questionData[9]?.answer || ''}
                  required
                  >
                  {['18', '21', '28'].map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[10].question}</Box>
              <FormControl fullWidth variant="outlined" size="small">
                <Select
                  disabled
                  value={questionData[10]?.answer || ''}
                  >
                  {['Less then a month', 'Less then a quater', `Less then a 6 month's`, 'More then a year'].map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Grid>
            
          {/* <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[11].question}</Box>
              <FormGroup>
                {['a', 'b', 'c'].map((option : string) => (
                  <FormControlLabel
                    key={option}
                    label={option}
                    control={
                      <Checkbox
                        checked={Boolean(result[11]?.options[option] || false)}
                        onChange={(e) =>
                          handleCheckBoxChange(questions[11].id, option, e.target.checked)
                        }
                      />
                    }
                  />
                ))}
              </FormGroup>
          </Grid> */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[12].question}</Box>
              <FormGroup>
                {[ 'None', 'participants', 'Inside org', 'All'].map((option : any, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    control={
                      <Checkbox
                        disabled
                        value={questionData[12]?.answer || ''}
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
          </Grid>


          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>
            {questions[13].question}
            </Box>
            <FormControl component="fieldset">
              <RadioGroup>
                {['Yes', 'No'].map((option : any, optionIndex) => (
                  <FormControlLabel
                    key={optionIndex}
                    value={option}
                    control={
                      <Radio
                        required
                        disabled
                        value={option === questionData[13]?.answer}
                      />
                    }
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>
            {questions[14].question}
            </Box>
            <FormControl component="fieldset" required>
              <RadioGroup 
              >
                {['Yes', 'No'].map((option, optionIndex) => (
                  <FormControlLabel
                    disabled
                    checked={option === questionData[14]?.answer}
                    key={optionIndex}
                    value={option}
                    control={<Radio />}
                    label={option}
                    
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

        </Grid>


        <Grid container columnSpacing={2} maxWidth="1100px" sx={{ marginBottom: '64px'}}>
          <Grid item xs={12} lg={6}>
            <FormControl
                fullWidth
                required
                >
                <InputLabel id="select" size="small">Approve/Reject or Select a reviewer</InputLabel>
                <Select 
                  required
                  label="Approve/Reject or Select a reviewer"
                  size="small"
                  onChange={(e : any) => setReviewer(e.target.value)}
                >
                  {[ {name: "Approve", _id: 'APPROVED'}, {name: "Reject", _id: 'REJECT'}, ...departmentAllUser ]?.map((option : any) => (
                    <MenuItem key={option._id} value={option?._id}>
                      {option?.name || ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} lg={6} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
            <Button sx={{ width: '100%' , maxWidth: '148px', fontSize: '18px', height: '100%' }} type="submit" variant="contained">Submit</Button>
          </Grid>
      </Grid>
      </form>
      <Snackbar open={snackShow} autoHideDuration={2000} onClose={() => setSnackShow(false)}>
        <Alert onClose={() => setSnackShow(false)} severity={snackType}>
          {snackMessage}
        </Alert>
      </Snackbar>
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

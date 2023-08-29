import React from 'react';
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


interface Question {
  id: number,
  section: string,
  title: string;
  type: 'text' | 'bigText' | 'dropdown' | 'checkbox';
  options?: string[];
}

interface FormProps {
  title: string | string[] | undefined
  dept: string | string[] | undefined
  description: string | string[] | undefined
}

const data : Array<Question> = [
    {
      "id": 6,
      "section": "Primary and Secondary Endpoints",
      "title": "Are there any secondary endpoints you also want to assess?",
      "type": "bigText"
    },
    {
      "id": 5,
      "section": "Primary and Secondary Endpoints",
      "title": "What are the main outcomes or endpoints you aim to measure?",
      "type": "text"
    },
    {
      "id": 8,
      "section": "Primary and Secondary Endpoints",
      "title": "What are the main outcomes or endpoints you aim to measure?",
      "options": ['x', 'y', 'z'],
      "type": "dropdown"
    },
    {
      "id": 7,
      "section": "Primary and Secondary Endpoints",
      "title": "Are there any secondary endpoints you also want to assess?",
      "options": ['x', 'y', 'z'],
      "type": "checkbox"
    }
]

export const QuestionList: React.FC<FormProps> = ({ title, dept, description }) => {
  const router = useRouter()
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

  const [departmentAllUser, setDepartmentAllUser] = React.useState([])
  const [result, setResult] = React.useState(questions)
  const [reviewer, setReviewer] = React.useState('')
  const [snackMessage, setSnackMessage] = React.useState('')
  const [snackShow, setSnackShow] = React.useState(false)
  const [snackType, setSnackType] = React.useState<AlertColor | undefined>('success')
  const date = new Date()

  const handleSnackbar = (message: string, type : AlertColor) => {
    setSnackMessage(message)
    setSnackType(type)
    setSnackShow(true);

    setTimeout(() => {
      setSnackShow(false);
    }, 2000);
    
  }
  
  const submitHandle = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(reviewer) {
      axios.post('http://localhost:3000/tasks', {
        org: localStorage.getItem('org'),
        userId: localStorage.getItem('_id'),
        rawJson: JSON.stringify({
          "data": {
            creator: localStorage.getItem('name'),
            date: date.getTime(),
            title: title,
            dept: dept,
            description: description,
            ...result
          }
        }),
        status: "pending",
        approvals: [ { userId: reviewer } ],
        currentAssignedTo: reviewer,
      })
      .then((response) => {
        if(response.status < 300) {
          handleSnackbar('Your protocol created and send', 'success')
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

  const handleAnswerChange = (questionId: number, answer: any) => {
    setResult((prevQuestionState) =>
      prevQuestionState.map((question) =>
        question.id === questionId ? { ...question, answer } : question
      )
    );
  };

  const getCheckBoxUpdatedValue = (question : any, option: string, isChecked: boolean) => { 
    question.options[option] = isChecked;
    return { ...question } 
  }

  const getRadioUpdatedValue = (question : any, option: string, isChecked: boolean) => { 
    question.options = [];
    question.options[option] = isChecked;
    return { ...question } 
  }

  const handleCheckBoxChange = (questionId: number, option: string, isChecked: boolean) => {
    setResult((prevQuestionState) =>
    prevQuestionState.map((question) =>
      question.id === questionId ? getCheckBoxUpdatedValue(question, option, isChecked) : question
    ));
  };

  const handleRadioBoxChange = (questionId: number, option: string, isChecked: boolean) => {
    setResult((prevQuestionState) =>
    prevQuestionState.map((question) =>
      question.id === questionId ? getRadioUpdatedValue(question, option, isChecked) : question
    ));
  };

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

  return (
    <>
      <form 
        style={{width: "auto", display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '24px', marginLeft: '24px', marginRight: '24px'}}
        onSubmit={submitHandle}
      >
        
        <Typography variant="h4" gutterBottom maxWidth="1100px">{title}</Typography>
        <Typography variant="subtitle1" maxWidth="1100px">{description}</Typography>
        <Typography variant="subtitle2" gutterBottom maxWidth="1100px" sx={{marginBottom: '48px', textAlign: 'center'}}>{dept}</Typography>

        <Grid container rowSpacing={2} columnSpacing={2} maxWidth="1100px" sx={{ marginLeft: '24px', marginRight: '24px', marginBottom: '24px'}}>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[0].question}</Box>
            <TextField
              onChange={(e) => handleAnswerChange(1, e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[1].question}</Box>
            <TextField
              onChange={(e) => handleAnswerChange(2, e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[2].question}</Box>
            <TextField
              onChange={(e) => handleAnswerChange(3, e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[3].question}</Box>
            <TextField
              onChange={(e) => handleAnswerChange(4, e.target.value)}
              variant="outlined"
              fullWidth
              size="small"
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ typography: 'body1', fontWeight: 'medium', marginBottom: '8px', fontSize: '16px' }}>{questions[4].question}</Box>
            <TextField
              onChange={(e) => handleAnswerChange(5, e.target.value)}
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
              onChange={(e) => handleAnswerChange(6, e.target.value)}
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
              onChange={(e) => handleAnswerChange(7, e.target.value)}
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
                  onChange={(e) => handleAnswerChange(8, e.target.value)}
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
                  onChange={(e) => handleAnswerChange(9, e.target.value)}
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
                  onChange={(e) => handleAnswerChange(10, e.target.value)}
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
                  onChange={(e) => handleAnswerChange(11, e.target.value)}
                  required
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
                        checked={Boolean(result[12]?.options[option] || false)}
                        onChange={(e) =>
                          handleCheckBoxChange(questions[12].id, option, e.target.checked)
                        }
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
                        checked={Boolean(result[13]?.options[option] || false)}
                        onChange={(e) =>
                          handleRadioBoxChange(questions[13].id, option, e.target.checked)
                        }
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
              <RadioGroup >
                {['Yes', 'No'].map((option, optionIndex) => (
                  <FormControlLabel
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
                <InputLabel id="select" size="small">Select reviewer</InputLabel>
                <Select 
                  required
                  label="Select reviewer"
                  size="small"
                  onChange={(e : any) => setReviewer(e.target.value)}
                >
                  {departmentAllUser?.map((option : any) => (
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
};

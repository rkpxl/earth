import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Alert, AlertColor, Radio, RadioGroup, Snackbar, Step, StepLabel, Stepper, Tab, Tabs, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps } from 'next';
import SearchPeople from '../SearchPeople';
import DocumentTab from './DocumentTab';
import SubmitTab from './SubmitTab';
import PersonnelTab from './PersonnelTab';
import QuestionBank from './QuestionBank';

interface FormProps {
  title: string | string[] | undefined
  dept: string | string[] | undefined
  description: string | string[] | undefined
}

interface Question {
  id: number,
  question: string,
  answer: string, 
  options: any,
}


const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

type AllowedKeys = 'name' | 'role' | 'access'; 

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface PersonnelPerson {
  userId: string | null,
  name: string | null,
  role: string | null,
  access: string | null,
  status: string | null,
  comment: string | null,
}


function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export const QuestionList: React.FC<FormProps> = ({ title, dept, description }) => {
  const router = useRouter()
  const questions : Array<Question> = [
    {id: 1, question: '1. what is vision of your study?', answer: '', options: {}},
    {id: 2, question: '2. what is mission of your study?', answer: '', options: {}},
    {id: 3, question: '3. Enumerate the anticipated advantages resulting from the research.', answer: '',options: {}},
    {id: 4, question: '4. Provide an estimated completion date for the entire research study.', answer: '', options: {}},
    {id: 5, question: '5. Describe the measures taken to minimize and manage these risks.', answer: '', options: {}},
    {id: 6, question: '6. Assess the potential economic impact on the study participants.', answer: '', options: {}},
    {id: 7, question: '7. Outline the sequential actions the research team will undertake with recruited and consented participants.', answer: '', options: {}},
    {id: 8, question: '8. Identify potential risks to study participants.', answer: '', options: {}},
    {id: 9, question: `9. Specify the study's location or setting.`, answer: '', options: {}},
    {id: 10, question: '10. Indicate whether the study encompasses participants under the age of ?', answer: '', options: {}},
    {id: 11, question: '11. How long do you anticipate it will take to enroll all study participants?', answer: '', options: {}},
    {id: 12, question: '12. ', answer: '', options: {}},
    {id: 13, question: '13. Confirm who will have the chance to review their data.', answer: '', options: {}},
    {id: 14, question: '14. Are there any planned surveys or interviews?', answer: '', options: {}},
    {id: 15, question: '15. Will genetic testing be conducted as part of the study?', answer: '', options: {}}
  ]

  const [documents, setDocuments] = useState<any>([]);
  const [value, setValue] = useState(0);
  const [rows, setRows] = useState<Array<PersonnelPerson>>([]);
  const [addPersonDialog, setAddPersonDialog] = useState(false);
  const [allPeoples, setAllPeoples] = useState<Array<PersonnelPerson>>([])
  const [result, setResult] = useState(questions)
  const [reviewer, setReviewer] = useState('')
  const [comment, setComment] = useState('')
  
  const [snackMessage, setSnackMessage] = useState('')
  const [snackShow, setSnackShow] = useState(false)
  const [snackType, setSnackType] = useState<AlertColor | undefined>('success')
  const date = new Date()

  const addRow = (data: any) => {
    const newRow = { userId: data._id, name: data.name, role: 'External', access: 'READ', comment: '', status: "PENDING" };
    setRows([...rows, newRow]);
    toggelSearchBarToAddPerson()
  };

  const toggelSearchBarToAddPerson = () => {
    setAddPersonDialog(!addPersonDialog)
  }

  const removeRow = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const handleInputChange = (index : number, key : AllowedKeys, value : string) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(localStorage && typeof localStorage !== 'undefined') {
      setRows([{ userId: localStorage.getItem('_id'), name: localStorage.getItem('name'), role: 'Creator', access: 'ADMIN', status: "APPROVED", comment: '' }])
    }
    axios.post(process.env.NEXT_PUBLIC_HOST_URL + '/users/usersOf', {
      org: localStorage.getItem('org') || 'space'
      })
        .then((response : any) => {
          // Handle the response
          // Store the token in local storage or a secure HTTP-only cookie
          if(response.status < 300) {
            const userId : string = localStorage.getItem('_id')?.toString() || '';
            setAllPeoples(response.data)
          }
        })
        .catch((error) => {
          // Clear the form values
          console.error(error);
        });
  }, [])

  const updateComment = () => {
    const updatedRow = [...rows]
    updatedRow[0].comment = comment
    setRows(updatedRow)
  }

  const handleSnackbar = (message: string, type : AlertColor) => {
    setSnackMessage(message)
    setSnackType(type)
    setSnackShow(true);

    setTimeout(() => {
      setSnackShow(false);
    }, 2000);
    
  }

  const uploadDoc = async (doc : any) => {
    const formData = new FormData();
    formData.append('file', doc.file, doc.file.name);
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_HOST_URL+"/tasks/upload",formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    } catch(e) {
      console.log(e)
    }
  }
  
  const submitHandle = async (e : any) => {
    e.preventDefault();
    if(reviewer) {
      const updatedDocument = await Promise.all(documents.map(async (doc : any) => {
        const uri= await uploadDoc(doc)
        return {...doc, uri: uri}
      }))
      updateComment()
      console.log(rows, {
        creator: localStorage.getItem('name'),
        date: date.getTime(),
        title: title,
        documents: updatedDocument,
        dept: dept,
        description: description,
        comment: '',
        ...result
      })
      axios.post(process.env.NEXT_PUBLIC_HOST_URL + '/tasks', {
        org: localStorage.getItem('org'),
        userId: localStorage.getItem('_id'),
        rawJson: JSON.stringify({
            creator: localStorage.getItem('name'),
            date: date.getTime(),
            title: title,
            documents: updatedDocument,
            dept: dept,
            description: description,
            comment: '',
            ...result
        }),
        status: "PENDING",
        approvals: rows,
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
    console.log(questions)
  };

  return (
   <>
    <title>Protocol</title>
    <Box sx={{ width: '100%' }}>
      <SearchPeople allPeoples={allPeoples} addedPeoples={rows} addPerson={addRow} open={addPersonDialog} onClose={toggelSearchBarToAddPerson} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Question" {...a11yProps(0)} />
          <Tab label="Personnel" {...a11yProps(1)} />
          <Tab label="Documents" {...a11yProps(1)} />
          <Tab label="Submit" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <QuestionBank 
          isDisabled={false}
          title={title}
          description={description}
          dept={dept}
          questions={questions}
          result={result}
          handleAnswerChange={handleAnswerChange}
          setValue={setValue} 
          setResult={setResult}       
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PersonnelTab 
          rows={rows}
          handleInputChange={handleInputChange}
          removeRow={removeRow}
          toggelSearchBarToAddPerson={toggelSearchBarToAddPerson} 
          isDisabled={false}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DocumentTab 
          documents={documents} 
          setDocuments={setDocuments} 
          isDisabled={false} 
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SubmitTab 
          departmentAllUser={rows.slice(1, rows.length)} 
          setReviewer={setReviewer} 
          submitHandle={submitHandle} 
          setComment={setComment}
          comment={comment}
        />
      </CustomTabPanel>
      <Snackbar open={snackShow} autoHideDuration={2000} onClose={() => setSnackShow(false)}>
        <Alert onClose={() => setSnackShow(false)} severity={snackType}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
   </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params } : any) => {
  return {
    props: {},
  };
}

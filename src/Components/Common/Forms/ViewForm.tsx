import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Alert, AlertColor, Snackbar, Tab, Tabs } from '@mui/material';
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


export const ViewForm: React.FC = () => {
  const router = useRouter()

  const [documents, setDocuments] = useState<any>([]);
  const [value, setValue] = useState(0);
  const [rows, setRows] = useState<Array<PersonnelPerson>>([]);
  const [addPersonDialog, setAddPersonDialog] = useState(false);
  const [allPeoples, setAllPeoples] = useState<Array<PersonnelPerson>>([])
  const [result, setResult] = useState<any>()
  const [reviewer, setReviewer] = useState('')
  const [comment, setComment] = useState('')
  
  const [snackMessage, setSnackMessage] = useState('')
  const [snackShow, setSnackShow] = useState(false)
  const [snackType, setSnackType] = useState<AlertColor | undefined>('success')
  const [data, setData] = useState<any>();
  const [accessType, setAccessType] = useState(true)

  const addRow = (data: any) => {
    const newRow = { userId: data._id, name: data.name, role: 'External', access: 'Read', comment: '', status: "PENDING" };
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
      console.error(e)
    }
  }
  
  const submitHandle = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(reviewer) {
      const taskId = data._id
      const updatedJson = await axios.post(process.env.NEXT_PUBLIC_HOST_URL + "/tasks/" + taskId +  '/update-raw-json', {
        rawJson: JSON.stringify({
          updater: localStorage.getItem("_id"),
          ...result
        })
      })

      if(updatedJson.status > 300) {
        throw "Something went wrong";
      }

      const isReviewerPerson = !(reviewer === "APPROVED" || reviewer === "REJECTED")
      axios.post(process.env.NEXT_PUBLIC_HOST_URL + '/tasks/review', {
        status: isReviewerPerson ? "PENDING" : reviewer,
        currentUserId: localStorage.getItem('_id'),
        taskId: data._id,
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

  const handleAnswerChange = (questionId: number, answer: any) => {
    const newAns = {
      ...result,
      [questionId-1]: {...result[questionId-1], answer: answer}
    }
    setResult(newAns)
  };

  React.useEffect(() => {
    const id = router.query["id"]
    if(id) {
      axios.get(`${process.env.NEXT_PUBLIC_HOST_URL}/tasks/${id}`).then((response) => {
        setResult(JSON.parse(response?.data?.rawJson))
        const filteredPeoples = response?.data?.approvals?.filter((p : any) => !(p.status === "APPROVED" || p.userId === localStorage.getItem("_id")))
        const selected = response?.data?.approvals?.filter((p : any) => (p.userId === localStorage.getItem("_id")))
        if(selected[0]?.access === "ADMIN" || selected[0]?.access === "WRITE") {
            setAccessType(false)
        } else {
          setAccessType(true)
        }
        setAllPeoples(filteredPeoples)
        setData(response.data)
      }).catch((e) => { console.error(e) })
    } else {
      router.back()
    }
  }, [])

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
          isDisabled={accessType}
          title={result?.title || ''}
          description={result?.description || ''}
          dept={result?.dept || ''}
          questions={result}
          result={result}
          handleAnswerChange={handleAnswerChange}
          setValue={setValue} 
          setResult={setResult}       
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PersonnelTab 
          rows={data?.approvals}
          handleInputChange={handleInputChange}
          removeRow={removeRow}
          toggelSearchBarToAddPerson={toggelSearchBarToAddPerson} 
          isDisabled={accessType}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <DocumentTab 
          documents={result?.documents} 
          setDocuments={setDocuments} 
          isDisabled={accessType} 
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <SubmitTab 
          departmentAllUser={allPeoples} 
          setReviewer={setReviewer} 
          submitHandle={submitHandle} 
          setComment={setComment}
          comment={comment}
          isView={true}
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

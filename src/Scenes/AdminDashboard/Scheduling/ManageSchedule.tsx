import { Box, Grid, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getStandatedDate } from '../../../Utils/dateTime';
import { useRouter } from 'next/router'
import { CircularProgress, Tab, Tabs } from '@mui/material'
import CustomTabPanel from '../../../Components/Common/CustomTabPanel'
import { AppDispatch } from '../../../Utils/types/type';
import { useDispatch } from 'react-redux';

const apiResponse = [
  {
    "_id": "65d789ccf516520157c17d81",
    "piName": "Ritik",
    "pi_id": "659552a7448200475e35e760",
    "title": "Notification testing",
    "expireAt": "2027-02-22T17:52:12.272Z",
    "protocolNumber": "ec2",
    "reviewType": "Expedited",
    "description": "Notification testing",
    "status": "Review",
    "actionStatus": "Inital",
    "protocolAction": "Inital",
    "currentAssignee_id": "659552a7448200475e35e760",
    "department": "Chemistry",
    "complianceId": 21,
    "orgId": 1,
    "isActive": true,
    "createdBy": "659552a7448200475e35e760",
    "mandatoryApprovers": [
        {
            "groupName": "Admins 2",
            "group_id": "6598f185a233d394e6375744",
            "isOptiona": false,
            "isBoard": false,
            "isAdmin": false,
            "isAutoAssign": false,
            "step": 2,
            "onCancel": "admin",
            "isApproved": false,
            "approver_id": "659552a7448200475e35e760",
            "approverName": "Ritik",
            "role": "",
            "access": ""
        }
    ],
    "rule_id": "65b742e344e572f88bb9fbcd",
    "createdAt": "2024-02-22T17:52:12.279Z",
    "updatedAt": "2024-02-22T17:53:04.218Z",
    "__v": 0,
    "currentAssigneeName": "Ritik"
},
{
    "_id": "65d724ad8866b327ed8a9874",
    "piName": "Ritik",
    "pi_id": "659552a7448200475e35e760",
    "title": "Testing moreinfo",
    "expireAt": "2025-02-22T10:40:45.931Z",
    "protocolNumber": "",
    "reviewType": "Exemption",
    "description": "Testing moreinfo",
    "status": "Draft",
    "actionStatus": "Inital",
    "protocolAction": "Initial",
    "currentAssignee_id": "659552a7448200475e35e760",
    "department": "Psychology",
    "complianceId": 21,
    "orgId": 1,
    "isActive": true,
    "createdBy": "659552a7448200475e35e760",
    "mandatoryApprovers": [
        {
            "groupName": "Admins 2",
            "group_id": "6598f185a233d394e6375744",
            "isOptiona": false,
            "isBoard": false,
            "isAdmin": false,
            "isAutoAssign": false,
            "step": 2,
            "onCancel": "admin",
            "isApproved": false,
            "approver_id": "",
            "approverName": "",
            "role": "",
            "access": ""
        }
    ],
    "rule_id": "65b742e344e572f88bb9fbcd",
    "createdAt": "2024-02-22T10:40:45.947Z",
    "updatedAt": "2024-02-22T10:40:45.947Z",
    "__v": 0
},
{
    "_id": "65d59b3e0a2582a2848f48a3",
    "piName": "Ritik",
    "pi_id": "659552a7448200475e35e760",
    "title": "Approval notification test",
    "expireAt": "2025-02-21T06:42:06.894Z",
    "protocolNumber": "ec234a",
    "reviewType": "Exemption",
    "description": "Approval notification test",
    "status": "Review",
    "actionStatus": "Amendment",
    "protocolAction": "Amendment",
    "currentAssignee_id": "6598f1e5698e58b679a5b7f7",
    "department": "Chemistry",
    "complianceId": 21,
    "orgId": 1,
    "isActive": true,
    "createdBy": "659552a7448200475e35e760",
    "mandatoryApprovers": [
        {
            "groupName": "Admins 2",
            "group_id": "6598f185a233d394e6375744",
            "isOptiona": false,
            "isBoard": false,
            "isAdmin": false,
            "isAutoAssign": false,
            "step": 2,
            "onCancel": "admin",
            "isApproved": false,
            "approver_id": "6598f1e5698e58b679a5b7f7",
            "approverName": "Kamal",
            "role": "",
            "access": ""
        }
    ],
    "rule_id": "65b742e344e572f88bb9fbcd",
    "createdAt": "2024-02-21T06:42:06.908Z",
    "updatedAt": "2024-02-21T07:55:46.514Z",
    "__v": 0,
    "currentAssigneeName": "Kamal"
},
{
    "_id": "65ce3e2f52eefbe6a9a51b5e",
    "piName": "Ritik",
    "pi_id": "659552a7448200475e35e760",
    "title": "test",
    "expireAt": "2027-02-15T16:39:11.968Z",
    "protocolNumber": "ec234a",
    "reviewType": "Expedited",
    "description": "test",
    "status": "Review",
    "actionStatus": "Inital",
    "protocolAction": "Inital",
    "currentAssignee_id": "6598f1ef698e58b679a5b7fb",
    "department": "pagination test 4",
    "complianceId": 21,
    "orgId": 1,
    "isActive": true,
    "createdBy": "659552a7448200475e35e760",
    "mandatoryApprovers": [
        {
            "groupName": "Admins 2",
            "group_id": "6598f185a233d394e6375744",
            "isOptiona": false,
            "isBoard": false,
            "isAdmin": false,
            "isAutoAssign": false,
            "step": 2,
            "onCancel": "admin",
            "isApproved": false,
            "approver_id": "6598f1d7698e58b679a5b7f3",
            "approverName": "Varsha",
            "role": "",
            "access": ""
        }
    ],
    "rule_id": "65b742e344e572f88bb9fbcd",
    "createdAt": "2024-02-15T16:39:11.975Z",
    "updatedAt": "2024-02-15T16:47:09.717Z",
    "__v": 0,
    "currentAssigneeName": "Kanta"
},
{
    "_id": "65ce3d4652eefbe6a9a51ae9",
    "piName": "Ritik",
    "pi_id": "659552a7448200475e35e760",
    "title": "test",
    "expireAt": "2027-02-15T16:35:18.932Z",
    "protocolNumber": "ec234a",
    "reviewType": "Expedited",
    "description": "test",
    "status": "Draft",
    "actionStatus": "Inital",
    "protocolAction": "Initial",
    "currentAssignee_id": "659552a7448200475e35e760",
    "department": "Chemistry",
    "complianceId": 21,
    "orgId": 1,
    "isActive": true,
    "createdBy": "659552a7448200475e35e760",
    "mandatoryApprovers": [
        {
            "groupName": "Admins 2",
            "group_id": "6598f185a233d394e6375744",
            "isOptiona": false,
            "isBoard": false,
            "isAdmin": false,
            "isAutoAssign": false,
            "step": 2,
            "onCancel": "admin",
            "isApproved": false,
            "approver_id": "659552a7448200475e35e760",
            "approverName": "Ritik",
            "role": "",
            "access": ""
        }
    ],
    "rule_id": "65b742e344e572f88bb9fbcd",
    "createdAt": "2024-02-15T16:35:18.946Z",
    "updatedAt": "2024-02-15T16:36:20.475Z",
    "__v": 0
},
{
    "_id": "65ce3816d47acf4cbf57d25b",
    "piName": "Ritik",
    "pi_id": "659552a7448200475e35e760",
    "title": "yy",
    "expireAt": "2027-02-15T16:13:10.568Z",
    "protocolNumber": "ec234a",
    "reviewType": "Expedited",
    "description": "yy",
    "status": "Draft",
    "actionStatus": "Inital",
    "protocolAction": "Initial",
    "currentAssignee_id": "659552a7448200475e35e760",
    "department": "sorting test 1",
    "complianceId": 22,
    "orgId": 1,
    "isActive": true,
    "createdBy": "659552a7448200475e35e760",
    "mandatoryApprovers": [
        {
            "groupName": "test - 2",
            "group_id": "wsc3d",
            "isAdmin": true,
            "isManual": false,
            "isOptional": true,
            "isBoard": true,
            "step": 1,
            "isApproved": false,
            "approver_id": "",
            "approverName": "",
            "role": "",
            "access": ""
        }
    ],
    "rule_id": "65af7403f7e4dfa39c76ec9e",
    "createdAt": "2024-02-15T16:13:10.585Z",
    "updatedAt": "2024-02-15T16:13:10.585Z",
    "__v": 0
},
]

const rootStyle = {
  height: '100%',
  overflowY: 'auto',
  backgroundColor: 'white',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
};


function a11yProps(index: number) {
  return {
    id: `meeting-tab-${index}`,
    'aria-controls': `meeting-tabpanel-${index}`,
  }
}

export default function ManageSchedule() {

  const [selected, setSelected] = useState<string>();
  const router = useRouter()
  const [value, setValue] = useState<number>(0)
  const dispatch: AppDispatch = useDispatch()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

   // Helper function to create content rows
   const createContentRows = (item : any) => {
    const rows = [
      { key: 'title', value: <Typography variant="h6">{item.title}</Typography> },
      { key: 'piName', value: <Typography variant="body1">PI Name: <b>{item.piName}</b></Typography> },
      { key: 'complianceId', value: <Typography variant="body1">Compliance ID: {item.complianceId}</Typography> },
      { key: 'status', value: <Typography variant="body1">Status: {item.status}</Typography> },
      { key: 'expireAt', value: <Typography variant="body1">Expire At: {getStandatedDate(item.expireAt)}</Typography> },
      { key: 'description', value: <Typography variant="body1">Description: {item.description}</Typography> },
      { key: 'department', value: <Typography variant="body1">Department: {item.department}</Typography> },
    ];

    return rows.map((row, index) => (
      <Grid item xs={12} sm={row.key == 'title' ? 12 : 6} key={row.key}>
        {row.value}
      </Grid>
    ));
  };

  


  return (
    <>
     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Protocol" {...a11yProps(0)} />
          <Tab label="Plan" {...a11yProps(1)} />
          <Tab label="Agenda" {...a11yProps(2)} />
          <Tab label="Menuites" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel  value={value} index={0} sx={{ p: 0 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={5}>
            <Box sx={rootStyle}>
              <Grid container spacing={2}>
                {apiResponse.map((item, index) => {
                  return (
                    <Grid item xs={12} key={index}>
                      <Paper sx={{
                        background: selected === item._id ? 'gray' : '',
                        padding: '16px',
                        margin: '8px',
                        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        }
                      }} onClick={() => setSelected(item._id)}>
                        <Grid container spacing={1}>
                          {createContentRows(item)}
                        </Grid>
                      </Paper>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel  value={value} index={1} sx={{ p: 0 }}>
        {/* <Completed /> */}
      </CustomTabPanel>
    </>
  )
}

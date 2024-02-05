import React from 'react'
import { Tabs, Tab, Box, Typography, FormControl, TextField, Select, MenuItem, FormControlLabel, Checkbox, RadioGroup, Radio, Grid, Paper } from '@mui/material';
import SnapshotTabPanel from '../../Components/Snapshot/SnapshotTabPanel';
import SnapshotProtocolInfo from '../../Components/Snapshot/SnapshotProtocolInfo';

function separateByTabId(arr : Array<any>) {
  const result : any = {};

  arr.forEach(obj => {
    if (!result[obj.tabNumber]) {
      result[obj.tabNumber] = [];
    }
    result[obj.tabNumber].push(obj);
  });

  return result;
}

function a11yProps(index : number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function Snapshot({ snapshot } : any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event : any, newValue : number)  => {
    setValue(newValue);
  };

  const data = snapshot.data;
  const qa = separateByTabId(data.qa)
  const compliance = data.compliance;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Protocol" {...a11yProps(0)} key={0} />
          {compliance.tabNames.map((tab : any, index : number) => (
            <Tab label={tab.name} {...a11yProps(index + 1)} key={tab.position} />
          ))}
        </Tabs>
      </Box>
      {value === 0 && <SnapshotProtocolInfo protocol={snapshot.data.protocol}/>}
      {compliance.tabNames.map((tab : any, index : number) => (
        <SnapshotTabPanel value={value} index={index + 1} key={tab.position}>
          <Grid container columnSpacing={4} rowSpacing={2} sx={{ p: 2 }}>
            {qa[tab.position]?.map((question : any, qIndex : number) => (
              <Grid item key={question.question_id} spacing={2} xs={12} sm={question?.isFullWidth ? 12 : 6}>
                  <Typography variant="subtitle1">
                    {question.questionTitle}
                  </Typography>
                  {(question.questionType === 'text' || question.questionType === 'bigtext' || question.questionType === 'dropdown') && (
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      value={question.answer || 'N/A'} // Display 'N/A' if answer is empty or undefined
                      disabled
                      margin="normal"
                    />
                  )}
                  {question.questionType === 'multiselect' && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                      {question.answer.map((answer : any, aIndex : number) => (
                        <FormControlLabel
                          key={aIndex}
                          control={<Checkbox checked={true} disabled />}
                          label={answer}
                        />
                      ))}
                    </Box>
                  )}
                  {question.questionType === 'yesno' && (
                    <RadioGroup
                      aria-label="quiz"
                      name="quiz"
                      value={question.answer}
                      sx={{ flexDirection: 'row', mt: 1 }}
                    >
                      <FormControlLabel value="yes" control={<Radio disabled />} label="Yes" />
                      <FormControlLabel value="no" control={<Radio disabled />} label="No" />
                    </RadioGroup>
                  )}
              </Grid>
            ))}
          </Grid>
        </SnapshotTabPanel>
      ))}
    </Box>
  )
}

import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import {
  Box,
  CircularProgress,
  Grid,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import Button from '@mui/material/Button'

interface QuestionBankProps {
  isDisabled: boolean
  title: string | string[] | undefined
  description: string | string[] | undefined
  dept: string | string[] | undefined
  questions: Array<any>
  result: any
  handleAnswerChange: Function
  setValue: Function
  setResult: Function
  isView?: boolean
}

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

const QuestionBank = (props: QuestionBankProps) => {
  const {
    isDisabled,
    title,
    result,
    description,
    dept,
    questions,
    handleAnswerChange,
    setValue,
    setResult,
    isView = false,
  } = props

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setValue((previousVal: number) => previousVal + 1)
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const getCheckBoxUpdatedValue = (question: any, option: string, isChecked: boolean) => {
    question.options[option] = isChecked
    return { ...question }
  }

  const getRadioUpdatedValue = (question: any, option: string, isChecked: boolean) => {
    question.options = {}
    question.options[option] = isChecked
    return { ...question }
  }

  const handleCheckBoxChange = (questionId: number, option: string, isChecked: boolean) => {
    setResult((prevQuestionState: any) =>
      prevQuestionState.map((question: any) =>
        question.id === questionId
          ? getCheckBoxUpdatedValue(question, option, isChecked)
          : question,
      ),
    )
  }

  const handleRadioBoxChange = (questionId: number, option: string, isChecked: boolean) => {
    setResult((prevQuestionState: any) =>
      prevQuestionState.map((question: any) =>
        question.id === questionId ? getRadioUpdatedValue(question, option, isChecked) : question,
      ),
    )
  }

  if (!questions) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label: any, index: any) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: {
              optional?: React.ReactNode
            } = {}
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === 0 ? (
          <React.Fragment>
            <form
              style={{
                width: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '24px',
                marginLeft: '24px',
                marginRight: '24px',
              }}
            >
              <Typography variant="h4" gutterBottom maxWidth="1100px">
                {title}
              </Typography>
              <Typography variant="subtitle1" maxWidth="1100px">
                {description}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                maxWidth="1100px"
                sx={{ marginBottom: '48px', textAlign: 'center' }}
              >
                {dept}
              </Typography>

              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                maxWidth="1100px"
                sx={{ marginLeft: '24px', marginRight: '24px', marginBottom: '24px' }}
              >
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[0]?.question}
                  </Box>
                  <TextField
                    onChange={(e) => handleAnswerChange(1, e.target.value)}
                    value={result[0]?.answer || ''}
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    InputProps={{ readOnly: isDisabled }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[1]?.question}
                  </Box>
                  <TextField
                    onChange={(e) => handleAnswerChange(2, e.target.value)}
                    value={result[1]?.answer || ''}
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    InputProps={{ readOnly: isDisabled }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[2]?.question}
                  </Box>
                  <TextField
                    onChange={(e) => handleAnswerChange(3, e.target.value)}
                    value={result[2]?.answer || ''}
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    InputProps={{ readOnly: isDisabled }}
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[3]?.question}
                  </Box>
                  <TextField
                    onChange={(e) => handleAnswerChange(4, e.target.value)}
                    value={result[3]?.answer || ''}
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    InputProps={{ readOnly: isDisabled }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[4]?.question}
                  </Box>
                  <TextField
                    onChange={(e) => handleAnswerChange(5, e.target.value)}
                    value={result[4]?.answer || ''}
                    variant="outlined"
                    fullWidth
                    multiline={true}
                    size="medium"
                    required
                    InputProps={{ readOnly: isDisabled }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[5]?.question}
                  </Box>
                  <TextField
                    onChange={(e) => handleAnswerChange(6, e.target.value)}
                    value={result[5]?.answer || ''}
                    variant="outlined"
                    fullWidth
                    multiline={true}
                    size="medium"
                    required
                    InputProps={{ readOnly: isDisabled }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[6]?.question}
                  </Box>
                  <TextField
                    onChange={(e) => handleAnswerChange(7, e.target.value)}
                    value={result[6]?.answer || ''}
                    variant="outlined"
                    fullWidth
                    size="medium"
                    required
                    InputProps={{ readOnly: isDisabled }}
                  />
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        ) : null}
        {activeStep === 1 ? (
          <React.Fragment>
            <form
              style={{
                width: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '24px',
                marginLeft: '24px',
                marginRight: '24px',
              }}
            >
              <Typography variant="h4" gutterBottom maxWidth="1100px">
                {title}
              </Typography>
              <Typography variant="subtitle1" maxWidth="1100px">
                {description}
              </Typography>
              <Typography
                variant="subtitle2"
                gutterBottom
                maxWidth="1100px"
                sx={{ marginBottom: '48px', textAlign: 'center' }}
              >
                {dept}
              </Typography>

              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                maxWidth="1100px"
                sx={{ marginLeft: '24px', marginRight: '24px', marginBottom: '24px' }}
              >
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[7]?.question}
                  </Box>
                  <FormControl fullWidth variant="outlined" size="small">
                    <Select
                      onChange={(e) => handleAnswerChange(8, e.target.value)}
                      required
                      value={result[7]?.answer || ''}
                      disabled={isDisabled}
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
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[8]?.question}
                  </Box>
                  <FormControl fullWidth variant="outlined" size="small">
                    <Select
                      onChange={(e) => handleAnswerChange(9, e.target.value)}
                      required
                      value={result[8]?.answer || ''}
                      disabled={isDisabled}
                    >
                      {['Inside org', 'Other org same country', 'Other country'].map(
                        (option, optionIndex) => (
                          <MenuItem key={optionIndex} value={option}>
                            {option}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[9]?.question}
                  </Box>
                  <FormControl fullWidth variant="outlined" size="small">
                    <Select
                      onChange={(e) => handleAnswerChange(10, e.target.value)}
                      required
                      value={result[9]?.answer || ''}
                      disabled={isDisabled}
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
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[10]?.question}
                  </Box>
                  <FormControl fullWidth variant="outlined" size="small">
                    <Select
                      onChange={(e) => handleAnswerChange(11, e.target.value)}
                      required
                      value={result[10]?.answer || ''}
                      disabled={isDisabled}
                    >
                      {[
                        'Less then a month',
                        'Less then a quater',
                        `Less then a 6 month's`,
                        'More then a year',
                      ].map((option, optionIndex) => (
                        <MenuItem key={optionIndex} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[12]?.question}
                  </Box>
                  <FormGroup>
                    {['None', 'participants', 'Inside org', 'All'].map(
                      (option: any, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          disabled={isDisabled}
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
                      ),
                    )}
                  </FormGroup>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[13]?.question}
                  </Box>
                  <FormControl component="fieldset">
                    <RadioGroup>
                      {['Yes', 'No'].map((option: any, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={option}
                          disabled={isDisabled}
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
                  <Box
                    sx={{
                      typography: 'body1',
                      fontWeight: 'medium',
                      marginBottom: '8px',
                      fontSize: '16px',
                    }}
                  >
                    {questions[14]?.question}
                  </Box>
                  <FormControl component="fieldset" required>
                    <RadioGroup>
                      {['Yes', 'No'].map((option: any, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={option}
                          disabled={isDisabled}
                          control={
                            <Radio
                              required
                              checked={Boolean(result[14]?.options[option] || false)}
                              onChange={(e) =>
                                handleRadioBoxChange(questions[14].id, option, e.target.checked)
                              }
                            />
                          }
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          </React.Fragment>
        ) : null}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={() => handleBack()}
            sx={{ mr: 1 }}
            href="#"
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {/* {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={() => handleSkip()} sx={{ mr: 1 }}>
                  Skip
              </Button>
              )} */}
          <Button onClick={() => handleNext()}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default QuestionBank

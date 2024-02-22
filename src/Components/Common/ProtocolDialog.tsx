import React from 'react'
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Divider,
} from '@mui/material'
import { Formik as Formic, Form, Field, ErrorMessage } from 'formik'
import PopUp from './Dialog'
import { useRouter } from 'next/router'
import { useHomeContext } from '../../pages'
import { ICompliance, IDepartment } from '../../Utils/types/type'
import axiosInstance from '../../Utils/axiosUtil'
import { showMessage } from '../../Store/reducers/snackbar'
import { useDispatch } from 'react-redux'
import { initFormState } from '../../Store/reducers/form'

interface StyledErrorMessageProps {
  name: string
}

const StyledErrorMessage: React.FC<StyledErrorMessageProps> = ({ name }) => (
  <div style={{ color: 'red', fontSize: '14px' }}>
    <ErrorMessage name={name} />
  </div>
)
type FormValues = {
  name: string
  department: string
  title: string
  description: string
  reviewType: string
  protocolNumber: string
}

const initialValues: FormValues = {
  name: '',
  department: '',
  title: '',
  description: '',
  reviewType: '',
  protocolNumber: '',
}

interface IProps {
  complianceType: ICompliance | undefined
  handleClose: Function
  popOpen: boolean
  handleSubmit: Function
}

const ProtocolPopUp = (props: IProps): JSX.Element => {
  const homeContext = useHomeContext()
  const { departments } = homeContext
  const { complianceType, handleClose } = props
  const router = useRouter()
  const dispatch = useDispatch()

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {}
    if (values.title.length < 1) {
      errors.title = 'Required'
    }
    if (values.department.length < 1) {
      errors.department = 'Required'
    }
    if (values.description.length < 1) {
      errors.description = 'Required'
    }
    if (values.description.length > 512) {
      errors.description = 'Maximum 512 characters allowed'
    }
    if (!values.reviewType) {
      errors.reviewType = 'Required' // Add validation for reviewType
    }
    return errors
  }

  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    // Handle form submission logic here
    dispatch(initFormState())
    if (complianceType?.id) {
      const response: any = await axiosInstance.post('/protocol', {
        title: values.title,
        description: values.description,
        department: values.department,
        complianceId: complianceType.id,
        reviewType: values.reviewType,
        protocolNumber: values.protocolNumber || '',
        ruleId: parseInt(complianceType?.approvalRulesId || '-1'),
      })
      if (response.status < 300) {
        dispatch(showMessage({ message: 'Protocol is drafted', severity: 'success' }))
        handleClose()
        router.push(`/forms/${response?.data?._id.toString()}`)
      } else {
        dispatch(
          showMessage({ message: 'Somehitng went wrong, please try again', severity: 'error' }),
        )
      }
      setSubmitting(false)
    }
  }

  return (
    <PopUp title={`Create a new ${complianceType?.title || ''} protocol`} {...props}>
      <Formic initialValues={initialValues} validate={validateForm} onSubmit={handleSubmit}>
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Field name="name">
                {({ field }: any) => (
                  <TextField label={localStorage.getItem('name')} disabled fullWidth {...field} />
                )}
              </Field>
              <StyledErrorMessage name="name" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="department">
                {({ field }: any) => (
                  <FormControl fullWidth required>
                    <InputLabel>Department/Division</InputLabel>
                    <Select {...field} label="Department/Division*">
                      {departments?.map((dep: IDepartment, index: number) => (
                        <MenuItem value={dep.name} key={index.toString()}>
                          {dep.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <StyledErrorMessage name="department" />
            </Grid>
            <Grid item xs={12} sx={{ ml: 3 }}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Fill in the protocol details</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="reviewType">
                {({ field }: any) => (
                  <FormControl fullWidth required>
                    <InputLabel>Type of review requested</InputLabel>
                    <Select {...field} label="Type of review requested">
                      <MenuItem value="Exemption">Exemption from review</MenuItem>
                      <MenuItem value="Expedited">Expedited review</MenuItem>
                      <MenuItem value="Committee">Full committee review</MenuItem>
                    </Select>
                  </FormControl>
                )}
              </Field>
              <StyledErrorMessage name="reviewType" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="protocolNumber">
                {({ field }: any) => <TextField label="Protocol number" fullWidth {...field} />}
              </Field>
              <StyledErrorMessage name="title" />
            </Grid>
            <Grid item xs={12}>
              <Field name="title">
                {({ field }: any) => (
                  <TextField label="Title of the study" required fullWidth {...field} />
                )}
              </Field>
              <StyledErrorMessage name="title" />
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: '8px' }}>
              <Field name="description">
                {({ field }: any) => (
                  <TextField
                    inputProps={{ style: { height: '150px' } }}
                    label="Description"
                    fullWidth
                    required
                    multiline
                    {...field}
                  />
                )}
              </Field>
              <StyledErrorMessage name="description" />
            </Grid>
          </Grid>
          <Button type="submit" sx={{ marginTop: '16px' }}>
            Proceed
          </Button>
        </Form>
      </Formic>
    </PopUp>
  )
}

export default ProtocolPopUp

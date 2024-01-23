import React from 'react'
import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import { accessLevels } from '../../data/fixData'
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { IDepartment, RootState } from '../../Utils/types/type';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../Utils/axiosUtil';
import { showMessage } from '../../Store/reducers/snackbar';

interface IProps {
  departments: { data : Array<IDepartment>, total?: number}
}


const Register = ({ departments } : IProps) => {

  const [openSuccessBar, setOpenSuccessBar] = React.useState(false);
  const dispatch = useDispatch()


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      department: 1,
      departmentId: '',
      accessLevel: '',
      type: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),
      department: Yup
        .number()
        .required('Department is required')
        .oneOf(departments?.data?.map(({ id , ...rest}) => id), 'Invalid department selected'),
      accessLevel: Yup
        .string()
        .max(255)
        .required('Access Level is required')
        .oneOf(accessLevels, 'Invalid access level selected'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'This field must be checked'
        )
    }),
    onSubmit: async () => {
      try {
        const response = await axiosInstance.post('/user', {
          name: formik.values.name,
          email: formik.values.email,
          type: formik.values.accessLevel,
          password: formik.values.password,
          primaryDepartmentId: formik.values?.department,
          accessLevel: formik.values.accessLevel,
          isActive: true,
        })
        if(response.status < 300) {
          dispatch(showMessage({message: "User Added Successfully", severity: "success"}))
        }
      } catch (err) {
        dispatch(showMessage({message: "Something went wrong", severity: "error"}))
        console.error(err)
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Knowledge Link
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Create a new user
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                Use your email to create a new user
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.name && formik.errors.name)}
              fullWidth
              helperText={formik.touched.name && formik.errors.name}
              label="Name"
              margin="normal"
              name="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Grid container justifyContent="space-between">
              <Grid xs={12} md={5.5} sx={{marginTop: '16px', marginBottom: '8px'}}>
                <FormControl 
                  fullWidth
                  error={Boolean(formik.touched.departmentId && formik.errors.departmentId)}
                  >
                  <InputLabel>Select Department</InputLabel>
                  <Select
                    id="department"
                    name="department"
                    label="Select Department"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={departments?.data?.filter((d : any) => d?.id === formik.values.departmentId)[0]?.name}
                    >
                    {departments?.data?.map((option, optionIndex) => (
                      <MenuItem key={option?.id?.toString()} value={option?.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.departmentId && formik.errors.departmentId}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid xs={12} md={5.5} sx={{marginTop: '16px', marginBottom: '8px'}}>
                <FormControl
                  fullWidth
                  error={Boolean(formik.touched.accessLevel && formik.errors.accessLevel)}
                  >
                  <InputLabel id="accessLevelLabel">Select Access Level</InputLabel>
                  <Select
                    labelId='accessLevelLabel'
                    id="accessLevel"
                    label="Select Access Level"
                    name="accessLevel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.accessLevel}
                    >
                    {accessLevels.map((option, index: number) => (
                      <MenuItem key={index.toString()} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {formik.touched.accessLevel && formik.errors.accessLevel}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                I have read the
                {' '}
                <NextLink
                  href="#"
                  passHref
                >
                  Terms and Conditions
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Register Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>


      <Snackbar open={openSuccessBar} autoHideDuration={2000} onClose={() => setOpenSuccessBar(false)}>
        <Alert onClose={() => setOpenSuccessBar(false)} severity="success">
          User created successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;

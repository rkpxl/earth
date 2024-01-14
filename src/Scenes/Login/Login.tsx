import React, { Suspense } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios'
import { parseJwt } from '../../Utils/signin';
import { setCookie } from '../../Utils/cookieUtils';


const Login = () => {
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: () => {
      setIsLoading(true)
      axios.post(process.env.NEXT_PUBLIC_HOST_URL + '/auth/signin', {
        email: formik.values.email,
        password: formik.values.password
      })
        .then((response) => {
          // Handle the response
          setIsLoading(false)
          const token = response.data.data.token;
          const user : any = parseJwt(token)

          // Decode the payload from base64
          // Store the token in local storage or a secure HTTP-only cookie
          localStorage.setItem('name', user.name);
          localStorage.setItem('primartDepartment', user?.primartDepartment);
          localStorage.setItem('org', user?.org);
          localStorage.setItem('orgId', user?.orgId);
          localStorage.setItem('email', user?.email);
          localStorage.setItem('exp', user?.exp);
          localStorage.setItem('_id', user._id);
          localStorage.setItem('type', user?.type);
          localStorage.setItem('authToken', token);

          setCookie('name', user.name);
          setCookie('primaryDepartment', user?.primaryDepartment);
          setCookie('org', user?.org);
          setCookie('orgId', user?.orgId);
          setCookie('email', user?.email);
          setCookie('exp', user?.exp);
          setCookie('_id', user._id);
          setCookie('type', user?.type);
          setCookie('authToken', token);

          router.push('/').catch(console.error);
        })
        .catch((error) => {
          setError('An error occurred during login.');
          setIsLoading(false)
          formik.resetForm();
          console.error(error);
        });
    }
  });

  const handleGoogleSubmit =  () => {}

  const handleFBSubmit =  () => {}

  return (
    <Suspense fallback={<CircularProgress />}>
      <Head>
        <title>Login</title>
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
                Sign in
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2" 
              >
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  // startIcon={<FacebookIcon />}
                  onClick={handleFBSubmit}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="error"
                  fullWidth
                  onClick={handleGoogleSubmit}
                  size="large"
                  // startIcon={<GoogleIcon />}
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with email address
              </Typography>
              {error && <Typography color="error" variant="body2">{error}</Typography>}
            </Box>
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
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {isLoading ? <CircularProgress size="27px" sx={{ color: '#5048E5' }}/> : 'Sign In Now'}
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don&apos;t have an account?
              {' '}
            </Typography>
          </form>
        </Container>
      </Box>
    </Suspense>
  );
};

export default Login;

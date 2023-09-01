import { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, CardHeader, Divider, Snackbar, TextField } from '@mui/material';
import axios from 'axios';

const PasswordChange = (props : any) => {
  const [values, setValues] = useState({
    password: '',
    confirm: '',
    previous: '',
  });

  const [openIncorrectInput, setOpenIncorrectInput] = useState(false);
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [errorMessage, setErrorMessage] = useState(`Both input isn't equal`);

  const handleIncorrectInput = () => {
    setOpenIncorrectInput(true);
    setTimeout(() => {
      setOpenIncorrectInput(false);
    }, 5000); // Close the Snackbar after 2 seconds
  };

  const handleSuccess = () => {
    setOpenSuccessBar(true);
    setTimeout(() => {
      setOpenSuccessBar(false);
    }, 5000); // Close the Snackbar after 2 seconds
  };


  const handleChange = (event : any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleUpdate = () => {
    if(values.password !== values.confirm) {
      handleIncorrectInput()
    } else {
      axios.put(process.env.NEXT_PUBLIC_HOST_URL + '/users/updatePassword', {
        email: localStorage.getItem('email'),
        password: values.password,
        previousPassword: values.previous,
      }).then((response) => {
        if(response.status < 300) {
          handleSuccess()
        }
      }).catch((e) => {
        console.log(e)
        setErrorMessage(e.response.data.message)
        handleIncorrectInput()
      })
    }
  }

  return (
    <>
      <form {...props}>
        <Card>
          <CardHeader
            subheader="Update password"
            title="Password"
          />
          <Divider />
          <CardContent>
            <TextField
              fullWidth
              label="Previous Password"
              margin="normal"
              name="previous"
              onChange={handleChange}
              type="password"
              value={values.previous}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm password"
              margin="normal"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
              variant="outlined"
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleUpdate}
            >
              Update
            </Button>
          </Box>
        </Card>
      </form>
      <Snackbar open={openIncorrectInput} autoHideDuration={5000} onClose={() => setOpenIncorrectInput(false)}>
        <Alert onClose={() => setOpenIncorrectInput(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccessBar} autoHideDuration={5000} onClose={() => setOpenSuccessBar(false)}>
        <Alert onClose={() => setOpenSuccessBar(false)} severity="success">
          Woww!!, your password is updated
        </Alert>
      </Snackbar>
    </>
  );
};


export default PasswordChange;
import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Snackbar,
  TextField,
} from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import { parseJwt } from '../../Utils/signin'
import axiosInstance from '../../Utils/axiosUtil'
import { showMessage } from '../../Store/reducers/snackbar'
import { useDispatch } from 'react-redux'

const PasswordChange = (props: any) => {
  const [values, setValues] = useState({
    password: '',
    confirm: '',
    previous: '',
  })

  const [openIncorrectInput, setOpenIncorrectInput] = useState(false)
  const [openSuccessBar, setOpenSuccessBar] = useState(false)
  const [errorMessage, setErrorMessage] = useState(`Both input isn't equal`)
  const [token, setToken] = useState<any>(null)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleIncorrectInput = () => {
    setOpenIncorrectInput(true)
    setTimeout(() => {
      setOpenIncorrectInput(false)
    }, 5000) // Close the Snackbar after 2 seconds
  }

  const handleSuccess = () => {
    setOpenSuccessBar(true)
    setTimeout(() => {
      setOpenSuccessBar(false)
    }, 5000) // Close the Snackbar after 2 seconds
  }

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  useEffect(() => {
    const { token } = router.query
    if (token) {
      axios
        .get(process.env.NEXT_PUBLIC_HOST_URL + '/auth/validate-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {})
        .catch((err) => {
          setErrorMessage('Please generate url again, your session is expired')
          handleIncorrectInput()
          console.error(err)
        })
      setToken(token)
    }
  }, [router.query])

  const handleUpdate = async () => {
    if (values.password !== values.confirm) {
      handleIncorrectInput()
    } else {
      if (token) {
        const user: any = parseJwt(token)
        try {
          const response = await axiosInstance.put(
            '/user/update-reset-password',
            {
              email: user.email,
              password: values.password,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )

          if (response.status < 300) {
            dispatch(showMessage({ message: 'Updated Successfully', severity: 'success' }))
            router.push('/')
          }
        } catch (err) {
          console.error(err)
        }
      } else {
        axios
          .put(process.env.NEXT_PUBLIC_HOST_URL + '/users/updatePassword', {
            email: localStorage.getItem('email'),
            password: values.password,
            previousPassword: values.previous,
          })
          .then((response) => {
            if (response.status < 300) {
              handleSuccess()
            }
          })
          .catch((e) => {
            console.error(e)
            setErrorMessage(e.response.data.message)
            handleIncorrectInput()
          })
      }
    }
  }

  return (
    <>
      <form {...props}>
        <Card>
          <CardHeader subheader={token ? 'Reset Password' : 'Update password'} title="Password" />
          <Divider />
          <CardContent>
            {!token ? (
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
            ) : null}
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
              p: 2,
            }}
          >
            <Button color="primary" variant="contained" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Card>
      </form>
      <Snackbar
        open={openIncorrectInput}
        autoHideDuration={5000}
        onClose={() => setOpenIncorrectInput(false)}
      >
        <Alert onClose={() => setOpenIncorrectInput(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessBar}
        autoHideDuration={5000}
        onClose={() => setOpenSuccessBar(false)}
      >
        <Alert onClose={() => setOpenSuccessBar(false)} severity="success">
          Woww!!, your password is updated
        </Alert>
      </Snackbar>
    </>
  )
}

export default PasswordChange

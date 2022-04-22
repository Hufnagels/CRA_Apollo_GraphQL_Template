import React, { useState, useContext, } from 'react';
import { useFormik, } from 'formik';
import * as yup from 'yup';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'

// Material
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

// Custom
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../app/queries";
import { authContext } from "../../app/context/authContext"

const validationSchema = yup.object({
  // username: yup
  //   .string('Enter your username')
  //   .min(2, 'Too Short!')
  //   .max(20, 'Too Long!')
  //   .required('Required'),
  firstName: yup
    .string('Enter your First name')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: yup
    .string('Enter your Last name')
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  date_of_birth: yup
    .date()
    .nullable(),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});


const SignUp = () => {
  const navigate = useNavigate()
  const context = useContext(authContext)
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);

  const { enqueueSnackbar } = useSnackbar();
  const [dateOfBirth, setDateOfBirth] = useState(new Date())

  const formik = useFormik({
    initialValues: {
      // "username": '',
      "firstName": '',
      "lastName": '',
      "date_of_birth": '',
      "email": '',
      "password": '',
      "passwordConfirmation": '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.date_of_birth = dateOfBirth.toISOString()
      const newData = _.omit(values, 'passwordConfirmation')
      createUser(
        {
          variables: { input: newData }
        }
      ).then((res) => {
        console.log('createUser promise', res.data.createUser)
        context.login(res.data.createUser)
        //const variant = 'success'
        //enqueueSnackbar('User created successfully', { variant })
        navigate('/')
        console.log('createUser setUsers')
      }).catch((err) => {
        //console.log('createUser catch err', err.message)
        const variant = 'error'
        enqueueSnackbar(err.message, { variant })
      })
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {/*component="form" noValidate onSubmit={handleSubmit}*/}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  autoFocus
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  type="text"
                  variant="standard"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  autoFocus
                  margin="dense"
                  id="firstName"
                  name="firstName"
                  label="First name"
                  type="text"

                  variant="standard"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <MobileDatePicker
                  label="Date of birth"
                  value={dateOfBirth}
                  minDate={new Date('1940-01-01')}
                  maxDate={new Date()}
                  format="yyyy/MM/dd"
                  onChange={(newValue) => {
                    setDateOfBirth(newValue)
                    //formik.handleChange(newValue)
                  }}
                  renderInput={(params) =>
                    <TextField
                      id="date_of_birth"
                      name="date_of_birth"
                      margin="dense"
                      variant="standard"
                      value={dateOfBirth}
                      onChange={formik.handleChange}
                      error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                      helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                      {...params}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoFocus
                  margin="dense"
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"

                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="standard"

                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  variant="standard"
                  margin="dense"
                  value={formik.values.passwordConfirmation}
                  onChange={formik.handleChange}
                  error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                  helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                />
              </Grid>
              {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">Already have an account? Sign in</Link>
              </Grid>
            </Grid>
          </Box>

        </form>
      </Box>
    </Container>
  );
}

export default SignUp
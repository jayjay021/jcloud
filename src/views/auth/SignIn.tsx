import React from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { auth } from 'config/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import {
  Box,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Divider,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { LocationState } from 'types/LocationType';
import { LockOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/system';

export default function SignIn() {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const theme = useTheme();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { ref: emailRef, ...emailProps } = register('email', {
    required: { value: true, message: 'required' },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'invalid email',
    },
  });

  const { ref: passwordRef, ...passwordProps } = register('password', {
    required: { value: true, message: 'required' },
    minLength: { value: 6, message: 'too short' },
  });

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const { from } = location.state || { from: { pathname: '/' } };
      history.push(from.pathname);
    } catch (e) {}
  };

  return (
    <Container maxWidth='xs'>
      <Paper sx={{ p: 2 }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            sx={{
              margin: 1,
              backgroundColor: 'secondary.main',
            }}
          >
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <GoogleLoginButton
            style={{
              margin: '0px',
              marginTop: '10px',
              width: '100%',
              height: '40px',
            }}
            onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider())
                .then((result) => {
                  const { from } = location.state || {
                    from: { pathname: '/' },
                  };
                  history.replace(from);
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          />
          <FacebookLoginButton
            style={{
              margin: '0px',
              marginTop: '10px',
              width: '100%',
              height: '40px',
            }}
            onClick={() => {
              signInWithPopup(auth, new FacebookAuthProvider())
                .then((result) => {
                  const { from } = location.state || {
                    from: { pathname: '/' },
                  };
                  history.replace(from);
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          />
          <Divider
            variant='middle'
            style={{ marginTop: '30px', width: '100%' }}
          />
          <Typography
            sx={{
              margin: `5px 0 0 ${theme.spacing(0)}px`,
            }}
            color='textSecondary'
            display='block'
            variant='caption'
          >
            Or
          </Typography>
          <form
            style={{
              width: '100%', // Fix IE 11 issue.
              marginTop: theme.spacing(1),
            }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              {...emailProps}
              inputRef={emailRef}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
            />
            <TextField
              {...passwordProps}
              inputRef={passwordRef}
              error={!!errors.password}
              helperText={errors.password?.message}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{
                margin: theme.spacing(3, 0, 2),
              }}
            >
              Sign In
            </Button>
          </form>
          <Grid container>
            <Grid item xs>
              <Link
                component='button'
                onClick={(e) => {
                  e.preventDefault();
                  history.replace('/auth/forgot');
                }}
                variant='body2'
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component='button'
                onClick={(e) => {
                  e.preventDefault();
                  history.push('/auth/signup', location.state || '/');
                }}
                variant='body2'
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth } from 'config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { LocationState } from 'types/LocationType';
import { useTheme } from '@mui/system';
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Box,
  Paper,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';

export default function SignUp() {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<{ email: string; password: string; repeatPassword: string }>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
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
  const { ref: repeatPasswordRef, ...repeatPasswordProps } = register(
    'repeatPassword',
    {
      required: { value: true, message: 'required' },
      validate: {
        missmatch: (value) => value === watch('password'),
      },
    }
  );

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const { from } = location.state || { from: { pathname: '/' } };
      history.replace(from);
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
            Sign up
          </Typography>
          <form
            style={{
              width: '100%', // Fix IE 11 issue.
              marginTop: theme.spacing(3),
            }}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...emailProps}
                  inputRef={emailRef}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  variant='outlined'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...passwordProps}
                  inputRef={passwordRef}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  variant='outlined'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...repeatPasswordProps}
                  inputRef={repeatPasswordRef}
                  error={!!errors.repeatPassword}
                  helperText={
                    errors.repeatPassword?.message ||
                    errors.repeatPassword?.type === 'missmatch'
                      ? 'password does not match'
                      : null
                  }
                  variant='outlined'
                  required
                  fullWidth
                  name='repeatPassword'
                  label='Repeat password'
                  type='password'
                  id='repeatPassword'
                  autoComplete='repeatPassword'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{
                margin: theme.spacing(3, 0, 2),
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  component='button'
                  onClick={(e) => {
                    e.preventDefault();
                    history.push('/auth/signin', location.state || '/');
                  }}
                  variant='body2'
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  );
}

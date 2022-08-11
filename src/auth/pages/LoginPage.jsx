import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField } from "@mui/material"

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const formData = {
  email: '',
  password: '',
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const isAuthenticated = useMemo( () => status === 'checking', [status] );

  const {email, password, onInputChange} = useForm(formData);

  const onSubmit = (e) => {
    e.preventDefault();
    
    dispatch(startLoginWithEmailPassword({email, password}));

  }

  const onGoogleSignIn = () => {

    dispatch(startGoogleSignIn());

  }


  return (

    <AuthLayout title="Login">
      <form 
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
        >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Correo" 
              type="email"
              name='email'
              onChange={onInputChange}
              value={email}
              placeholder="correo@google.com" 
              fullWidth />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Contraseña" 
              type="password" 
              name='password'
              onChange={onInputChange}
              value={password}
              placeholder="12345abc" 
              fullWidth />
          </Grid>

          <Grid 
            container 
            sx={{mt:1}}
            display={!!errorMessage ? 'block' : 'none'}>
            <Grid 
              item 
              xs={12}
              >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sx={{ mt: 1 }} sm={6}>
              <Button 
                type='submit' 
                variant='contained' 
                fullWidth
                disabled={isAuthenticated}
                >
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }} sm={6}>
              <Button 
                onClick={onGoogleSignIn} 
                variant='contained' 
                disabled={isAuthenticated}
                fullWidth
                >
                <Google />
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

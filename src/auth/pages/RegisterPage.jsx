import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { startCreateUserWithEmailPassword } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const formData = {
  email: '',
  password: '',
  displayName: '',
}

const formValidation = {
  email: [(value) => value.includes('@') , 'EL correo debe tener una @'],
  password: [(value) => value.length >= 6 , 'La contraseña debe tener al menos 6 caracteres.'],
  displayName: [(value) => value.length >= 3 , 'El nombre debe tener al menos 3 caracteres.'],
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuth = useMemo(() => status === 'checking', [status]);

  const { displayName, email, password,  formState, onInputChange, onResetForm,
          displayNameValid, emailValid, passwordValid, isFormValid } = useForm(formData, formValidation);

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreateUserWithEmailPassword(formState));

  }

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Nombre completo" 
              type="text" 
              placeholder="Juanito Perez" 
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@gmail.com" 
              fullWidth 
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="12345abc" 
              fullWidth 
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid 
              item 
              xs={12}
              sx={{mt:1}}
              display={!!errorMessage ? '' : 'none'}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Button
                type='submit'
                variant='contained' 
                fullWidth
                disabled={isCheckingAuth}
                >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

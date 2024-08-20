// ** React Imports
"use client";
import { useState, ChangeEvent, FormEvent } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'
import { isEmail, isLength } from 'validator'

import getConfig from 'next/config'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import MuiFormControlLabel from '@mui/material/FormControlLabel'



// ** Layout Import
import BlankLayout from  "@/components/ui/BlankLayout";



// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const LoginPage = () => {
  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const [error, setError] = useState<string>('')

 

  const validateFields = (): boolean => {
    let isValid = true

    setEmailError('')
    setPasswordError('')

    // Valider le champ email
    if (email.trim() === '') {
      setEmailError('Email is required')
      isValid = false
    } else if (!isEmail(email)) {
      setEmailError('Invalid email format')
      isValid = false
    }

    // Valider le champ password
    if (password.trim() === '') {
      setPasswordError('Password is required')
      isValid = false
    } else if (!isLength(password, { min: 8, max: 20 })) {
      setPasswordError('Password must be between 8 and 20 characters')
      isValid = false
    }

    return isValid
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={`/images/logos/idlynx_logo.svg`} alt='logo' style={{ width: '30%', height: 'auto' }} />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to ! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>

          <form noValidate autoComplete='off' >
            <TextField
              required
              autoFocus
              fullWidth
              id='email'
              label='Email'
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
              sx={{ marginBottom: 4 }}
            />

            <FormControl fullWidth>
              <TextField
                required
                name='password'
                id='password'
                value={password}
                label='Password'
                type='password'
                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
              />
            </FormControl>
            {error && <Typography color='error'>{error}</Typography>}

            <Button fullWidth type='submit' size='large' variant='contained' sx={{ marginTop: 7 }}>
              Login
            </Button>
            <Box sx={{ marginTop: 3, textAlign: 'center' }}>
              <Link href='/pages/forget-password' passHref>
                <LinkStyled>Forgot Password?</LinkStyled>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    
    </Box>
  )
}
LoginPage.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage

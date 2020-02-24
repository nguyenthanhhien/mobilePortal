import React, { Component } from 'react';
import './signIn.scss'
import { Container, CssBaseline, Avatar, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import i18next from "i18next";
import background from './../../assets/imgs/background.png'

const useStyles = makeStyles(theme => ({
  pageContainer: {
    height: '100%',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    '& >div': {
      padding: '1rem 8% 2rem',
      borderRadius: '0.2rem',
      backgroundColor: '#fcfcfc',
      WebkitBoxShadow: '0px 0px 7px -1px rgba(140, 137, 138, 1)',
      MozBoxShadow: '0px 0px 7px -1px rgba(140, 137, 138, 1)',
      boxShadow: '0px 0px 7px -1px rgba(140, 137, 138, 1)',
    },
  },
  avatar: {
    margin: '0.5rem auto',
    backgroundColor: '#FE4A49'
  },
  loginBtn: {
    marginTop: '1rem',
    backgroundColor: '#FE4A49',
    padding: '0.8rem 1.6rem',
    color: 'white'
  },
  mainText: {
    // fontWeight: 'bold'
  },
  appName: {
    color: '#001730',
    textAlign: 'center',
    fontWeight: 'bold',
    
  },
  textInput: {
    // '& input:valid + fieldset': {
    //   borderColor: '#4AD7D1',
    // },
    // '& input:invalid + fieldset': {
    //   borderColor: 'red',
    // },
    '& input:focus + fieldset': {
      borderColor: '#4AD7D1'
    },
    '& input:valid:focus + fieldset': {
      borderColor: '#4AD7D1'
    },
  }

}))

export default function SignIn() {
  const classes = useStyles()
  return (
    <div className={classes.pageContainer}>
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={[classes.appName, classes.mainText].join(' ')} component="h1" variant="h5">
            {i18next.t('MENU.DEALER_CONFIGURATION')}
          </Typography>
          <Typography className={classes.appName} component="h1" variant="h5">
            {i18next.t('MENU.MANAGEMENT')}
          </Typography>
          <form noValidate>
            <TextField className={classes.textInput}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label={i18next.t('LOGIN.USERNAME')}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField className={classes.textInput}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name={i18next.t('LOGIN.PASSWORD')}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button className={classes.loginBtn}
              type="submit"
              fullWidth
              variant="contained"
            >
              {i18next.t('LOGIN.LOGIN_TEXT')}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )

}
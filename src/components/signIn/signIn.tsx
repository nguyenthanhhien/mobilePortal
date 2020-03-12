import React, { Component, useState } from 'react';
import './signIn.scss'
import { Container, CssBaseline, Avatar, Typography, TextField, Button, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import i18next from "i18next";
import background from './../../assets/imgs/background.png'
import { authService } from './../../services/authService';
import { AuthModel } from './../../models/models'
import { useForm } from "react-hook-form";
import { ErrorMessage, ToastTemplate, PresentToast } from './../utils/commonComp'
import * as constant from './../../services/constant'
import { toast } from 'react-toastify';

import axios from 'axios';
// import 'react-toastify/dist/ReactToastify.css';

// import { commonService } from './../../services/commonService'

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

export default function SignIn(props: any) {
  const classes = useStyles()

  const { register, setValue, handleSubmit, errors } = useForm<AuthModel>();
  const onSubmit = handleSubmit(({ Username, Password, CommonServerName }) => {
    authService.login(CommonServerName, Username, Password).then(
      result => {
        if(result){
          if (result == constant.loginStatus.Success) {

            const { from } = props.location.state || { from: { pathname: "/dealers" } };
            props.history.push(from);
          }
          else if (result == constant.loginStatus.NoPermission) {
            PresentToast(i18next.t('LOGIN.UNAUTHENTICATED_DEALER'), toast.TYPE.WARNING)
          }
          else {
            PresentToast(i18next.t('LOGIN.INVALID_LOGIN'), toast.TYPE.WARNING)
          }
        }
      }
    )
    .catch(error => {
      
    });
  });

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
          <form>
            <TextField className={classes.textInput}
              variant="outlined"
              margin="normal"
              fullWidth
              label={i18next.t('LOGIN.SERVER_NAME')}
              autoComplete="email"
              autoFocus
              name="CommonServerName" inputRef={register({ required: true })}
            />

            {errors.CommonServerName && (<ErrorMessage inputText={i18next.t('LOGIN.SERVER_NAME_REQUIRED_MES')} />)}
            <TextField className={classes.textInput}
              variant="outlined"
              margin="normal"
              fullWidth
              label={i18next.t('LOGIN.USERNAME')}
              autoComplete="email"
              autoFocus
              name="Username" inputRef={register({ required: true })}
            />
            {errors.Username && (<ErrorMessage inputText={i18next.t('LOGIN.USERNAME_REQUIRED_MES')} />)}
            <TextField className={classes.textInput}
              variant="outlined"
              margin="normal"
              fullWidth
              label={i18next.t('LOGIN.PASSWORD')}
              type="password"
              autoComplete="current-password"
              name="Password" inputRef={register({ required: true })}
            />
            {errors.Password && (<ErrorMessage inputText={i18next.t('LOGIN.PASSWORD_REQUIRED_MES')} />)}
            <Button className={classes.loginBtn}
              type="submit"
              fullWidth
              variant="contained"
              onClick={onSubmit}
            >
              {i18next.t('LOGIN.LOGIN_TEXT')}
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )

}
import React, { Component, useState, useContext } from 'react';
import './signIn.scss'
import { Container, CssBaseline, Avatar, Typography, TextField, Button, Input } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import i18next from "i18next";
import { authService } from './../../services/authService';
import { AuthModel } from './../../models/models'
import { useForm } from "react-hook-form";
import { ErrorMessage, PresentToast } from './../utils/commonComp'
import * as constant from './../../services/constant'
import { toast } from 'react-toastify';
import LoadingContext from './../context/loadingContext'
import * as commonService from './../../services/commonService'

export default function SignIn(props: any) {
  const { showLoading, dismissLoading } = useContext(LoadingContext)
  const { register, setValue, handleSubmit, errors } = useForm<AuthModel>();
  const onSubmit = handleSubmit(({ Username, Password, CommonServerName }) => {
    showLoading()
    authService.login(CommonServerName, Username, Password).then(
      result => {
        dismissLoading()
        if (result) {
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
        dismissLoading()
        commonService.handleErrorResponse(error)
      });
  });

  return (
    <div className="component-sign-in">
      {/* <LoadingProvider>
        <Spinner /> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography className="title" component="h2" variant="h5">
              {i18next.t('MENU.DEALER_CONFIGURATION')}
            </Typography>
            <Typography className="title" component="h2" variant="h5">
              {i18next.t('MENU.MANAGEMENT')}
            </Typography>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label={i18next.t('LOGIN.SERVER_NAME')}
                autoComplete="email"
                autoFocus
                name="CommonServerName" inputRef={register({ required: true })}
              />

              {errors.CommonServerName && (<ErrorMessage inputText={i18next.t('LOGIN.SERVER_NAME_REQUIRED_MES')} />)}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label={i18next.t('LOGIN.USERNAME')}
                autoComplete="email"
                autoFocus
                name="Username" inputRef={register({ required: true })}
              />
              {errors.Username && (<ErrorMessage inputText={i18next.t('LOGIN.USERNAME_REQUIRED_MES')} />)}
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                label={i18next.t('LOGIN.PASSWORD')}
                type="password"
                autoComplete="current-password"
                name="Password" inputRef={register({ required: true })}
              />
              {errors.Password && (<ErrorMessage inputText={i18next.t('LOGIN.PASSWORD_REQUIRED_MES')} />)}
              <Button
                type="submit"
                variant="contained"
                onClick={onSubmit}
              >
                {i18next.t('LOGIN.LOGIN_TEXT')}
              </Button>
            </form>
          </div>
        </Container>
      {/* </LoadingProvider> */}
    </div>
  )

}
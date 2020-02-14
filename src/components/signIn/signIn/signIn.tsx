import React, { Component } from 'react';
import './signIn.scss'
import { Container, CssBaseline, Avatar, Typography, TextField, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import i18next from "i18next";

export default class SignIn extends Component {
  render() {
    return (
      <div className="component-sign-in">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {i18next.t('LOGIN.LOGIN_TEXT')}
            </Typography>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                {i18next.t('LOGIN.LOGIN_TEXT')}
              </Button>
            </form>
          </div>
        </Container>
      </div>
    )
  }
}
import React, { Component } from 'react';
import './login.scss'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  FormHelperText,
  TextField,
  Paper,
  Grid,
  Container,
  Avatar,
  Link,
  Typography
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import i18next from "i18next";

export default class Login extends Component {
  render() {
    return (
      <div className="page-login">
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
                Sign In
          </Button>
            </form>
          </div>
        </Container>
      </div>
    )
  }
}
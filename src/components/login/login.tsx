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
    const theme = createMuiTheme({
      overrides: {
        // Style sheet name ⚛️
        MuiButton: {
          // Name of the rule
          text: {
            // Some CSS
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          },
        },
        MuiInput: {
          underline: {
            color: 'red',
            '&:hover:not($disabled):after': {
              borderBottom: '2px solid red',
            },
            '&:hover:not($disabled):before': {
              borderBottom: '2px solid red',
            },
            '&:after': {
              borderBottom: '2px solid red',
            },
          }
        },
        MuiFormLabel: {
          root: {
            "&$focused": {
              color: "tomato",
              fontWeight: "bold"
            }
          },

          focused: {}
        }
      },
    });

    const useStyles = makeStyles(theme => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));
    // const classes = useStyles();
    return (
      <div className="page-login">
        {/* <ThemeProvider theme={theme}>
          
        </ThemeProvider> */}
        {/* <Grid container direction="row" justify="center" alignItems="center">
            <Grid item lg={3} md={5} xs={8}>
              <Paper>
                <span className="login-text">{i18next.t('LOGIN.LOGIN_TEXT')}</span>
                <form className="login-form" noValidate autoComplete="off">
                  <div>
                    <TextField required label={i18next.t('LOGIN.USERNAME')} id="username" />
                    <TextField required label={i18next.t('LOGIN.PASSWORD')} id="password" type="password" />
                    <Button>Login</Button>
                  </div>
                </form>
              </Paper>
            </Grid>
          </Grid> */}
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
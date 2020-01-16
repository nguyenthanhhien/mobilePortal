import React, { Component } from 'react';
import './login.scss'
import { Box, FormControl, InputLabel, Input, FormHelperText, TextField, Paper, Grid } from '@material-ui/core';

export default class Login extends Component {
  render() {
    return (
      <div className="page-login">
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item lg={3} md={5} xs={8}>
            <Paper>
              <form className="login-form" noValidate autoComplete="off">
                <div>
                  <TextField required label="Username" id="username" />
                  <TextField required label="Password" id="password" type="password"/>
                </div>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}
import React, { Component, useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
    Backdrop, TextField, Fade, Container, CssBaseline, Avatar, Typography, Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Checkbox, FormControlLabel
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import i18next from "i18next";
import { ErrorMessage } from './../utils/commonComp'
import CloseIcon from '@material-ui/icons/Close';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import {
    BaseObjectManagementModel,
    DealerApplicationConfigurationModel
} from './../../models/models'

const useStyles = makeStyles((theme: Theme) =>
    ({
        container: {
            padding: '0',
            '& >div': {
                padding: '1rem 8% 2rem',
                borderRadius: '0.2rem',
                backgroundColor: '#fcfcfc',
                WebkitBoxShadow: '0px 0px 7px -1px rgba(140, 137, 138, 1)',
                MozBoxShadow: '0px 0px 7px -1px rgba(140, 137, 138, 1)',
                boxShadow: '0px 0px 7px -1px rgba(140, 137, 138, 1)',
            },
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        textInput: {
            '& input:focus + fieldset': {
                borderColor: '#4AD7D1'
            },
            '& input:valid:focus + fieldset': {
                borderColor: '#4AD7D1'
            },
        },
        closeBtn: {
            float: "right"
        }
    }),
);

interface DialogDataModel extends React.Props<any> {
    Open: boolean
    HandleClose: () => void
    DataObject?: DealerApplicationConfigurationModel
}

export default function AddEditDealerApplicationConfig(props: DialogDataModel) {
    const classes = useStyles();
    console.log(props.DataObject)
    const { register, setValue, handleSubmit, errors } = useForm<DealerApplicationConfigurationModel>({
        defaultValues: {
            DealerId: props.Open ? "success" : "fail",
            Application: "1",
            AllowAccess: "d",
            DeviceId: "sd",
            DealerApplicationConfigurationKey: 1,
            DeviceDescription: "sfsdf",
            ExpiredDate: new Date()
        }
    });
    //const { register, setValue, handleSubmit, errors } = useForm<DealerApplicationConfigurationModel>();
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleDateChange = (date: any) => {
    };

    const onSubmit = handleSubmit(({ DealerId, Application, AllowAccess, DeviceId, DeviceDescription, ExpiredDate, DealerApplicationConfigurationKey }) => {

    })
    // if (props.Open) {
    //     setValue("DealerId", "Set value by action");
    // }
    useEffect(() => {
        if(props.Open)
            setTimeout(() => setValue("DealerId", "123"))
      }, [setValue, props])
    return (
        <Dialog open={props.Open} onClose={props.HandleClose} aria-labelledby="form-dialog-title" maxWidth={"md"}>
            <DialogTitle id="form-dialog-title">
                Subscribe
                <IconButton onClick={props.HandleClose} className={classes.closeBtn}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form>
                    <Grid container alignItems={"center"}>
                        <Grid item md={6} xs={12}>
                            <TextField className={classes.textInput}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={i18next.t('DEALER_MANAGEMENT.DEALER_ID')}
                                autoFocus
                                name="DealerId" inputRef={register({ required: true })}
                            />
                            {errors.DealerId && (<ErrorMessage inputText={i18next.t('LOGIN.SERVER_NAME_REQUIRED_MES')} />)}

                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField className={classes.textInput}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={i18next.t('DEALER_MANAGEMENT.APPLICATION')}
                                autoFocus
                                name="Application" inputRef={register({ required: true })}
                            />
                            {errors.Application && (<ErrorMessage inputText={i18next.t('LOGIN.USERNAME_REQUIRED_MES')} />)}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField className={classes.textInput}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={i18next.t('DEALER_MANAGEMENT.DEVICE_ID')}
                                name="DeviceId" inputRef={register()}
                            />

                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField className={classes.textInput}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={i18next.t('DEALER_MANAGEMENT.DEVICE_DESCRIPTION')}
                                autoComplete="current-password"
                                name="DeviceDescription" inputRef={register()}
                            />

                        </Grid>
                        <Grid item md={6} xs={12}>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label={i18next.t('DEALER_MANAGEMENT.EXPIRIED_DATE')}
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                fullWidth
                                InputAdornmentProps={{ position: "start" }}
                                onChange={date => handleDateChange(date)}
                                name="ExpiredDate"
                                inputRef={register()}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked
                                        value="checkedB"
                                        color="primary"
                                        name="AllowAccess"
                                    />
                                }
                                label="Primary"
                            />
                        </Grid>
                    </Grid>
                </form>

            </DialogContent>
            <DialogActions>
                <Button color="primary" type="button" onClick={() => {
                    setValue("DealerId", "Set value by action");
                }}>
                    {i18next.t('COMMON.SAVE')}
                </Button>
                <Button color="primary">
                    {i18next.t('COMMON.CANCEL')}
                </Button>
            </DialogActions>
        </Dialog>
    );

}
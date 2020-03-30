import React, { Component, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
    TextField, Button,
    Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Checkbox, FormControlLabel
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import i18next from "i18next";
import { ErrorMessage, PresentToast } from './../utils/commonComp'
import CloseIcon from '@material-ui/icons/Close';
import { KeyboardDatePicker } from "@material-ui/pickers";
import {
    DealerApplicationConfigurationModel
} from './../../models/models'
import { dealerApplicationConfigurationService } from './../../services/dealerApplicationConfigurationService';
import { toast } from 'react-toastify';
import * as commonService from './../../services/commonService'

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
    HandleClose: (isUpdated?: boolean) => void
    DataObject?: DealerApplicationConfigurationModel,
    Key?: number
}

export default function AddEditDealerApplicationConfig(props: DialogDataModel) {
    const classes = useStyles();
    const { register, setValue, handleSubmit, errors, watch } = useForm<DealerApplicationConfigurationModel>();
    const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(null)
    const handleDateChange = (date: any) => {
        setSelectedDate(date)
    };

    const [checked, setChecked] = React.useState(false)
    const allowAccessChange = (event: any) => {
        setChecked(event.target.checked)
    };

    const addData = (data: DealerApplicationConfigurationModel) => {
        dealerApplicationConfigurationService.add(data)
            .then(res => {
                if (res) {
                    PresentToast(res, toast.TYPE.WARNING)
                }
                else {
                    PresentToast(i18next.t('DEALER_MANAGEMENT.ADD_SUCCESSFUL_MES'), toast.TYPE.SUCCESS)
                    props.HandleClose(true)
                }
            })
            .catch(error => commonService.handleErrorResponse(error));
    }

    const updateData = (data: DealerApplicationConfigurationModel) => {
        dealerApplicationConfigurationService.update(data)
            .then(res => {
                if (res) {
                    PresentToast(res, toast.TYPE.WARNING)
                }
                else {
                    PresentToast(i18next.t('DEALER_MANAGEMENT.UPDATE_SUCCESSFUL_MES'), toast.TYPE.SUCCESS)
                    props.HandleClose(true)
                }
            })
            .catch(error => commonService.handleErrorResponse(error));
    }


    const onSubmit = handleSubmit(({ DealerId, Application, DeviceId, DeviceDescription }) => {
        let dealerObject: DealerApplicationConfigurationModel = {
            DealerId: DealerId,
            Application: Application,
            DeviceId: DeviceId,
            DealerApplicationConfigurationKey: props.Key ? props.Key : -1,
            DeviceDescription: DeviceDescription,
            IsAllowAccess: checked,
            ExpiredDate: selectedDate ? selectedDate : undefined,
            ExpiredDateString: ""
        }
        if (!props.Key) {
            addData(dealerObject)
        }
        else {
            updateData(dealerObject)
        }
    })



    useEffect(() => {
        if (props.Open && props.Key) {
            dealerApplicationConfigurationService.getByKey(props.Key).then(res => {
                setTimeout(() => {
                    setValue("DealerId", res.dealerId)
                    setValue("Application", res.application)
                    let isAllowAccess = res.isAllowAccess ? true : false
                    setChecked(isAllowAccess)
                    setValue("DeviceId", res.deviceId)
                    setValue("DeviceDescription", res.deviceDescription)
                    setValue("DealerApplicationConfigurationKey", res.dealerApplicationConfigurationKey)
                    setSelectedDate(res.expiredDate)

                })
            })
                .catch(error => commonService.handleErrorResponse(error));

        }


    }, [setValue, props])
    return (
        <Dialog open={props.Open} onClose={() => props.HandleClose()} aria-labelledby="form-dialog-title" maxWidth={"md"}>
            <DialogTitle id="form-dialog-title">
                {props.DataObject ? i18next.t('DEALER_MANAGEMENT.EDIT') : i18next.t('DEALER_MANAGEMENT.ADD')}
                <IconButton onClick={() => props.HandleClose()} className={classes.closeBtn}>
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="DealerId" inputRef={register({ required: true })}
                            />
                            {errors.DealerId && (<ErrorMessage inputText={i18next.t('DEALER_MANAGEMENT.DEALER_ID_REQUIRED_MES')} />)}

                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField className={classes.textInput}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={i18next.t('DEALER_MANAGEMENT.APPLICATION')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="Application" inputRef={register({ required: true })}
                            />
                            {errors.Application && (<ErrorMessage inputText={i18next.t('DEALER_MANAGEMENT.APPLICATION_REQUIRED_MES')} />)}
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField className={classes.textInput}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label={i18next.t('DEALER_MANAGEMENT.DEVICE_ID')}
                                name="DeviceId" inputRef={register}
                            />

                        </Grid>

                        <Grid item md={6} xs={12}>
                            <TextField className={classes.textInput}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label={i18next.t('DEALER_MANAGEMENT.DEVICE_DESCRIPTION')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="DeviceDescription" inputRef={register}
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
                                onChange={handleDateChange}
                                name="ExpiredDate"
                                inputRef={register}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        name="IsAllowAccess"
                                        inputRef={register}
                                        onChange={allowAccessChange}
                                    />
                                }
                                label={i18next.t('DEALER_MANAGEMENT.ALLOW_ACCESS')}
                            />
                        </Grid>
                    </Grid>
                </form>

            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => props.HandleClose()}>
                    {i18next.t('COMMON.CANCEL')}
                </Button>
                <Button color="primary" type="submit" onClick={onSubmit}>
                    {i18next.t('COMMON.SAVE')}
                </Button>
            </DialogActions>
        </Dialog>
    );

}
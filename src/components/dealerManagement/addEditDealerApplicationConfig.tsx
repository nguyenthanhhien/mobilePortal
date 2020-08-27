import React, { Component, useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
    TextField, Button,
    Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Checkbox, FormControlLabel, MenuItem
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
import { ApplicationNameModel } from '../../models/applicationNameModel';
import { NotificationRvHookup } from 'material-ui/svg-icons';

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
        closeBtn: {
            float: "right"
        }
    }),
);

interface DialogDataModel extends React.Props<any> {
    Open: boolean
    HandleClose: (isUpdated?: boolean) => void
    Key: number
}

export default function AddEditDealerApplicationConfig(props: DialogDataModel) {
    const classes = useStyles();
    const { register, setValue, handleSubmit, errors, reset } = useForm<DealerApplicationConfigurationModel>();
    const [selectedDate, setSelectedDate] = useState<Date | null | undefined>(null)
    const handleDateChange = (date: any) => {
        setSelectedDate(date)
    };

    const [checked, setChecked] = React.useState(false)
    const allowAccessChange = (event: any) => {
        setChecked(event.target.checked)
    };

    const [applicationName, setApplicationName] = React.useState('');
    const handleApplicationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApplicationName(event.target.value);
    };

    const [applications, setApplications] = useState<ApplicationNameModel[]>([])

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
                    closeModal(true)
                }
            })
            .catch(error => commonService.handleErrorResponse(error));
    }


    const onSubmit = handleSubmit(({ DealerId, DeviceId, DeviceDescription }) => {
        let dealerObject: DealerApplicationConfigurationModel = {
            DealerId: DealerId,
            Application: applicationName,
            DeviceId: DeviceId ? DeviceId : undefined,
            DealerApplicationConfigurationKey: props.Key ? props.Key : -1,
            DeviceDescription: DeviceDescription ? DeviceDescription : undefined,
            IsAllowAccess: checked,
            ExpiredDate: selectedDate ? selectedDate : undefined,
            ExpiredDateString: ""
        }
        if (props.Key > 0) {
            updateData(dealerObject)
        }
        else {
            addData(dealerObject)
        }
    })

    const resetForm = () => {
        setChecked(false)
        setSelectedDate(null)
        if (applications.length > 0) {
            setApplicationName(applications[0].Name)
        }
    }

    const closeModal = (isUpdated?: boolean) => {
        resetForm()
        props.HandleClose(isUpdated)

    }

    useEffect(() => {
        dealerApplicationConfigurationService.getApplicationNames()
            .then(data => {
                setApplications(data)
            })
            .catch(error => commonService.handleErrorResponse(error));
    }, [])

    useEffect(() => {
        if (props.Open) {
            if (props.Key > 0) {
                dealerApplicationConfigurationService.getByKey(props.Key).then(res => {
                    setTimeout(() => {
                        setValue("DealerId", res.DealerId)
                        setApplicationName(res.Application)
                        let isAllowAccess = res.IsAllowAccess ? true : false
                        setChecked(isAllowAccess)
                        setValue("DeviceId", res.DeviceId)
                        setValue("DeviceDescription", res.DeviceDescription)
                        setValue("DealerApplicationConfigurationKey", res.DealerApplicationConfigurationKey)
                        setSelectedDate(res.ExpiredDate)

                    }, 100)
                })
                    .catch(error => commonService.handleErrorResponse(error));

            }
        }
    }, [props.Open])
    return (
        <Dialog open={props.Open} onClose={() => closeModal()} aria-labelledby="form-dialog-title" maxWidth={"md"}>
            <DialogTitle id="form-dialog-title">
                {props.Key > 0 ? i18next.t('DEALER_MANAGEMENT.EDIT') : i18next.t('DEALER_MANAGEMENT.ADD')}
                <IconButton onClick={() => closeModal()} className={classes.closeBtn}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form>
                    <Grid container alignItems={"center"}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                required
                                label={i18next.t('DEALER_MANAGEMENT.DEALER_ID')}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="DealerId" inputRef={register({ required: true })}
                            />
                            {errors.DealerId && (<ErrorMessage inputText={i18next.t('DEALER_MANAGEMENT.DEALER_ID_REQUIRED_MES')} />)}

                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
                                select
                                label={i18next.t('DEALER_MANAGEMENT.APPLICATION')}
                                value={applicationName}
                                onChange={handleApplicationChange}
                                fullWidth
                                required
                                variant="outlined"
                                InputProps={{
                                    readOnly: props.Key > 0 ? true : false,
                                }}
                            >
                                {applications.map((option, index) => (
                                    <MenuItem key={index} value={option.Name}>
                                        {option.Description}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField
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
                            <TextField
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
                                minDate={new Date()}
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
                <Button color="primary" onClick={() => closeModal()}>
                    {i18next.t('COMMON.CANCEL')}
                </Button>
                <Button color="primary" type="submit" onClick={onSubmit}>
                    {i18next.t('COMMON.SAVE')}
                </Button>
            </DialogActions>
        </Dialog>
    );

}
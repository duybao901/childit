import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { toast } from 'react-toastify';

export const ShowSuccessMessage = (text) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Alert severity="success">{text}</Alert>
        </div>
    )
}

export const ShowErrorMessage = (text) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Alert severity="error">{text}</Alert>
        </div>
    )
}

export const ShowToastifySuccess = (text) => {
    toast.success(text, {
        position: "top-center",
        autoClose: 2000,
    });
}

export const ShowToastifyPlussSkillAllStudent = (text) => {
    toast(text, {
        position: "top-center",
        autoClose: 1800,
    });
}

export const ShowToastifySuccessPlusSkillStudent = (text) => {
    toast.success(text, {
        position: "top-center",
        autoClose: 1800,
    });
}

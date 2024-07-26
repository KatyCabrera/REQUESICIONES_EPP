import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../redux/actions/userActions';
import axios from 'axios';

function updateUserInfo(userInfo) {
    return new Promise((resolve, reject) => {
        const form = new URLSearchParams();
        form.append("json", JSON.stringify(userInfo));
        axios.post(`/users/edit`, form, {
          headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
          .then(response => resolve(response.data))
          .catch(error => reject(error))
    });
  }

const CompleteUserInfo = () => {
    const userData = useSelector(state => state.userReducer && state.userReducer.userData);
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!userData.nombre || !userData.apellido_paterno || !userData.apellido_materno) {
            setIsOpen(true);
            userData.nombre && setNombre(userData.c);
            userData.apellido_paterno && setApellidoPaterno(userData.apellido_paterno);
            userData.apellido_materno && setApellidoMaterno(userData.apellido_materno);
        } else {
            setIsOpen(false)
        }
    }, [userData]);
  
    const handleSave = () => {
        const data ={
            nombre: nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            id: userData.id,
        };
        // Empty onClick function for Save
        updateUserInfo(data)
        .then(() => {
            dispatch(updateUserData(data))
        })
    };

    const handleCancel = () => {
        // Empty onClick function for Cancel
    };

    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <Dialog open={isOpen}>
        <DialogTitle>Completa tu información antes de continuar</DialogTitle>
        <DialogContent style={{ paddingTop: 10 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <TextField
                label="Nombre(s)"
                fullWidth
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                label="Apellido Paterno"
                fullWidth
                value={apellidoPaterno}
                onChange={(e) => setApellidoPaterno(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                label="Apellido Materno"
                fullWidth
                value={apellidoMaterno}
                onChange={(e) => setApellidoMaterno(e.target.value)}
                />
            </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={handleCancel}>Cancel</Button>
            <Button variant="contained" onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
        </Dialog>
    );
};

export default CompleteUserInfo;

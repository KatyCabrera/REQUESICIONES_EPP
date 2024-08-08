import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

function FilaMaterial({ material, actividad, onMaterialChanged }) {
    const [ materialLocal, setMaterialLocal ] = useState(null);
    const [isChanged, setChanged] = useState(false);

    useEffect(() => {
        if (material && !materialLocal) {
            setMaterialLocal(material);
        }
    }, [material]);

    if (!materialLocal) {
        return null;
    }

    function handleCantidadMaterialChanged(ev) {
        const value = ev.target.value;
        setChanged(true);
        setMaterialLocal(prevState => ({
            ...prevState,
            cantidad_almacen: value
        }));
        onMaterialChanged({
            ...materialLocal,
            cantidad_almacen: value ? Number(value) : value
        }, actividad);
    }

    function handleNombreMaterialChanged(ev) {
        const value = ev.target.value;
        setChanged(true);
        setMaterialLocal(prevState => ({
            ...prevState,
            descripcion: value
        }));
        onMaterialChanged({
            ...materialLocal,
            descripcion: value 
        }, actividad);
    }

    function handleSave() {
        setChanged(false);
        onMaterialChanged(materialLocal, actividad);
    }

    return (
        <>
            <TableRow key={material.id}>
                <TableCell padding="normal" style={{ verticalAlign: 'top' }}>
                    <Tooltip title={materialLocal.descripcion}>
                        <TextField id="outlined-basic" 
                            label="Nombre del Equipo" 
                            variant="outlined" 
                            style={{ width: '100%' }}
                            error={!materialLocal.descripcion}
                            helperText={!materialLocal.descripcion ? 'Ingrese un nombre para el equipo' : ''}
                            onChange={handleNombreMaterialChanged}
                            value={materialLocal.descripcion} />
                    </Tooltip>
                </TableCell>
                <TableCell align="right">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div>
                            <TextField id="outlined-basic" 
                                label="Cantidad" 
                                variant="outlined" 
                                error={!materialLocal.cantidad_almacen || materialLocal.cantidad_almacen < 1}
                                helperText={!materialLocal.cantidad_almacen || materialLocal.cantidad_almacen < 1 ? 'Ingrese una cantidad válida' : ''}
                                onChange={handleCantidadMaterialChanged}
                                value={materialLocal.cantidad_almacen} />
                        </div>
                    </div>
                    {/*<div style={{ display: 'flex', justifyContent: 'end', paddingTop: 5 }}>
                        {
                            isChanged ? 
                            <Button 
                                onChange={handleSave}
                                variant="contained">
                                    Guardar
                            </Button>:null
                        }
                    </div>*/}
                </TableCell>
            </TableRow>        
        </>
  );
}

export default FilaMaterial;

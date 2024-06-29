import React, { Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import useStyles from 'dan-components/Tables/tableStyle-jss';

function StrippedTable({ materialesSeguridad, actividad, onCantidadMaterialChanged, cantidadesMateriales }) {
  const { classes, cx } = useStyles();

  return (
    <div key={actividad.id} className={classes.rootContainer}  style={{
      display: 'flex', flexDirection: 'column', minWidth: 250, 
    }}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">{ actividad.nombre }</Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={cx(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Descripción</TableCell>
              <TableCell align="right">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              materialesSeguridad.map(material => {
                const cantidadState = cantidadesMateriales ? cantidadesMateriales[material.id] : 0;
                const cantidadAlmacen = material.cantidad_almacen;
                const cantidadNoDisponible = cantidadAlmacen < cantidadState;
                return <TableRow key={material.id}>
                  <TableCell padding="normal">{ material.descripcion }</TableCell>
                  <TableCell align="right">
                    <TextField id="outlined-basic" 
                          label="Cantidad" 
                          variant="outlined" 
                          error={cantidadNoDisponible}
                          helperText={cantidadNoDisponible ? "No hay suficiente equipo en almacén" : `Cantidad en almacén: ${cantidadAlmacen}`}
                          onChange={ev => onCantidadMaterialChanged(ev.target.value, material.id, actividad.id)}
                          value={cantidadState} />
                  </TableCell>
                </TableRow>
              })
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default StrippedTable;

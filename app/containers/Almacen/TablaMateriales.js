import React, { Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useStyles from 'dan-components/Tables/tableStyle-jss';
import FilaMaterial from './FilaMaterial';

function StrippedTable({ materialesSeguridad, actividad, onMaterialChanged }) {
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
                return <FilaMaterial material={material} actividad={actividad} onMaterialChanged={onMaterialChanged} />
              })
            }
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default StrippedTable;

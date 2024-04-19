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

function StrippedTable() {
  const { classes, cx } = useStyles();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', minWidth: 250, width: '50%'
    }}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.title}>
          <Typography className={classes.title} variant="h6">Materiales Para Delimitar</Typography>
        </div>
      </Toolbar>
      <div className={classes.rootTable}>
        <Table className={cx(classes.table, classes.stripped)}>
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Material de seguridad</TableCell>
              <TableCell align="right">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell padding="normal">Postes con base</TableCell>
              <TableCell align="right">
                <TextField id="outlined-basic" label="Cantidad" variant="outlined" value={4} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding="normal">Cinta roja (Peligro)</TableCell>
              <TableCell align="right">
                <TextField id="outlined-basic" label="Cantidad" variant="outlined" value={9} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default StrippedTable;

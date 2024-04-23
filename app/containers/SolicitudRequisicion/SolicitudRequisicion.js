import React, { useState } from 'react';
import { TextField, Grid, Typography, TextareaAutosize } from '@mui/material';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';

function SolicitudRequisicion() {
    const title = 'Solicitud Requisicion';
  const description = 'Crear solicitud de requisición';
  const [cliente, setCliente] = useState('');
  const [fechaRequisicion, setFechaRequisicion] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaTermino, setFechaTermino] = useState('');
  const [nave, setNave] = useState('');
  const [area, setArea] = useState('');
  const [nombreTableros, setNombreTableros] = useState('');
  const [manifolds, setManifolds] = useState('');
  const [conexionExistente, setConexionExistente] = useState('');
  const [plataforma, setPlataforma] = useState('');
  const [escalera, setEscalera] = useState('');
  const [trabajosCaliente, setTrabajosCaliente] = useState('');
  const [usoPinturaQuimico, setUsoPinturaQuimico] = useState('');

  return <div>
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
  </Helmet>
  <PapperBlock title="Nueva Requisicion" whiteBg icon="ion-ios-menu-outline" desc="Creación de requisiciones de materiales de seguridad">
  <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '80%' }}>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={6}>
            <TextField
              label="Nombre de Cliente"
              variant="outlined"
              fullWidth
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Fecha de requisición"
              variant="outlined"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaRequisicion}
              onChange={(e) => setFechaRequisicion(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <TextField
              label="Nombre de proyecto"
              variant="outlined"
              fullWidth
              value={proyecto}
              onChange={(e) => setProyecto(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={4}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>Fecha de Proyecto</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Inicio"
              variant="outlined"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Termino"
              variant="outlined"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={fechaTermino}
              onChange={(e) => setFechaTermino(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={4}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>Ubicación</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Nave"
              variant="outlined"
              fullWidth
              value={nave}
              onChange={(e) => setNave(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Área"
              variant="outlined"
              fullWidth
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <Typography variant="body1">Si se requiere bloqueo de tableros, controladores, manifolds o equipo (PDB, PDP, CDP, WPP, WWMVAM, ETC) por favor identificar que tableros son y colocarlos en la sección de nombre o identificación</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <TextareaAutosize
              placeholder="Nombre o identification de tableros"
              style={{ width: '100%', minHeight: '50px' }}
              value={nombreTableros}
              onChange={(e) => setNombreTableros(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <TextareaAutosize
              placeholder="Manifolds"
              style={{ width: '100%', minHeight: '50px' }}
              value={manifolds}
              onChange={(e) => setManifolds(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <TextField
              label="Se requiere conexión a tableros o equipos existentes"
              variant="outlined"
              fullWidth
              value={conexionExistente}
              onChange={(e) => setConexionExistente(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={4}>
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>Se requieren trabajos en alturas</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Plataforma"
              variant="outlined"
              fullWidth
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Escalera"
              variant="outlined"
              fullWidth
              value={escalera}
              onChange={(e) => setEscalera(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <TextField
              label="Se requieren trabajos en caliente"
              variant="outlined"
              fullWidth
              value={trabajosCaliente}
              onChange={(e) => setTrabajosCaliente(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <TextField
              label="Se requiere uso pintura o químico, describir"
              variant="outlined"
              fullWidth
              value={usoPinturaQuimico}
              onChange={(e) => setUsoPinturaQuimico(e.target.value)}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  </PapperBlock>
</div>;

}

export default SolicitudRequisicion;
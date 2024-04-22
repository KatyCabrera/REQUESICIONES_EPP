import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';
import TablaMateriales from './TablaMateriales';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { TextField, Grid } from '@mui/material';

const actividades = [
    {
      id: 1,
      nombre: "EQUIPO PARA DELIMITAR E IDENTIFICAR",
      materialesSeguridad: [
        {
          descripcion: "Trafipostes con Base",
          id: 1,
        }, {
          descripcion: "Cinta roja (Peligro)",
          id: 2,
        }, {
          descripcion: "Cinta amarilla (Precaución)",
          id: 3,
        }, {
          descripcion: "Cinta Diurex",
          id: 4,
        }, {
          descripcion: "Cinta Caramelo",
          id: 5,
        }, {
          descripcion: "Zona de hidratación",
          id: 6,
        }, {
          descripcion: "Pizarrón",
          id: 7,
        }, {
          descripcion: "Botiquín",
          id: 8,
        }, {
          descripcion: "Bandera de seguridad",
          id: 9,
        }
      ]
    },
    {
      id: 2,
      nombre: "EQUIPO PARA TRABAJOS EN ALTURAS",
      materialesSeguridad: [
        {
        descripcion: "Kit de alturas",
        id: 1,
      }, {
        descripcion: "Tornillo de alpinista",
        id: 2,
      }, {
        descripcion: "Línea de vida con amortiguador",
        id: 3,
      }, {
        descripcion: "Caja porta herramientas",
        id: 4,
      }, {
        descripcion: "Muñequera porta herramientas",
        id: 5,
      }, {
        descripcion: "Anclaje para viga",
        id: 6,
      }, 
    ]
    },
    {
      id: 3,
      nombre: "EQUIPO PARA TRABAJOS EN CALIENTE",
      materialesSeguridad: [
        {
        descripcion: "Extintor PQS 1KG",
        id: 1,
      }, {
        descripcion: "Extintor PQS 6KG",
        id: 2,
      }, {
        descripcion: "Extintor PQS 9KG",
        id: 3,
      }, {
        descripcion: "Extintor Co2 9KG",
        id: 4,
      }, {
        descripcion: "Lona ignifuga",
        id: 5,
      }, {
        descripcion: "Careta facial",
        id: 6,
      }, {
        descripcion: "Careta para soldar",
        id: 7,
      }, {
        descripcion: "Kit soldadura",
        id: 8,
      },
    ]
    },
    {
      id: 4,
      nombre: "EQUIPO DE BLOQUEO Y CANDADEO",
      materialesSeguridad: [
        {
        descripcion: "Caja de bloqueo",
        id: 1,
      }, {
        descripcion: "Candado amarillo",
        id: 2,
      }, {
        descripcion: "Cangrejo",
        id: 3,
      }, {
        descripcion: "Dispositivo de bloqueo Breaker G",
        id: 4,
      }, {
        descripcion: "Dispositivo de bloqueo Breaker M",
        id: 5,
      }, {
        descripcion: "Dispositivo de bloqueo Breaker CH",
        id: 6,
      }, {
        descripcion: "Dispositivo de bloqueo Válvula Redonda G",
        id: 7,
      }, {
        descripcion: "Dispositivo de bloqueo Válvula Largo",
        id: 8,
      }, {
        descripcion: "Meza de bloqueo",
        id: 9,
      }, 
    ]
    }, 
    { id: 5,
      nombre: "EQUIPO PARA APLICACIÓN DE PINTURA",
      materialesSeguridad: [
        {
        descripcion: "Kit Antiderrames",
        id: 1,
      }, {
        descripcion: "Charola antiderrames",
        id: 2,
      }, {
        descripcion: "Mascarilla con filtro",
        id: 3,
      }, {
        descripcion: "Traje Tyvek",
        id: 4,
      }, {
        descripcion: "Guantes de latéx",
        id: 5,
      },  {
        descripcion: "Plasticos para cubrir",
        id: 6,
      },
    ]
    },
    { id: 6,
      nombre: "EQUIPO DE LIMPIEZA",
      materialesSeguridad: [
        {
        descripcion: "Recogedor",
        id: 1,
      }, {
        descripcion: "Escoba",
        id: 2,
      }, {
        descripcion: "Bolsas de basura G",
        id: 3,
      }, {
        descripcion: "Bolsas de basura CH",
        id: 4,
      }, 
      ]
    }, 
    {id: 7,
      nombre: "EQUIPO ADICIONAL",
      materialesSeguridad: [
        {
        descripcion: "Extensión",
        id: 1,
      }, {
        descripcion: "Rodilleras",
        id: 2,
      }, {
        descripcion: "Guantes anti-impacto",
        id: 3,
      }, {
        descripcion: "Charola de scrap",
        id: 4,
      },
    ]
    }
];

function Requisiciones() {
  const title = 'Requisiciones';
  const description = 'Requisiciones de equipo de seguridad';
  const [cantidades, setCantidades] = useState({ });
  const [cliente, setCliente] = useState('');
  const [planta, setPlanta] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const history = useHistory();

  function handleCantidadChanged(cantidad, materialSeguridadId, activadId) {
      setCantidades(prevState => ({
        ...prevState,
        [activadId]: {
            ...prevState[activadId],
            [materialSeguridadId]: cantidad
        }
      }));
  }

  function handleCreateRequisicion() {
    alert("Requisición Creada");
    history.push("/app/lista-requisiciones");
  }

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock title="Nueva Requisicion" whiteBg icon="ion-ios-menu-outline" desc="Creación de requisiciones de materiales de seguridad">
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
              <Grid item xs={6}>
                <TextField
                  label="Cliente"
                  variant="outlined"
                  fullWidth
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de entrada"
                  variant="outlined"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={fechaEntrada}
                  onChange={(e) => setFechaEntrada(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
              <Grid item xs={6}>
                <TextField
                  label="Planta"
                  variant="outlined"
                  fullWidth
                  value={planta}
                  onChange={(e) => setPlanta(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Fecha de salida"
                  variant="outlined"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={fechaSalida}
                  onChange={(e) => setFechaSalida(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
              <Grid item xs={6}>
                <TextField
                  label="Solicitante"
                  variant="outlined"
                  fullWidth
                  value={solicitante}
                  onChange={(e) => setSolicitante(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
              <Grid item xs={6}>
                <TextField
                  label="Proyecto"
                  variant="outlined"
                  fullWidth
                  value={proyecto}
                  onChange={(e) => setProyecto(e.target.value)}
                />
              </Grid>
            </Grid>
          </div>
        </div>
        {
          //ESTO ES GRACIAS A CHATGP
          //DIVIDE AREGLO EN SUB AREGLOS DE 2 ELEMENTOS
          actividades.reduce((acc, curr, index) => {
              if (index % 2 === 0) {
                  acc.push([curr]);
              } else {
                  acc[acc.length - 1].push(curr);
              }
              return acc;
          }, []).map((row, indesx) => (
            <div key={indesx} style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {
                    row.map(actividad => (
                      <TablaMateriales
                          key={actividad.id} 
                          actividad={actividad} 
                          materialesSeguridad={actividad.materialesSeguridad}
                          cantidadesMateriales={cantidades[actividad.id]}
                          onCantidadMaterialChanged={handleCantidadChanged}
                           />
                    ))
                  }
            </div>
          ))
        }
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button onClick={handleCreateRequisicion} variant="contained">Crear Requisición</Button>
        </div>
      </PapperBlock>
    </div>
  );
}

export default Requisiciones;

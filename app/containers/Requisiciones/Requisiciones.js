import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';
import TablaMateriales from './TablaMateriales';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { TextField, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/general';
import CompleteUserInfo from '../../components/CompleteUserInfo/CompleteUserInfo';

function getEquiposProtecion() {
    return new Promise((resolve, reject) => {
        axios.get("actividades/equiposProteccion")
          .then(response => resolve(response.data))
          .catch(error => reject(error))
    });
}

function createRequisicion(requisicion) {
  return new Promise((resolve, reject) => {
      const form = new URLSearchParams();
      form.append("json", JSON.stringify(requisicion));
      axios.post("requisiciones", form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
  });
}

function updateRequisicion(requisicion) {
  return new Promise((resolve, reject) => {
      const form = new URLSearchParams();
      form.append("json", JSON.stringify(requisicion));
      axios.post("requisiciones/update", form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
  });
}

function getUser(id) {
  return new Promise((resolve, reject) => {
      const form = new URLSearchParams();
      axios.get(`/users/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
  });
}

function Requisiciones(props) {
  const title = 'Requisiciones';
  const description = 'Requisiciones de equipo de seguridad';
  const userData = useSelector(state => state.userReducer && state.userReducer.userData);
  const selectedRequisicion = useSelector(state => state.requisicionReducer && state.requisicionReducer.selectedRequisicion);
  const [cantidades, setCantidades] = useState({ });
  const [cliente, setCliente] = useState('');
  const [planta, setPlanta] = useState('');
  const [solicitante, setSolicitante] = useState('');
  const [proyecto, setProyecto] = useState('');
  const [fechaEntrada, setFechaEntrada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');
  const [actividades, setActividades] = useState([]);
  const isFormValid = useMemo(() => (cliente && planta 
    && proyecto && fechaEntrada && fechaSalida), 
    [cliente, planta, proyecto, fechaEntrada, fechaSalida]);
  const areQuantitiesValid = useMemo(() => {
    const equiposProteccion = actividades.reduce((acc, current) => {
      current.equiposProteccion.forEach(equipo => {
        acc.push(equipo);
      });
      return acc;
    },[]); 

    return !equiposProteccion.some(equipo => {
      if (!cantidades[equipo.actividades_id] || !cantidades[equipo.actividades_id][equipo.id]) {
        return false;
      }
      const cantidadEquipo = cantidades[equipo.actividades_id][equipo.id];
      return cantidadEquipo > equipo.cantidad_almacen;
    })
  }, [cantidades, actividades]);
  const history = useHistory();
  const requestObj = useMemo(() => {
    const equiposCantidades = Object.values(cantidades)
      .map(item => Object.keys(item).map(key => ({
        id: key,
        cantidad: item[key],
      })))
      .reduce((acc, current) => {
        acc = [
          ...acc,
          ...current,
        ];
        return acc;
      }, []);
    return {
        cliente,
        planta,
        solicitante: selectedRequisicion ? selectedRequisicion.solicitante : userData.id,
        proyecto,
        fecha_entrada: fechaEntrada,
        fecha_salida: fechaSalida,
        equipos_proteccion_cantidades: equiposCantidades,
        ...(selectedRequisicion ? {
          id: selectedRequisicion.id
        }: {})
    };
  }, [userData, cliente, planta, fechaEntrada, fechaSalida, cantidades,proyecto, selectedRequisicion]);

  useEffect(() => {
    getEquiposProtecion(userData.rol)
      .then(data => {
        const newActividades = data.map(act => {
          const equipos =  act.equiposProteccion.map(equipo => ({
            ...equipo,
            cantidad_almacen_respaldo: equipo.cantidad_almacen,
          }));
          return {
            ...act,
            equiposProteccion: equipos
          }
        });
        setActividades(newActividades);
      })

  }, []);

  useEffect(() => {
    if (selectedRequisicion) {
      console.log(selectedRequisicion);
        setCliente(selectedRequisicion.cliente);
        setProyecto(selectedRequisicion.proyecto);
        setPlanta(selectedRequisicion.planta);
        setFechaEntrada(formatDate(selectedRequisicion.fecha_entrada));
        setFechaSalida(formatDate(selectedRequisicion.fecha_salida));
        if (selectedRequisicion.EquipoProteccionRequisicions){
          const cantidadesObj = selectedRequisicion.EquipoProteccionRequisicions.reduce((acc, current) => {
            const equipoProteccion = current.EquipoProteccion;  
            acc[equipoProteccion.actividades_id] = {
              ...acc[equipoProteccion.actividades_id],
              [current.id_material] : current.cantidad,
            };
            return acc;
          }, {});
          setCantidades(cantidadesObj);
        } 
        getUser(selectedRequisicion.solicitante)
          .then(usr => {
            usr && setSolicitante(usr.username)
          })
    } else {
        setCliente('');
        setProyecto('');
        setPlanta('');
        setFechaEntrada('');
        setFechaSalida('');
        setCantidades({});
    }
  }, [selectedRequisicion]);

  function handleCantidadChanged(cantidad, materialSeguridadId, activadId) {
      setCantidades(prevState => ({
        ...prevState,
        [activadId]: {
            ...prevState[activadId],
            [materialSeguridadId]: cantidad
        }
      }));

      setActividades(prevState => {
          const newActividades = [...prevState].map(act => {
            if (act.id === activadId) {
              const newMaterialesSeguridad = [...act.equiposProteccion].map(equipo => {
                if (equipo.id === materialSeguridadId) {
                    return {
                      ...equipo,
                      cantidad_almacen: cantidad ? equipo.cantidad_almacen_respaldo - cantidad : equipo.cantidad_almacen_respaldo,
                    };
                }
                return equipo;    
              });
              return {
                ...act,
                equiposProteccion: newMaterialesSeguridad,
              };
            }
            return act;
          });

          return newActividades;
      });
  }

  function handleCreateRequisicion() {
    createRequisicion(requestObj)
      .then(data => {
        alert("Requisición Creada");
        history.push("/app/lista-requisiciones");
      })
      .catch(() => {

      });
  }

  function handleEditRequisicion() {
    updateRequisicion(requestObj)
      .then(data => {
        alert("Requisición Modificada");
        history.push("/app/lista-requisiciones");
      })
      .catch(() => {

      });
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
      <PapperBlock title={selectedRequisicion ? "Editar Requisicion": "Nueva Requisicion"} 
                    whiteBg icon="ion-ios-menu-outline" 
                    desc={`${selectedRequisicion ? 'Edición' : 'Creación'} de requisiciones de materiales de seguridad`}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
              <Grid item xs={6}>
                <TextField
                  label="Cliente"
                  variant="outlined"
                  fullWidth
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                  disabled
                  value={selectedRequisicion ? solicitante : userData.username}
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
                  required
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
                          materialesSeguridad={actividad.equiposProteccion}
                          cantidadesMateriales={cantidades[actividad.id]}
                          onCantidadMaterialChanged={handleCantidadChanged}
                           />
                    ))
                  }
            </div>
          ))
        }
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          {
            !isFormValid ? 
            <Typography variant="caption" style={{ marginRight: 10 }}>
              Ingrese todos los datos obligatorios marcados con *
            </Typography>:
            !Object.keys(cantidades).length ?
            <Typography variant="caption" style={{ marginRight: 10 }}>
              Ingrese cantidad de almenos un material
            </Typography>:
            !areQuantitiesValid ?
            <Typography variant="caption" style={{ marginRight: 10 }}>
              Algunas cantidades requeridas exceden las disponibles en almacén
            </Typography>: null
          }
          {
            selectedRequisicion?
              <Button disabled={!isFormValid || !areQuantitiesValid || !Object.keys(cantidades).length} 
                  onClick={handleEditRequisicion} 
                  variant="contained">Editar Requisición</Button>:
              <Button disabled={!isFormValid || !areQuantitiesValid || !Object.keys(cantidades).length} 
                  onClick={handleCreateRequisicion} 
                  variant="contained">Crear Requisición</Button>
          }
        </div>
      </PapperBlock>
      <CompleteUserInfo />
    </div>
  );
}

export default Requisiciones;

import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';
import TablaMateriales from './TablaMateriales';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function getEquiposProtecion() {
    return new Promise((resolve, reject) => {
        axios.get("actividades/equiposProteccion")
          .then(response => resolve(response.data))
          .catch(error => reject(error))
    });
}

function updateEquipoProteccion(equipoProteccion) {
  return new Promise((resolve, reject) => {
      const form = new URLSearchParams();
      form.append("json", JSON.stringify(equipoProteccion));
      axios.post("requisiciones/update", form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
  });
}

function Almacen(props) {
    const title = 'Almacen';
    const description = 'Almacén de equipos de seguridad';
    const userData = useSelector(state => state.userReducer && state.userReducer.userData);

    const [editedEquipos, setEditedEquipos] = useState([]);
    
    const [isEdited, setEdited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [actividades, setActividades] = useState([]);
    const isFormValid = useMemo(() => {
        const equiposProteccion = actividades.reduce((acc, current) => {
            current.equiposProteccion.forEach(equipo => {
            acc.push(equipo);
            });
            return acc;
        },[]); 
    
        return !equiposProteccion.some(equipo => {
            return !equipo.descripcion;
        })
    }, [actividades]);
    const areQuantitiesValid = useMemo(() => {
        const equiposProteccion = actividades.reduce((acc, current) => {
        current.equiposProteccion.forEach(equipo => {
            acc.push(equipo);
        });
        return acc;
    },[]); 

    return !equiposProteccion.some(equipo => {
      return equipo.cantidad_almacen === null || equipo.cantidad_almacen < 0;
    })
  }, [ actividades]);

  useEffect(() => {
    handeGetEquiposProteccion();
  }, []);

  function handeGetEquiposProteccion() {
    setIsLoading(true);
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
        setIsLoading(false);
      })
  }

  function handleMaterialChanged(material, actividad) {
    setEdited(true);
    setEditedEquipos(prevState => {

        
    })
    setActividades(prevState => {
        const newActividades = [...prevState].map(act => {
            if (act.id === actividad.id) {
            const newMaterialesSeguridad = [...act.equiposProteccion].map(equipo => {
                if (equipo.id === material.id) {
                    return {
                    ...material
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

  

  function handleEditRequisicion() {
    updateEquipoProteccion(actividades)
      .then(data => {
        alert("Equipos de protecciòn modificados correctamente");
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
      <PapperBlock title="Administración del almacén" 
            whiteBg icon="ion-ios-menu-outline" 
            desc="Modulo de administración de los equipos de protección" 
            rightComponent={
                <>
                    {/*<Button disabled={!isEdited || !areQuantitiesValid} 
                            onClick={handeGetEquiposProteccion} 
                            variant="contained" 
                            style={{ marginRight: 8 }}
                            color='secondary'>
                                Cancelar
                        </Button>*/
                    }
                    <Button disabled={!isEdited || !areQuantitiesValid} 
                        onClick={handleEditRequisicion} 
                        variant="contained">
                        Guardar Cambios
                    </Button>
                </>
            }>
        
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
                          onMaterialChanged={handleMaterialChanged}
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
                Algunos equipos no cuentan con nombre
            </Typography>:
            !areQuantitiesValid ?
            <Typography variant="caption" style={{ marginRight: 10 }}>
                Algunas cantidades no son válidas
            </Typography>: null
          }
            {/*<Button disabled={!isEdited || !areQuantitiesValid} 
                    onClick={handeGetEquiposProteccion} 
                    variant="contained" 
                    style={{ marginRight: 8 }}
                    color='secondary'>
                        Cancelar
            </Button>*/}
            <Button disabled={!isEdited || !areQuantitiesValid} 
                    onClick={handleEditRequisicion} 
                    variant="contained">Guardar Cambios</Button>
        </div>
      </PapperBlock>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Almacen;

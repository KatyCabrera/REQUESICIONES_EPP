import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';
import TablaMateriales from './TablaMateriales';
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";

const actividades = [
    {
      id: 1,
      nombre: "Material para delimitar e identificaciòn",
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
        }
      ]
    },
    {
      id: 2,
      nombre: "Materiales para trabajar en altura",
      materialesSeguridad: [{
        descripcion: "Cinta negra (Peligro)",
        id: 1,
      }]
    },
    {
      id: 3,
      nombre: "Materiales para trabajos en caliente",
      materialesSeguridad: [{
        descripcion: "Cinta morada (Peligro)",
        id: 1,
      }]
    },
    {
      id: 4,
      nombre: "Equipo de bloqueo y candado",
      materialesSeguridad: [{
        descripcion: "Cinta rosita (Peligro)",
        id: 1,
      }]
    }
];

function Requisiciones() {
  const title = 'Requisiciones';
  const description = 'Requisiciones de equipo de seguridad';
  const [cantidades, setCantidades] = useState({ });
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

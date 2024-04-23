import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock, EmptyData } from 'dan-components';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useHistory } from "react-router-dom";

const requisiciones = [
    {
        id: 1,
        usuario: {
            nombre: 'Jose Alfredo Jimenez',
            id: 1,
        },
        fecha: '22 Abril 2024',
        proyecto: {
            id: 1,
            nombre: 'Toyota Motors',
        }
    },
    {
        id: 2,
        usuario: {
            nombre: 'Javier Solis',
            id: 2,
        },
        fecha: '22 Abril 2024',
        proyecto: {
            id: 1,
            nombre: 'Mabe Electrodomésticos',
        }
    }
]


function ListaRequisiciones() {
  const title = 'Lista Requisiciones';
  const description = 'Requisiciones de equipo de seguridad';

  const history = useHistory();

  function handleCreateRequisicion() {
    history.push("/app/requisiciones");
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'end', marginBottom: 10 }}>
          <Button onClick={handleCreateRequisicion} variant="contained">Nueva Requisición</Button>
        </div>
        <List sx={{ width: '100%',  bgcolor: 'background.paper' }}>
            {
                requisiciones.map(requisicion => (
                    <>
                        <ListItem 
                            alignItems="flex-start"
                            secondaryAction={
                                <IconButton edge="end" aria-label="comments">
                                  <EditIcon />
                                </IconButton>
                              }>
                            <ListItemText
                                primary={requisicion.usuario.nombre}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {`Fecha de entrega: ${requisicion.fecha}`}
                                        </Typography>
                                        {` - Proyecto: ${requisicion.proyecto.nombre}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>
                ))
            }
        </List>
        </div>
      </PapperBlock>
    </div>
  );
}

export default ListaRequisiciones;
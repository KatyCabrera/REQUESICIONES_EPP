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
import axios from 'axios';
import { formatDate } from '../../utils/general';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRequisicion } from '../../redux/actions/requisicionesActions';

function getRequisiciones(userId, rol) {
  return new Promise((resolve, reject) => {
      const url = rol === 'Admin' ? 'requisiciones/equiposProteccion' 
        : `requisiciones/usuario/${userId}`;
      axios.get(url)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
  });
}

function ListaRequisiciones() {
  const title = 'Lista Requisiciones';
  const description = 'Requisiciones de equipo de seguridad';
  const [requisiciones, setRequisiciones] = React.useState([]);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer && state.userReducer.userData);

  React.useEffect(() => {
    getRequisiciones(userData.id, userData.rol).then(data => setRequisiciones(data || []));
  }, []);

  const history = useHistory();

  function handleCreateRequisicion() {
    history.push("/app/requisiciones");
  }

  function handleSelectRequisicion(requisicion) {
    dispatch(setSelectedRequisicion(requisicion));
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
                            key={requisicion.id}
                            alignItems="flex-start"
                            secondaryAction={
                                <IconButton onClick={() => handleSelectRequisicion(requisicion)} edge="end" aria-label="comments">
                                  <EditIcon />
                                </IconButton>
                              }>
                            <ListItemText
                                primary={
                                  <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline', marginRight: 2 }}
                                            component="span"
                                            variant="subtitle2"
                                            color="text.secondary"
                                        >
                                            {requisicion.proyecto}
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {`Cliente: ${requisicion.cliente}`}
                                        </Typography>
                                    </React.Fragment>
                                }
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline', marginRight: 2 }}
                                            component="span"
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {`Fecha de entrada: ${formatDate(requisicion.fecha_entrada)}`}
                                        </Typography>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {`Fecha de salida: ${formatDate(requisicion.fecha_salida)}`}
                                        </Typography>
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
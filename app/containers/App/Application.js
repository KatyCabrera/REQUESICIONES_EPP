import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Table,
  Error,
  NotFound,
  Requisiciones,
  ListaRequisiciones,
  Usuario,
  SolicitudRequisicion,
  Almacen,
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route exact path="/app" component={BlankPage} />
        <Route exact path="/app/Usuario" component={Usuario} />
        <Route path="/app/pages/dashboard" component={DashboardPage} />
        <Route path="/app/pages/form" component={Form} />
        <Route path="/app/pages/table" component={Table} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route exact path="/app/pages" component={Parent} />
        <Route path="/app/requisiciones" component={Requisiciones} />
        <Route path="/app/lista-requisiciones" component={ListaRequisiciones} />
        <Route path="/app/solicitud-requisicion" component={SolicitudRequisicion} />
        <Route path="/app/almacen" component={Almacen} />
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;

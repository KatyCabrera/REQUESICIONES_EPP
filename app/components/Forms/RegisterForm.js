import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';
import AllInclusive from '@mui/icons-material/AllInclusive';
import Brightness5 from '@mui/icons-material/Brightness5';
import People from '@mui/icons-material/People';
import Icon from '@mui/material/Icon';
import useMediaQuery from '@mui/material/useMediaQuery';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import useStyles from './user-jss';
import CircularProgress from '@mui/material/CircularProgress';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^(?:\+1)?\s?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/i.test(value)
    ? 'Formato de teléfono incorrecto'
    : undefined
);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.password) {
    return 'Las contraseñas no son iguales';
  }
  return undefined;
};

const username = (value) => (value && !/^[a-zA-Z0-9]+$/i.test(value) ?
      'Formato de usuario incorrecto. No use caracteres especiales ni espacios':
      undefined
)

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const { classes, cx } = useStyles();
  const [tab, setTab] = useState(0);

  const mdUp = useMediaQuery(theme => theme.breakpoints.up('md'));
  const mdDown = useMediaQuery(theme => theme.breakpoints.down('md'));

  const {
    handleSubmit,
    pristine,
    submitting,
    deco
  } = props;
  console.log(props.error);
  return (
    <Fragment>
      {!mdUp && (
        <NavLink to="/" className={cx(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      )}
      <Paper className={cx(classes.paperWrap, deco && classes.petal)}>
        {!mdDown && (
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
              <Icon className={classes.icon}>arrow_forward</Icon>
              Ya tienes una cuenta ?
            </Button>
          </div>
        )}
        <Typography variant="h4" className={classes.title} gutterBottom>
          Registrar
        </Typography>
        <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Crea tu usario de manera simple
        </Typography>
        <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl variant="standard" className={classes.formControl}>
                  <Field
                    name="name"
                    component={TextFieldRedux}
                    placeholder="Ingrese se usuario"
                    label="Ingrese un nombre de usuario sin caracteres especiales ni espacios"
                    required
                    validate={[required, username]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl variant="standard" className={classes.formControl}>
                  <Field
                    name="phone"
                    component={TextFieldRedux}
                    placeholder="Ingresa tu teléfono"
                    label="Ingresa tu teléfono de 10 dígitos"
                    required
                    validate={[required, email]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl variant="standard" className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type="password"
                    label="Your Password"
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl variant="standard" className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldRedux}
                    type="password"
                    label="Re-type Password"
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              {/*<div>
                <FormControlLabel
                  control={(
                    <Field name="checkbox" component={CheckboxRedux} required className={classes.agree} />
                  )}
                  label="Agree with"
                />
                <a href="#" className={classes.link}>Terms &amp; Condition</a>
                  </div>*/}
              <div>
                <Typography variant="body2" gutterBottom>
                  {props.error}
                </Typography>
              </div>
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit">
                  Registrarme
                  <ArrowForward className={cx(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine || props.isLoading} />
                </Button>
              </div>
              <div className={classes.btnArea}>
                {
                  props.isLoading ? 
                    <CircularProgress size={24} />: null
                }
              </div>
              
              {!mdUp && (
                <div className={classes.btnArea}>
                  <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
                    <Icon className={classes.icon}>arrow_forward</Icon>
                    Ya tienes una cuenta ?
                  </Button>
                </div>
              )}
            </form>
          </section>
        
      </Paper>
    </Fragment>
  );
}

RegisterForm.propTypes = {

  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: 'registerForm',
  enableReinitialize: true,
})(RegisterForm);

const RegisterFormMapped = connect(
  state => ({
    deco: state.ui.decoration
  }),
)(RegisterFormReduxed);

export default RegisterFormMapped;

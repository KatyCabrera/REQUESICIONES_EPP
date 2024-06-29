import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { RegisterForm } from 'dan-components';
import useStyles from 'dan-components/Forms/user-jss';
import { setUserData } from '../../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setToken } from '../../../utils/auth';
import axios from 'axios';

function registerUser(username, password, telefono, rol) {
  return new Promise((resolve, reject) => {
      const form = new URLSearchParams();
      form.append("username", username);
      form.append("password", password);
      form.append("telefono", telefono);
      form.append("rol", rol);

      axios.post(`users/register`, form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
  });
}

function Register() {
  
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { classes } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

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

  const submitForm = values => {
    setError('');
    const isComplete = values.name && values.password 
      && values.passwordConfirm && values.phone;
    if (!isComplete) {
      setError('Ingrese todos los datos');
      return;
    }

    const validPhone = email(values.phone);
    if (validPhone) {
      setError(validPhone);
      return;
    }

    const validPass = passwordsMatch(values.passwordConfirm, values);
    if (validPass) {
      setError(validPass);
      return;
    }

    const validUsername = username(values.name);
    if (validUsername) {
      setError(validUsername);
      return;
    }
    setIsLoading(true);
    registerUser(values.name, values.password, values.phone, "Regular")
      .then(userRes => {
        dispatch(setUserData(userRes));
        setToken(`${values.name}&${values.password}`);
        setIsLoading(false);
        history.push('/app/lista-requisiciones/Lista-requisiciones');
      })
      .catch(() => {
        setIsLoading(false);
        setError("No se pudo registrar usuario");
      });
  };

  const title = brand.name + ' - Register';
  const description = brand.desc;

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <RegisterForm error={error} 
              onSubmit={(values) => submitForm(values)} 
              isLoading={isLoading}/>
        </div>
      </div>
    </div>
  );
}

export default Register;

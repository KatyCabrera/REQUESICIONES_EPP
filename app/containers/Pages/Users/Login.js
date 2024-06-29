import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { LoginForm } from 'dan-components';
import useStyles from 'dan-components/Forms/user-jss';
import { setUserData } from '../../../redux/actions/userActions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setToken } from '../../../utils/auth';
import axios from 'axios';

function getLoginUser(username, password) {
  return new Promise((resolve, reject) => {
      const form = new URLSearchParams();
      form.append("username", username);
      form.append("password", password);
      axios.post(`/users/login`, form, {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => resolve(response.data))
        .catch(error => reject(error))
  });
}

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { classes } = useStyles();
  const [ errorLogin, setErrorLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const submitForm = values => {
    setErrorLogin(false);
    setIsLoading(true);
    getLoginUser(values.username, values.password)
      .then(user => {
        dispatch(setUserData(user));
        setToken(`${values.username}&${values.password}`);
        history.push('/app/lista-requisiciones/Lista-requisiciones');
        setIsLoading(false);
      })
      .catch(() => {
        setErrorLogin(true);
        setIsLoading(false);
      });
    
  };

  const title = brand.name + ' - Login';
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
          <LoginForm errorLogin={errorLogin} 
              onSubmit={(values) => submitForm(values)}
              isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { useSelector , useDispatch} from 'react-redux';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper from './ThemeWrapper';
import { getToken } from '../../utils/auth';
import { setUserData } from '../../redux/actions/userActions';
import axios from 'axios';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

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

function App(props) {
  const { history } = props;
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer && state.userReducer.userData);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const userpass = token.split("&");
      getLoginUser(userpass[0], userpass[1])
        .then(data => {
          dispatch(setUserData(data));
        })
        .catch(() => {

        });
    }
  }, []);

  return (
    <ThemeWrapper>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={LoginDedicated} />
          {
            userData ? 
              <Route path="/app" component={Application} /> 
              : null
          }      
          <Route component={Auth} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ThemeWrapper>
  );
}

App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default App;

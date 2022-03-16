import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import LoginForm from './components/LoginForm/index';
// import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Homepage from './components/Homepage/Homepage';
import NavBar from './components/NavBar/NavBar';
import Spots from './components/Spots/Spots';
import SpotPage from './components/SpotPage/SpotPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path='/' exact={true} >
          <Homepage />
        </Route>

        <Route path='/spots' exact={true}>
          <Spots />
        </Route>

        <Route path='/spots/:spotId'>
          <SpotPage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;

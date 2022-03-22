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
import SpotPage from './components/Spots/SpotPage/SpotPage';
import NewSpot from './components/Spots/NewSpot/NewSpot';
import UserBookings from './components/UserBookingPage/UserBookings';
import PageNotFound from './components/PageNotFound/PageNotFound';

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

        <Route path='/spots/hosting' exact={true}>
          <NewSpot />
        </Route>

        <Route path='/spots/:spotId' exact={true}>
          <SpotPage />
        </Route>

        <ProtectedRoute path='/bookings/:userId' >
          <UserBookings />
        </ProtectedRoute>

        <Route path={'/'}>
          <PageNotFound path='/' />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;

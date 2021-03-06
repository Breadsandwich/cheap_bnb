import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import Homepage from './components/Homepage/Homepage';
import NavBar from './components/NavBar/NavBar';
import Spots from './components/Spots/Spots';
import SpotPage from './components/Spots/SpotPage/SpotPage';
import NewSpot from './components/Spots/NewSpot/NewSpot';
import PageNotFound from './components/PageNotFound/PageNotFound';
import { getAllSpots } from './store/spots';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(getAllSpots())
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

        <Route path='/error'>
           <PageNotFound />
        </Route>

        <Route path='/'>
          <PageNotFound />
        </Route>


      </Switch>
    </BrowserRouter>
  );
}

export default App;

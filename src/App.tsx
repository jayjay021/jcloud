import React from 'react';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import { GridMain } from 'Layout';

import { Redirect, Route, Switch, useLocation } from 'react-router';
import LoadingScreen from 'views/LoadingScreen';
import { Paper } from '@mui/material';
import Settings from 'views/Settings';
import SignIn from 'views/auth/SignIn';
import SignUp from 'views/auth/SignUp';
import { LocationState } from 'types/LocationType';
import FilesRouter from 'views/Files';
import PhotosRouter from 'views/Photos';

export default function App() {
  const location = useLocation<LocationState>();
  if (location.pathname.match(/^\/auth/)) {
    return (
      <GridMain>
        <Switch>
          <Route exact path='/auth/signin'>
            <SignIn />
          </Route>
          <Route exact path='/auth/signup'>
            <SignUp />
          </Route>
        </Switch>
      </GridMain>
    );
  }
  return (
    <>
      <Header />
      <Sidebar />

      <GridMain>
        <Paper square elevation={1} sx={{ width: '100%', height: '100%' }}>
          <Switch>
            <Route path='/' exact>
              <Redirect from='/' to='/files' />
            </Route>
            <Route path='/files'>
              <FilesRouter />
            </Route>
            <Route path='/photos'>
              <PhotosRouter />
            </Route>
            <Route path='/security'>
              <LoadingScreen />
            </Route>
            <Route path='/settings'>
              <Settings />
            </Route>
          </Switch>
        </Paper>
      </GridMain>

      <Footer />
    </>
  );
}

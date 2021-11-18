import React from 'react';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import { GridMain } from 'Layout';

import { Redirect, Route, Switch } from 'react-router';
import LoadingScreen from 'views/LoadingScreen';
import { Box, Paper } from '@mui/material';
import Settings from 'views/Settings';

export default function App() {
  return (
    <>
      <Header />
      <Sidebar />

      <GridMain>
        <Paper square elevation={1} sx={{ width: '100%', height: '100%' }}>
          <Switch>
            <Route path='/' exact>
              <Redirect from='/' to='/apps' />
            </Route>
            <Route path='/dashboard'>
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

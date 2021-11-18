import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/system';
import { theme } from 'theme';
import { Layout } from 'Layout';
import SidebarStatusProvider from 'components/Sidebar/SidebarStatusContext';
import { CssBaseline } from '@mui/material';
import Auth0ProviderWithHistory from 'components/Auth/Auth0ProviderWithHistory';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import AuthWrapper from 'components/Auth/AuthWrapper';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Auth0ProviderWithHistory>
        <ThemeProvider theme={theme}>
          <Layout>
            <SidebarStatusProvider>
              <CssBaseline />
              <AuthWrapper>
                <App />
              </AuthWrapper>
            </SidebarStatusProvider>
          </Layout>
        </ThemeProvider>
      </Auth0ProviderWithHistory>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

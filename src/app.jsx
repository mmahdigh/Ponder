import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import GlobalStyles from './global-styles';
import Layout from './components/layout';
import MasterErrorBoundary from './components/master-error-boundary';
import Routes from './routes';
import ToastProvider from './providers/toast';

const history = createBrowserHistory();

function App() {
  return (
    <MasterErrorBoundary>
      <ToastProvider>
        <Router history={history}>
          <GlobalStyles />
          <Layout>
            <Routes />
          </Layout>
        </Router>
      </ToastProvider>
    </MasterErrorBoundary>
  );
}

export default App;

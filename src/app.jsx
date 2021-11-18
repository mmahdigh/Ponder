import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import GlobalStyles from './global-styles';
import Layout from './components/layout';
import MasterErrorBoundary from './components/master-error-boundary';
import Routes from './routes';
import GlobalProviders from './providers';

const history = createBrowserHistory();

function App() {
  return (
    <GlobalProviders>
      <Router history={history}>
        <MasterErrorBoundary>
          <GlobalStyles />
          <Layout>
            <Routes />
          </Layout>
        </MasterErrorBoundary>
      </Router>
    </GlobalProviders>
  );
}

export default App;

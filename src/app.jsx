import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import GlobalStyles from './global-styles';
import Layout from './components/layout';
import MasterErrorBoundary from './components/master-error-boundary';
import Routes from './routes';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <GlobalStyles />
      <MasterErrorBoundary>
        <Layout>
          <Routes />
        </Layout>
      </MasterErrorBoundary>
    </Router>
  );
}

export default App;

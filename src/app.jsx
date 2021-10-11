import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Layout from './components/layout';
import ArweaveProvider from './providers/arweave';
import Routes from './routes';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <ArweaveProvider>
        <Layout>
          <Routes />
        </Layout>
      </ArweaveProvider>
    </Router>
  );
}

export default App;

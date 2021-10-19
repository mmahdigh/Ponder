import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createStore from './store';
import Layout from './components/layout';
import MasterErrorBoundary from './components/master-error-boundary';
import ArweaveProvider from './providers/arweave';
import Routes from './routes';

const store = createStore();
const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <MasterErrorBoundary>
          <ArweaveProvider>
            <Layout>
              <Routes />
            </Layout>
          </ArweaveProvider>
        </MasterErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;

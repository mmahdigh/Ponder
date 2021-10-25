import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import GlobalStyles from './global-styles';
import Layout from './components/layout';
import MasterErrorBoundary from './components/master-error-boundary';
import Routes from './routes';
import ToastProvider from './providers/toast';
import SubscriptionsProvider from './providers/subscriptions';

const history = createBrowserHistory();

function App() {
  return (
    <ToastProvider>
      <SubscriptionsProvider>
        <Router history={history}>
          <MasterErrorBoundary>
            <GlobalStyles />
            <Layout>
              <Routes />
            </Layout>
          </MasterErrorBoundary>
        </Router>
      </SubscriptionsProvider>
    </ToastProvider>
  );
}

export default App;

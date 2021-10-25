import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const SubscriptionsContext = createContext();

function SubscriptionsProvider({ children }) {
  const [subscriptions, setSubscriptions] = useState([]);

  return (
    <SubscriptionsContext.Provider
      value={{}}
    >
      {children}
    </SubscriptionsContext.Provider>
  );
}

SubscriptionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SubscriptionsProvider;

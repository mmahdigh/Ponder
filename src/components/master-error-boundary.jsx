import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MasterErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      error: null,
      info: null,
    };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    const { children } = this.props;
    const { error, info } = this.state;

    return error ? (
      <div>
        <p>{info}</p>
        <pre>{error.toString()}</pre>
      </div>
    ) : children;
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class MasterErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
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
    const { children, history } = this.props;
    const { error, info } = this.state;

    return error ? (
      <div>
        <p>{info}</p>
        <pre>{error.toString()}</pre>
        <Button
          variant="warn"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </div>
    ) : children;
  }
}

export default withRouter(MasterErrorBoundary);

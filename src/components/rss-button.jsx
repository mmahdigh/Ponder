import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { FaRss, FaPlus, FaMinus } from 'react-icons/fa';

const PlusIcon = styled(FaPlus)`
  position: absolute;
  right: 4px;
  top: 4px;
  font-size: .7rem;
`;

const MinusIcon = styled(FaMinus)`
  position: absolute;
  right: 4px;
  top: 4px;
  font-size: .7rem;
`;

function RssButton({
  className,
  removeButton,
  disabled,
  onClick,
  ...props
}) {
  return (
    <Button
      className={className}
      type={onClick ? 'button' : 'submit'}
      variant={removeButton ? 'danger' : 'info'}
      onClick={onClick}
      {...props}
    >
      <FaRss />
      {removeButton ? (
        <MinusIcon />
      ) : (
        <PlusIcon />
      )}
    </Button>
  );
}

RssButton.propTypes = {
  className: PropTypes.string,
  removeButton: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

RssButton.defaultProps = {
  className: null,
  removeButton: false,
  disabled: false,
  onClick: null,
};

export default RssButton;

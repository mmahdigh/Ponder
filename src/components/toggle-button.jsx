import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { MdOutlineOpenInFull, MdOutlineCloseFullscreen } from 'react-icons/md';
import PropTypes from 'prop-types';

const BtnIconOpen = styled(MdOutlineOpenInFull)`
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const BtnIconClose = styled(MdOutlineCloseFullscreen)`
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const Btn = styled(Button)`
  align-items: center;
  background-color: #030303;
  border: 1px solid transparent;
  box-shadow: none !important;
  border-radius: 50%;
  display: flex;
  height: 40px;
  justify-content: center;
  position: absolute;
  left: 35px;
  width: 40px;
  z-index: 9999;
  top: 250px;
`;
function ToggleBtn({
  collapseGroups,
  expandGroups,
  toggle,
}) {
  return (
    <Btn
      onClick={toggle ? expandGroups : collapseGroups}
    >
      {toggle ? <BtnIconOpen /> : <BtnIconClose /> }
    </Btn>
  );
}
ToggleBtn.propTypes = {
  collapseGroups: PropTypes.func.isRequired,
  expandGroups: PropTypes.func.isRequired,
  toggle: PropTypes.bool,
};

ToggleBtn.defaultProps = {
  toggle: false,
};
export default ToggleBtn;

import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import cytoscape from 'cytoscape';

const Wrapper = styled.div`
  min-height: 80vh;
  margin-top: .8rem;
`;

function Cytoscape() {
  const el = useRef();
  const [cy, setCy] = useState(null);

  useEffect(() => {
    setCy(cytoscape({
      container: el.current,
    }));
    return () => {
      cy.destroy();
    };
  }, []);

  return (
    <Wrapper ref={el} />
  );
}

export default Cytoscape;

import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { podcastPropType } from '../../prop-types';
import createCytoscape from './cytoscape';
import getElementsFromSubscriptions from './get-elements-from-subscriptions';

const Wrapper = styled.div`
  min-height: 600px;
  margin-top: .8rem;
  background-color: #202022;
`;

function Cytoscape({ subscriptions }) {
  const el = useRef();
  const [cy, setCy] = useState(null);
  const [selectedPodcast, setSelectedPodcast] = useState(null);

  useEffect(() => {
    const cyto = createCytoscape(el.current, getElementsFromSubscriptions(subscriptions), {
      setSelectedPodcast,
    });
    setCy(cyto);
    if (process.env.NODE_ENV !== 'production') window.cy = cyto;
    return () => {
      cyto.destroy();
    };
  }, []);

  return (
    <Wrapper ref={el} />
  );
}

Cytoscape.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape(podcastPropType).isRequired).isRequired,
};

export default Cytoscape;

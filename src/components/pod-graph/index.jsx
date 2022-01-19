import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { podcastPropType } from '../../prop-types';
import createCytoscape from './cytoscape';
import getElementsFromSubscriptions from './get-elements-from-subscriptions';
import PodcastDetails from '../podcast-details';
import ToggleBtn from '../toggle-button';

const MainCont = styled.div`
  position: relative;
`;
const Wrapper = styled.div`
  max-height: 600px;
  min-height: 600px;
  margin: 3.5rem .8rem .8rem .8rem;
  background-color: rgba(13, 13, 13, 1);
  border: 2px solid rgba(38,38,38,1);
  border-radius: 1rem;
  padding: 16px;
  @media only screen and (max-width: 960px) {
    min-height: 400px;
  }
`;

function PodGraph({ subscriptions }) {
  const el = useRef();
  const [cy, setCy] = useState(null);
  const [selectedPodcastId, setSelectedPodcastId] = useState(null);
  const [toggle, setToggle] = useState(false);
  const selectedPodcast = subscriptions
    .find(subscription => subscription.subscribeUrl === selectedPodcastId);

  if (selectedPodcastId && !selectedPodcast) {
    console.warn('Could not find a podcast with the selected ID. You should not be seeing this :)');
  }

  useEffect(() => {
    el.current.addEventListener('click', event => {
      const cardEl = Array.from(document.querySelectorAll('.pod-graph-card'))
        .find(card => card.contains(event.target));
      if (cardEl) setSelectedPodcastId(cardEl.dataset.id);
    });
  }, []);

  useEffect(() => {
    const cyto = createCytoscape(el.current, getElementsFromSubscriptions(subscriptions), {
      setSelectedPodcast: () => {},
    });
    setCy(cyto);
    if (process.env.NODE_ENV !== 'production') window.cy = cyto;
    return () => {
      cyto.destroy();
    };
  }, [subscriptions]);

  // toggle btn ONLY  USED FOR DEBUGGING
  const collapseGroups = () => {
    setToggle(!toggle);
    const api = cy.expandCollapse();
    api.collapseAll();
    cy.fit();
    cy.zoom({
      level: 1.0, // the zoom level
      position: { x: 0, y: 0 },
    });
  };
  const expandGroups = () => {
    setToggle(!toggle);
    const api = cy.expandCollapse();
    api.expandAll();
    cy.fit();
    cy.zoom({
      level: 1.0, // the zoom level
      position: { x: 0, y: 0 },
    });
  };
  return (
    <MainCont>
      <Wrapper ref={el} />
      <ToggleBtn
        collapseGroups={collapseGroups}
        expandGroups={expandGroups}
        toggle={toggle}
      />
      <PodcastDetails
        {...selectedPodcast}
        isOpen={!!selectedPodcast}
        close={() => setSelectedPodcastId(null)}
      />
    </MainCont>
  );
}

PodGraph.propTypes = {
  subscriptions: PropTypes.arrayOf(PropTypes.shape(podcastPropType).isRequired).isRequired,
};

export default PodGraph;

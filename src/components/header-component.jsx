import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  InputGroup, Form, Image,
} from 'react-bootstrap';
import { ToastContext } from '../providers/toast';
import RssButton from './rss-button';
import Logo from './assets/img/pot.svg';
import SyncButton from './sync-button';
import RefreshButton from './refresh-button';

const HeaderContainer = styled.div`
    display: flex;
    color: white;
    align-items: center;
    justify-content: space-between;
    `;

const ImageWrapper = styled.div`
    padding-right: 0.625rem;
    `;

const FormLayer = styled.div`
    padding: 0.375rem;
    padding-right: 2rem;
    padding-left: 1.25rem;
    border-radius: 9999px;
    overflow: hidden;
    align-items: center;
    background-color: #1a1a1a;
    border: rgba(38, 38, 38, 1) solid 2px;
    width: 100%;
    height: 2.5rem;
    display: flex;
    margin-right: 0.625rem;
`;

const ImageLogo = styled(Image)`
    box-sizing: border-box;
    padding: 0;
    border: none;
    margin: auto;
    object-fit: contain;
    vertical-align: middle;
`;

const PodAlert = styled.div`
    border: 2px solid gray;
    border-radius: 9999px;
    flex-shrink: 0;
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    width: 1rem;
    height: 1rem;

`;

const FormWrapper = styled.div`
    width: 100%;
`;

const CallToActions = styled.div`
    border: rgba(38, 38, 38, 1) solid 2px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    height: 2.5rem;
    @media (min-width: 320px) and (max-width: 480px) {
    padding: 0;
    border: none;
}
`;

function HeaderComponent({ onSubmit }) {
  const toast = useContext(ToastContext);
  const [isSearching, setIsSearching] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const query = fd.get('query');
    if (query) {
      setIsSearching(true);
      try {
        await onSubmit({ query });
        event.target.reset();
      } catch (ex) {
        console.error(ex);
        toast('Could not find podcast.', { variant: 'danger' });
      } finally {
        setIsSearching(false);
      }
    }
  }

  return (
    <HeaderContainer>
      <ImageWrapper>
        <ImageLogo
          alt=""
          src={Logo}
          width="52"
          height="54"
        />{' '}
      </ImageWrapper>
      <FormLayer>
        <PodAlert>
          {/* <SiGooglepodcasts /> */}
        </PodAlert>
        <FormWrapper>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="query">
              <InputGroup>
                <Form.Control
                  name="query"
                  disabled={isSearching}
                  placeholder="https://feeds.simplecast.com/dHoohVNH"
                />
                <RssButton disabled={isSearching} />
              </InputGroup>
            </Form.Group>
          </Form>
        </FormWrapper>
      </FormLayer>
      <CallToActions>
        <SyncButton />
        <RefreshButton />
      </CallToActions>
    </HeaderContainer>

  );
}

HeaderComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default HeaderComponent;

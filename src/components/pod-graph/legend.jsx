import React from 'react';
import styled from 'styled-components';
import { AiOutlineLine, AiOutlineSmallDash, AiOutlineStar } from 'react-icons/ai';

const LegendNav = styled.nav`
  /* margin-left: auto;
  width: 10.5rem; */

  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
  }

  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 1rem;
    padding-left: 1rem;
    width: 50%;
    color: var(--color-label);
    text-transform: lowercase;
  }

  svg {
    font-size: 20px;
  }
`;

function PodGraphLegend() {
  return (
    <LegendNav>
      <ul>
        <li>
          <AiOutlineStar />
          New Episode
        </li>
        <li>
          <AiOutlineStar />
          New Discussion
        </li>
        <li>
          <AiOutlineLine />
          Subscribed
        </li>
        <li>
          <AiOutlineSmallDash />
          Related
        </li>
      </ul>
    </LegendNav>
  );
}

export default PodGraphLegend;

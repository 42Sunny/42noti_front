import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  handleUpdaterEvents,
  useEventsDispatch,
  useEventsState,
} from '../contexts/EventContext';

const Header = () => {
  const dispatch = useEventsDispatch();
  const state = useEventsState();

  const updateEvents = (): void => {
    handleUpdaterEvents(dispatch, state.events.data);
  };

  return (
    <StyledHeader>
      <Link to="/" onClick={updateEvents}>
        <h1>42 MEETUP</h1>
      </Link>
      <Link to="/my">
        <span>내 이벤트</span>
      </Link>
    </StyledHeader>
  );
};

export default React.memo(Header);

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 640px;
  background-color: white;
  height: 52px;
  /* border-bottom: 1px solid var(--darksnow); */
  padding: 0 16px;
  z-index: 10;
  h1 {
    font-size: 1.2rem;
    line-height: 52px;
    font-weight: 600;
  }
  a {
    font-size: 1rem;
    line-height: 52px;
    font-weight: 600;
  }
`;

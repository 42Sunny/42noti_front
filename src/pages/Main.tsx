import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList, { StyledNodata } from '../components/EventList';
import MainSkeleton from '../components/MainSkeleton';
import Icon from '../components/Icon';

import {
  useEventsState,
  useEventsDispatch,
  fetchEventsForce,
} from '../contexts/EventContext';
import { filterUpcomingEvents } from '../utils/time';
import { Event } from '../types/event';
import PastedEvents from '../components/PastedEvents';

const MainPage = () => {
  const eventState = useEventsState();
  const eventDispatch = useEventsDispatch();
  const { data: events, loading, error } = eventState.events;
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    if (events === null) return;
    const upcomingEvents = filterUpcomingEvents(events);
    setUpcomingEvents(upcomingEvents);
  }, [events]);
  console.log(process.env.REACT_APP_ENV, process.env.REACT_APP_42EVENT_API_URL);
  return (
    <>
      <Header />
      {loading ? (
        <MainSkeleton />
      ) : error ? (
        <StyledSection>
          <StyledNodata>
            <div>🧐</div>
            Error! 데이터를 불러오지 못했습니다.
            <br />
            잠시 후 다시 이용해 주세요 !
          </StyledNodata>
        </StyledSection>
      ) : (
        <StyledSection>
          <StyledContentTitle>
            <h1>다가오는 이벤트</h1>
            <SyncButton onClick={() => fetchEventsForce(eventDispatch)}>
              <Icon size={15} color="var(--lightgray)" icon="sync" />
            </SyncButton>
          </StyledContentTitle>
          <EventList events={upcomingEvents} />
          <StyledContentTitle>
            <h1>지나간 이벤트</h1>
          </StyledContentTitle>
          <PastedEvents />
        </StyledSection>
      )}
      <Footer />
    </>
  );
};

export const StyledSection = styled.section`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  flex-direction: column;
  background: var(--snow);
  padding: 68px 18px 18px 18px;
  text-align: left;
`;

const StyledContentTitle = styled.div`
  width: 100%;
  display: flex;
  margin: 6px 0 10px;
  h1 {
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: var(--black);
  }
`;

const SyncButton = styled.button`
  margin-left: 3px;
  background: none;
  border: none;
  transition: transform 0.3s;
  padding: 4px;
  &:active svg {
    transform: rotate(-180deg);
    transition: transform 0.4s;
  }
`;

// const StyledEvents = styled.div`
//   width: 100%;
//   h2 {
//     font-size: 0.8rem;
//     letter-spacing: -0.3px;
//     color: var(--darkgray);
//     margin-bottom: 9px;
//   }
// `;

export default MainPage;

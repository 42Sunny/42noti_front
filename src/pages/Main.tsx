import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList from '../components/EventList';
import MainSkeleton from '../components/MainSkeleton';
import Icon from '../components/Icon';
import { useEventsDispatch, useEventsState } from '../contexts/EventContext';
import { useUserDispatch } from '../contexts/UserContext';
import { filterUpcomingEvents } from '../utils/time';
import { Event } from '../types/event';

const MainPage = () => {
  const navigate = useNavigate();
  const eventState = useEventsState();
  const eventDispatch = useEventsDispatch();
  const userDispatch = useUserDispatch();
  const { data: events, loading, error } = eventState.events;
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    // 로컬에서 작업할때 아래 조건문 주석처리
    // if (!document.cookie) {
    //   navigate('/login');
    //   userDispatch({ type: 'SET_LOGOUT' });
    //   return;
    // }
    userDispatch({ type: 'SET_LOGIN' });
    const upcomingEvents =
      events !== null ? filterUpcomingEvents(events) : null;
    events && setUpcomingEvents(upcomingEvents);
  }, [events, navigate, userDispatch, eventState, eventDispatch]);
  /*TODO: 지나간 이벤트 관련 API 연동, 무한 스크롤 */
  return (
    <>
      <Header />
      {loading || (!error && events === null) ? (
        <MainSkeleton />
      ) : (
        <StyledSection>
          <StyledContentTitle>
            <h1>다가오는 이벤트</h1>
            <Icon size={15} color="var(--lightgray)" icon="sync" />
          </StyledContentTitle>
          <EventList events={upcomingEvents} />
          <StyledContentTitle>
            <h1>지나간 이벤트</h1>
          </StyledContentTitle>
          <EventList events={events} />
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
  margin: 4px 0 12px;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  h1 {
    color: var(--black);
    margin-right: 5px;
  }
  span {
    color: var(--blue);
  }
  svg {
    margin: 4px 0 0 2px;
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

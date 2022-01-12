import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventList, { StyledNodata } from '../components/EventList';
import MainSkeleton from '../components/MainSkeleton';
import Icon from '../components/Icon';

import { useEventsState } from '../contexts/EventContext';
import { useUserDispatch } from '../contexts/UserContext';
import { filterUpcomingEvents, filterPastEvents } from '../utils/time';
import { Event } from '../types/event';

const MainPage = () => {
  const navigate = useNavigate();
  const eventState = useEventsState();
  const userDispatch = useUserDispatch();
  const { data: events, loading, error } = eventState.events;
  const [upcomingEvents, setUpcomingEvents] = useState<Event[] | null>(null);
  const [pastEvents, setPastEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    // 로컬에서 작업할때 아래 조건문 주석처리
    // if (!document.cookie) {
    //   navigate('/login');
    //   userDispatch({ type: 'SET_LOGOUT' });
    //   return;
    // }
    userDispatch({ type: 'SET_LOGIN' });
  }, [navigate, userDispatch]);

  useEffect(() => {
    if (events === null) return;
    const upcomingEvents = filterUpcomingEvents(events);
    setUpcomingEvents(upcomingEvents);
    const pastEvents = filterPastEvents(events);
    setPastEvents(pastEvents);
  }, [events]);
  /*TODO: 지나간 이벤트 관련 API 연동, 무한 스크롤, error 일때 어떻게 표현할지  */

  return (
    <>
      <Header />
      {loading ? (
        <MainSkeleton />
      ) : error ? (
        <StyledNodata>
          <div>🧐</div>
          Error! 데이터를 불러오지 못했습니다.
          <br />
          잠시 후 다시 이용해 주세요 !
        </StyledNodata>
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
          <EventList events={pastEvents} />
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

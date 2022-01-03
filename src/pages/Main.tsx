import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';
import EventCard from '../components/EventCard';
import MainSkeleton from '../components/MainSkeleton';
import UpdatedEventCard from '../components/UpdatedEventCard';
import {
  fetchEvents,
  useEventsDispatch,
  useEventsState,
} from '../contexts/EventContext';
import { useUserDispatch, useUserState } from '../contexts/UserContext';
import { filterUpcomingEvents, filterUpdatedEvents } from '../utils/time';
import { Event } from '../types/event';

const MainPage = () => {
  const navigate = useNavigate();
  const eventState = useEventsState();
  const eventDispatch = useEventsDispatch();
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const { data: events, loading } = eventState.events;
  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [updatedEvents, setUpdatedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!document.cookie) {
      navigate('/login');
      userDispatch({ type: 'SET_LOGOUT' });
    }
    if (!events) {
      fetchEvents(eventDispatch);
    }
    userDispatch({ type: 'SET_LOGIN' });
    const filteredEvents = filterUpcomingEvents(events);
    const updatedEvents = filterUpdatedEvents(filteredEvents);
    setAllEvents(filteredEvents);
    setUpdatedEvents(updatedEvents);
    console.log(eventState, userState);
  }, [events, navigate, userDispatch, eventState, eventDispatch]);

  return (
    <>
      <Header />
      {loading || !allEvents || !updatedEvents ? (
        <MainSkeleton />
      ) : (
        <StyledSection>
          {updatedEvents.length > 0 && (
            <StyledContentTitle>
              <h1>업데이트 된 이벤트</h1>
              <span>{updatedEvents.length}</span>
            </StyledContentTitle>
          )}
          {updatedEvents.map((event: Event) => {
            return (
              <StyledEvents key={event.id}>
                <Link to={`/detail/${event.id}`}>
                  <UpdatedEventCard event={event} />
                </Link>
              </StyledEvents>
            );
          })}
          <StyledContentTitle>
            <h1>다가오는 이벤트</h1>
          </StyledContentTitle>
          {allEvents.map((event: Event) => {
            let yearMonth = null;
            let eventDate = new Date(event.beginAt);
            if (months[eventDate.getMonth()] === 0) {
              yearMonth = `${eventDate.getFullYear()}년 ${
                eventDate.getMonth() + 1
              }월`;
              months[eventDate.getMonth()] = 1;
            }

            return (
              events.length > 0 && (
                <StyledEvents key={event.id}>
                  {yearMonth && <h2>{yearMonth}</h2>}
                  <Link to={`/detail/${event.id}`}>
                    <EventCard event={event} />
                  </Link>
                </StyledEvents>
              )
            );
          })}
          {events.length === 0 && (
            <StyledNodata>이벤트가 없습니다 ☹</StyledNodata>
          )}
        </StyledSection>
      )}
      <Footer />
    </>
  );
};

export const StyledSection = styled.section`
  display: flex;
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
`;

const StyledNodata = styled(StyledContentTitle)`
  display: inline-block;
  text-align: center;
  color: #808080;
`;

export const StyledEvents = styled.div`
  width: 100%;
  h2 {
    font-size: 0.8rem;
    letter-spacing: -0.3px;
    color: var(--darkgray);
    margin-bottom: 9px;
  }
`;

export default MainPage;

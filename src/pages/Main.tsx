import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import EventCard from '../components/EventCard';
import EventCategory from '../components/EventCategory';
import UpdatedEventCard from '../components/UpdatedEventCard';
import MainSkeleton from '../components/MainSkeleton';
import Footer from '../components/Footer';

import {
  fetchEvents,
  useEventsDispatch,
  useEventsState,
} from '../contexts/EventContext';
import { handleKRDiffTime } from '../utils/time';
import { Event } from '../types/event';

const MainPage = () => {
  const state = useEventsState();
  const dispatch = useEventsDispatch();
  const { data: events, loading } = state.events;
  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [updatedEvents, setUpdatedEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (!events) {
      fetchEvents(dispatch);
    }
    const filteredEvents = filterUpcomingEvents(events);
    const updatedEvents = filterUpdatedEvents(filteredEvents);
    setAllEvents(filteredEvents);
    setUpdatedEvents(updatedEvents);
  }, [events, dispatch]);

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
          <EventCategory />
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

export const filterUpcomingEvents = (events: Array<Event>): Array<Event> => {
  const upcomingEvents = events.filter((event) => {
    const date = event?.beginAt.split('T')[0];
    const today = new Date();
    today.setHours(24, 0, 0, 0);
    return new Date(date).getTime() >= today.getTime();
  });
  return upcomingEvents;
};

const filterUpdatedEvents = (events: Array<Event>): Array<Event> => {
  //오늘 업데이트 된 일정들
  const lastMidnight = new Date();
  const now = new Date();
  lastMidnight.setHours(0, 0, 0, 0);
  const updatedEvents = events.filter((event) => {
    //const updated = new Date(event.updatedAt);
    //const created = new Date(event.createdAt);
    const updated = handleKRDiffTime(event.updatedAt);
    const created = handleKRDiffTime(event.createdAt);

    //자정 후에 업데이트가 되고, 생성날짜보다 업데이트 날짜가 최신일때, 지금은 더미데이터로 인해서 미래업데이트 날짜가 들어가면 (-)가 나오니까 지금보다 전에 일정만
    return lastMidnight < updated && created < updated && updated < now;
  });
  return updatedEvents;
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

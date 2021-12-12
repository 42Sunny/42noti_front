import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import { EventCard } from '../components/EventCard';
import { UpdatedEventCard } from '../components/UpdatedEventCard';
import { EventCategory } from '../components/EventCategory';

import { useEventsState, Event } from '../contexts/EventContext';

const MainPage = () => {
  const state = useEventsState();
  const { data: events, loading } = state.events;

  const week = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [updatedEvents, setUpdatedEvents] = useState<Event[]>([]);

  const filterPastEvents = (events: Array<Event>): Array<Event> => {
    return events.filter((event) => {
      const date = event?.beginAt.split('T')[0];
      let now = new Date();
      let today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
      );
      return new Date(date).getTime() >= today.getTime();
    });
  };

  const filterUpdatedEvents = (events: Array<Event>): Array<Event> => {
    //오늘 만들어진 일정들
    //오늘 업데이트 된 일정들
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    return events.filter((event) => {
      return (
        new Date(event.createdAt) < midnight &&
        new Date(event.createdAt) < new Date(event.updatedAt)
      );
    });
  };

  useEffect(() => {
    const filteredEvents = filterPastEvents(events);
    setAllEvents(filteredEvents);
    const updatedEvent = filterUpdatedEvents(filteredEvents);
    setUpdatedEvents(updatedEvent);
  }, [events]);

  if (loading) return <h1>loading...</h1>;
  return (
    <>
      <Header />
      <StyledSection>
        <StyledContentTitle>
          <h1>업데이트 된 이벤트</h1>
          <span>{updatedEvents.length}</span>
        </StyledContentTitle>
        {updatedEvents.map((event: Event) => {
          return (
            <StyledEvents key={event.id}>
              <Link to={`/detail/${event.id}`}>
                <UpdatedEventCard
                  title={event.title}
                  updatedAt={event.updatedAt}
                />
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
            yearMonth = `${eventDate.getFullYear()}년${
              eventDate.getMonth() + 1
            }월`;
            months[eventDate.getMonth()] = 1;
          }
          return (
            <StyledEvents key={event.id}>
              {yearMonth && <h2>{yearMonth}</h2>}
              <Link to={`/detail/${event.id}`}>
                <EventCard
                  week={week}
                  id={event.id}
                  beginAt={event.beginAt}
                  title={event.title}
                  tags={event.tags}
                  location={event.location}
                  category={event.category.toLowerCase()}
                />
              </Link>
            </StyledEvents>
          );
        })}
      </StyledSection>
    </>
  );
};

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: var(--snow);
  padding: 18px;
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

const StyledEvents = styled.div`
  width: 100%;
  h2 {
    font-size: 0.8rem;
    letter-spacing: -0.3px;
    color: var(--black);
    margin-bottom: 9px;
  }
`;

export default MainPage;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import { EventCard } from '../components/EventCard';
import { UpdatedEventCard } from '../components/UpdatedEventCard';
import { EventCategory } from '../components/EventCategory';

import { useEventsState, Event } from '../context/EventContext';

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
      <Content>
        <StyledContentTitleDiv>
          <ContentTitle>업데이트 된 이벤트</ContentTitle>
          <ContentTitleCount>{updatedEvents.length}</ContentTitleCount>
        </StyledContentTitleDiv>
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
      </Content>
      <Content>
        <StyledContentTitleDiv>
          <ContentTitle>다가오는 이벤트</ContentTitle>
        </StyledContentTitleDiv>
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
      </Content>
    </>
  );
};

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #e5e5e5;
  padding: 22px 22px 0 22px;
  text-align: left;
`;

const StyledContentTitleDiv = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 14px;
`;

const ContentTitle = styled.h1`
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #000000;
  text-align: left;
  margin-right: 5px;
`;
const ContentTitleCount = styled(ContentTitle)`
  color: #3ea2ff;
`;

const StyledEvents = styled.div`
  width: 100%;
  h2 {
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.3px;
    color: #000000;
    margin-bottom: 9px;
  }
`;

export default MainPage;

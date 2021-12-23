import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SubHeader from '../components/SubHeader';
import EventCard from '../components/EventCard';
import MainSkeleton from '../components/MainSkeleton';
import MyEventTab from '../components/MyEventTab';
import Footer from '../components/Footer';

import { StyledEvents } from './Main';
import { useEventsState } from '../contexts/EventContext';
import { Event } from '../types/event';

const MyEvent = () => {
  const state = useEventsState();
  const { data: userEvents, loading } = state.userEvents;

  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  console.log(state);
  return (
    <>
      <SubHeader title="내 이벤트" />
      <MyEventTab />
      {loading || !userEvents ? (
        <MainSkeleton />
      ) : (
        <MyEventSection>
          {userEvents.map((event: Event) => {
            let yearMonth = null;
            let eventDate = new Date(event.beginAt);
            if (months[eventDate.getMonth()] === 0) {
              yearMonth = `${eventDate.getFullYear()}년 ${
                eventDate.getMonth() + 1
              }월`;
              months[eventDate.getMonth()] = 1;
            }
            return (
              <StyledEvents key={event.id}>
                {yearMonth && <h2>{yearMonth}</h2>}
                <Link to={`/detail/${event.id}`}>
                  <EventCard event={event} />
                </Link>
              </StyledEvents>
            );
          })}
        </MyEventSection>
      )}
      <Footer />
    </>
  );
};

export default MyEvent;

const MyEventSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: var(--snow);
  padding: 120px 18px 18px 18px;
  text-align: left;
`;

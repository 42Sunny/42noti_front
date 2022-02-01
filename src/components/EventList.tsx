import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Event } from 'types/event';
import EventCard from 'components/EventCard';

type Props = {
  events: Event[] | null;
};

const EventList = ({ events }: Props) => {
  const months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  return (
    <ListSection>
      {events && events.length === 0 ? (
        <StyledNodata>
          <div>🧐</div>
          이벤트가 없습니다
          <br />
          서브젝트를 하러 갑시다 !
        </StyledNodata>
      ) : (
        events &&
        events.map((event: Event) => {
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
        })
      )}
    </ListSection>
  );
};

export default EventList;

const ListSection = styled.section`
  width: 100%;
`;

const StyledEvents = styled.div`
  width: 100%;
  h2 {
    font-size: 0.8rem;
    letter-spacing: -0.3px;
    color: var(--darkgray);
    margin-bottom: 9px;
  }
`;

export const StyledNodata = styled.div`
  text-align: center;
  font-size: 1.05rem;
  margin: 120px 0;
  color: var(--gray);
  div {
    font-size: 3rem;
  }
`;

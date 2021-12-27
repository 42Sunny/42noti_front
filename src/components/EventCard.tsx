import React from 'react';
import styled from 'styled-components';
import Icon from '../components/Icon';
import { catetoryColors } from '../constants/category';
import { week } from '../constants/date';
import { Event } from '../types/event';

const EventCard = ({ event }: { event: Event }) => {
  let eventDate = new Date(event.beginAt);
  const month = event.beginAt?.split('-')[2].split('T')[0];
  const day = week[eventDate.getDay()];
  const time = event.beginAt
    ? `${event.beginAt?.split('T')[1].split('.')[0].split(':')[0]}:${
        event.beginAt?.split('T')[1].split('.')[0].split(':')[1]
      }`
    : '';
  return (
    <Card>
      <StyledDateDiv>
        <StyledCategoryBar color={catetoryColors[event.category]} />
        <h1>{month}</h1>
        <h3>{day}</h3>
      </StyledDateDiv>
      <StyledInfoDiv>
        <h1>{event.title}</h1>
        <strong>
          {event.tags &&
            event.tags.map((keyword: string, index: number) => (
              <span key={index}>#{keyword}</span>
            ))}
        </strong>
        <StyledEventInfoDiv>
          <div>
            <Icon size={14} color="var(--lightgray)" icon="time" />
            <span>&nbsp;{time}</span>
          </div>
          <div>
            <Icon size={16} color="var(--lightgray)" icon="location" />
            <span>{event.location}</span>
          </div>
        </StyledEventInfoDiv>
      </StyledInfoDiv>
    </Card>
  );
};

export default React.memo(EventCard);

const Card = styled.article`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background: var(--white);
  margin-bottom: 16px;
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0px 4px 5px 3px rgba(0, 0, 0, 0.02);
  :hover {
    cursor: pointer;
  }
`;

const StyledCategoryBar = styled.span`
  position: absolute;
  width: 4px;
  height: 46px;
  left: -16px;
  top: 0;
  background: ${(props) => props.color || 'var(--lightgray)'};
  border-radius: 10px;
  transform: rotate(-180deg);
`;

const StyledDateDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 18%;
  max-width: 36px;
  margin-right: 16px;
  h1 {
    font-size: 1.9rem;
    font-weight: 400;
    line-height: 0.9;
    margin-bottom: 2px;
  }
  h3 {
    font-size: 0.8rem;
  }
`;

const StyledInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-size: 1.15rem;
    line-height: 22px;
    letter-spacing: -0.3px;
    font-weight: 700;
    margin-bottom: 2px;
  }
  strong {
    font-size: 0.85rem;
    line-height: 18px;
    color: var(--gray);
    margin-bottom: 4px;
    span {
      margin-right: 8px;
    }
  }
`;

const StyledEventInfoDiv = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    span {
      font-size: 0.85rem;
      line-height: 18px;
      color: var(--black);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      margin-right: 10px;
    }
  }
`;

import React from 'react';
import styled from 'styled-components';
import Icon from '../components/Icon';
import { catetoryColors } from '../constants/category';
import { week } from '../constants/date';
import { Event } from '../types/event';

import dayjs from 'dayjs';

const EventCard = ({ event }: { event: Event }) => {
  let eventDate = dayjs(event.beginAt);

  const month = event.beginAt?.split('-')[2].split('T')[0];
  const day = week[eventDate.get('day')];
  const time = eventDate.format('HH:mm');

  return (
    <Card>
      <StyledDateDiv>
        <StyledCategoryBar color={catetoryColors[event.category]} />
        <h1>{month}</h1>
        <h3>{day}</h3>
      </StyledDateDiv>
      <StyledInfoDiv>
        <h1>{event.title}</h1>
        {event.tags.length > 0 && (
          <strong>
            {event.tags.map((keyword: string, index: number) => (
              <span key={index}>#{keyword}</span>
            ))}
          </strong>
        )}
        <StyledEventInfoDiv>
          <div>
            <Icon size={16} color="var(--lightgray)" icon="time" />
            <span>{time}</span>
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
  background: var(--white);
  width: 100%;
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
  width: 20%;
  max-width: 36px;
  margin-right: 16px;
  letter-spacing: -0.3px;
  h1 {
    font-size: 1.9rem;
    font-weight: 400;
    line-height: 0.9;
    margin-bottom: 2px;
  }
  h3 {
    font-size: 0.8rem;
    color: var(--darkgray);
  }
`;

const StyledInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-size: 1.15rem;
    line-height: 1.4rem;
    letter-spacing: -0.3px;
    font-weight: 700;
    margin-bottom: 6px;
    word-break: keep-all;
  }
  strong {
    font-size: 0.85rem;
    line-height: 18px;
    color: var(--gray);
    margin-bottom: 7px;
    span {
      display: inline-block;
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
    svg {
      min-width: 16px;
    }
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
    &:nth-child(2) {
      width: 46vw;
      max-width: 460px;
    }
  }
`;

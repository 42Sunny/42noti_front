import React from 'react';
import styled from 'styled-components';
import Icon from '../components/Icon';
import { catetoryColors } from '../constants/category';
import { week } from '../constants/date';
import { Event } from '../types/event';

import dayjs from 'dayjs';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

const EventCard = ({ event }: { event: Event }) => {
  let eventBeginDate = dayjs(event.beginAt);

  const month = event.beginAt?.split('-')[2].split('T')[0];
  const day = week[eventBeginDate.get('day')];
  const time = eventBeginDate.format('HH:mm');

  const [isUpdate, setIsUpdate] = useState(false);

  const handleIsUpdate = useCallback(
    (updatedAt: string, createdAt: string, beginAt: string) => {
      const now = dayjs();
      const updated = dayjs(updatedAt);
      const created = dayjs(createdAt);
      const begin = dayjs(beginAt);

      if (updated > created && now < begin) setIsUpdate(true);
    },
    [],
  );

  useEffect(() => {
    handleIsUpdate(event.updatedAt, event.createdAt, event.beginAt);
  }, [event.beginAt, event.createdAt, event.updatedAt, handleIsUpdate]);
  
  return (
    <Card>
      <StyledDateDiv>
        <StyledCategoryBar color={catetoryColors[event.category]} />
        {isUpdate && <UpdatedIcon />}
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
          {event.location && (
            <div>
              <Icon size={16} color="var(--lightgray)" icon="location" />
              <span>{event.location}</span>
            </div>
          )}
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
  padding: 18px 14px;
  box-shadow: 0px 4px 5px 3px rgba(0, 0, 0, 0.02);
  :hover {
    cursor: pointer;
  }
`;

const StyledCategoryBar = styled.span`
  position: absolute;
  width: 4px;
  height: 44px;
  left: -14px;
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
  h1 {
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.8rem;
    margin-bottom: 2px;
    letter-spacing: -1.3px;
  }
  h3 {
    font-size: 0.8rem;
    color: var(--darkgray);
    letter-spacing: -0.3px;
  }
`;

const StyledInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-size: 1.15rem;
    line-height: 1.45rem;
    letter-spacing: -0.4px;
    font-weight: 800;
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

const UpdatedIcon = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--blue);
  position: absolute;
  right: -6px;
  top: 0;
`;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Card } from '../components/EventCard';
import Header from '../components/Header';

import { getDummy } from '../api/api';
import { datas } from '../data';

export type Events = {
  id: string;
  date: string;
  title: string;
  keyword: Array<string>;
  location: string;
  limit: number;
  attendee: number;
  information: string;
};

const MainPage = () => {
  const [events, setEvents] = useState<Events[]>([]);
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

  const filterPastEvents = (events: Array<Events>): any => {
    return events.filter((event) => {
      const date = event.date.split('T')[0];
      let now = new Date();
      let today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
      );
      return new Date(date).getTime() >= today.getTime();
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getDummy();
      const { data } = response.data;
      data.sort((a: Events, b: Events) => {
        return parseInt(a.id) - parseInt(b.id);
      });
      setEvents(filterPastEvents(data));
    };

    //getData();
    setEvents(datas);
  }, []);

  return (
    <>
      <Header />
      <Content>
        {events.map((event, index) => {
          let yearMonth = null;
          let eventDate = new Date(event.date);

          if (months[eventDate.getMonth()] === 0) {
            yearMonth = `${eventDate.getFullYear()}년${
              eventDate.getMonth() + 1
            }월`;
            months[eventDate.getMonth()] = 1;
          }

          return (
            <StyledEvents key={index + event.id}>
              {yearMonth && (
                <StyledSubTilte key={index}>{yearMonth}</StyledSubTilte>
              )}
              <Link to={`/detail/${event.id}`}>
                <Card
                  week={week}
                  eventDate={eventDate}
                  id={event.id}
                  date={event.date}
                  title={event.title}
                  keyword={event.keyword}
                  location={event.location}
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
  padding: 22px;
`;

const StyledEvents = styled.div`
  width: 100%;
`;

const StyledSubTilte = styled.h1`
  width: 100%;
  font-size: 14px;
  margin-bottom: 10px;
`;

export default MainPage;

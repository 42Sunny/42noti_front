import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import { datas } from '../data';

type Events = {
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
    setEvents(filterPastEvents(datas));
  }, []);

  return (
    <>
      <Header />
      <Content>
        {events.map((event) => {
          let time = event.date.split('T')[1];
          let eventDate = new Date(event.date);
          let yearMonth = '';
          const day = week[eventDate.getDay()];
          console.log(eventDate.getMonth());
          if (months[eventDate.getMonth()] === 0) {
            yearMonth = `${eventDate.getFullYear()}년${
              eventDate.getMonth() + 1
            }월`;
            months[eventDate.getMonth()] = 1;
          }

          return (
            <>
              <YearMonth key={yearMonth}>{yearMonth}</YearMonth>
              <Card key={event.id}>
                <CardDate>
                  <TextDate>{event.date.split('-')[2].split('T')[0]}</TextDate>
                  <TextDay>{day}</TextDay>
                </CardDate>
                <CardInfo>
                  <Link to={`/detail/${event.id}`}><TextTitle>{event.title}</TextTitle></Link>
                  <EventInfo>
                    <Icon />
                    <TextTime> {time}</TextTime>
                    <Icon />
                    <TextLocation>{event.location}</TextLocation>
                  </EventInfo>
                </CardInfo>
              </Card>
            </>
          );
        })}
      </Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #e5e5e5;
  padding: 22px;
`;

const YearMonth = styled.div`
  width: 100%;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;

  background: #fff;
  margin-bottom: 14px;
  border-radius: 10px;
  padding: 17px 10px;
`;

const CardDate = styled.div`
  width: 20%;
  max-width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin-right: 5px;
`;
const TextDate = styled.div`
  font-weight: 300;
  font-size: 32px;
  line-height: 1;
`;

const TextDay = styled.div`
  font-size: 12px;
  line-height: 1.5;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TextTitle = styled.div`
  font-weight: 700;
  margin-bottom: 12px;
`;

const TextTime = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #c4c4c4;
  margin-right: 15px;
`;
const TextLocation = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: #c4c4c4;
`;

const EventInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 5px;
`;

export default MainPage;

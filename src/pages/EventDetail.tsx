import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import Footer from '../components/Footer';
import DetailSkeleton from '../components/DetailSkeleton';
import AlarmButton from '../components/AlarmButton';
import Markdown from '../components/Markdown';

import {
  useEventsState,
  useEventsDispatch,
  fetchEvent,
} from '../contexts/EventContext';
import { Event } from '../types/event';
import { catetoryColors } from '../constants/category';
import { timeFormat, endAtFormat, isPassed } from '../utils/time';

import { getAlarmState, postAlarm, delAlarm } from '../api/api';
import Icon from '../components/Icon';

const EventDetail: React.FC = () => {
  const state = useEventsState();
  const dispatch = useEventsDispatch();

  const { data: events } = state.events;
  const { data: userEvents } = state.userEvents;
  const { data: fetchedEvent, loading } = state.event;

  const params: any = useParams();
  const eventId: number = parseInt(params.eventId);
  const listedEvent: Event | undefined =
    events?.find((e) => e.id === eventId) ||
    userEvents?.find((e) => e.id === eventId);

  const [event, setEvent] = useState<Event | null | undefined>(listedEvent);
  const [alarm, setAlarm] = useState(null);

  const alarmState = async (eventId: number) => {
    try {
      const response = await getAlarmState(eventId);
      setAlarm(response.data.reminder);
    } catch (e) {
      console.log(e);
    }
  };

  const alramOn = async (eventId: number) => {
    try {
      const response = await postAlarm(eventId);
      setAlarm(response.data.reminder);
    } catch (e) {
      console.log(e);
    }
  };

  const alarmOff = async (eventId: number) => {
    try {
      const response = await delAlarm(eventId);
      setAlarm(response.data.reminder);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAlarm = () => {
    if (alarm) {
      alarmOff(eventId);
    } else {
      alramOn(eventId);
    }
  };

  useEffect(() => {
    if (!event) {
      fetchEvent(dispatch, eventId);
      setEvent(fetchedEvent);
    }
    alarmState(eventId);
  }, [dispatch, eventId, fetchedEvent, event]);

  return (
    <>
      <Header />
      {loading || !event ? (
        <DetailSkeleton />
      ) : (
        <StyledWrap>
          <StyledMain>
            <StyledCategoryBar color={catetoryColors[event.category]} />
            <h1>{event.title}</h1>
            <div>
              {event.location && <h3>📍 {event.location}</h3>}
              <h3>
                🕒 {timeFormat(event.beginAt)} -{' '}
                {endAtFormat(event.beginAt, event.endAt)}
              </h3>
              {event.maxSubscribers && (
                <h3>
                  👥 {event.currentSubscribers} / {event.maxSubscribers}
                </h3>
              )}
            </div>
            <AlarmButton
              onClick={handleAlarm}
              alarm={alarm}
              disabled={isPassed(event.beginAt)}
            />
          </StyledMain>
          <StyledSection>
            <StyledDescription>
              <h2>상세 정보</h2>
              <Markdown>{event.description}</Markdown>
              <TagWrap>
                <Tag>#{event.category}</Tag>
                {event.tags &&
                  event.tags.map((tag: string, index: number) => {
                    return <Tag key={event.id + index}>#{tag}</Tag>;
                  })}
              </TagWrap>
              {event.intraId && (
                <a
                  href={`https://profile.intra.42.fr/events/${event.intraId}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <StyledSubscription>
                    <h3>아젠다 구독하러 가기</h3>
                    <Icon size={12} color="var(--black)" icon="arrowRight" />
                  </StyledSubscription>
                </a>
              )}
            </StyledDescription>
          </StyledSection>
        </StyledWrap>
      )}
      <Footer />
    </>
  );
};

const StyledWrap = styled.div`
  /* main 부분의 크기를 넘치는 속성을 줄이는 속성1, 모자른 속성을 채우는 속성1, 해당 속성을 유지하는 속성 0 */
  flex: 1 1 0;
  padding-top: 52px;
  background: var(--snow);
`;

const StyledCategoryBar = styled.span`
  display: inline-block;
  width: 80px;
  height: 5px;
  background: ${(props) => props.color || 'var(--lightgray)'};
  border-radius: 10px;
`;

const StyledMain = styled.main`
  padding: 28px;
  width: 100%;
  background: var(--white);
  line-height: 1.6rem;
  div {
    margin-bottom: 22px;
  }
  h1 {
    margin: 16px 0 22px;
    font-size: calc(1.4rem + 0.6vw);
    font-weight: 700;
    letter-spacing: -0.3px;
    line-height: calc(1.8rem + 0.5vw);
    word-break: keep-all;
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: -0.3px;
  }
`;

const StyledSection = styled.section`
  padding: 16px;
  width: 100%;
  height: 100%px;
`;

const StyledDescription = styled.article`
  padding: 18px;
  width: 100%;
  height: 100%px;
  background: var(--white);
  border-radius: 12px;
  line-height: 1.5rem;
  overflow: auto;
  word-break: keep-all;
  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 12px;
  }
`;

const StyledSubscription = styled.div`
  h3 {
    font-weight: 400;
    display: inline-block;
  }
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 20px 0 2px 0;
  border-top: 1px solid #e5e5e5;
`;

const TagWrap = styled.div`
  padding: 20px 0;
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  border-radius: 50px;
  margin-right: 8px;
  padding: 4px 12px;
  background: var(--darksnow);
`;

export default EventDetail;

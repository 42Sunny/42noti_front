import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import Markdown from 'components/Markdown';
import AlarmButton from 'components/AlarmButton';
import DetailSkeleton from 'components/DetailSkeleton';

import { Event } from 'types/event';
import { catetoryColors } from 'constants/category';
import { timeFormat, endAtFormat, isPassed } from 'utils/time';

import { getAlarmState, postAlarm, delAlarm, getEvent } from 'api/api';
import Icon from 'components/Icon';
import { colors } from 'styles/theme';
import { useCallback } from 'react';

const EventDetail: React.FC = () => {
  const params: any = useParams();
  const eventId: number = parseInt(params.eventId);

  const [event, setEvent] = useState<Event | null | undefined>(null);
  const [alarm, setAlarm] = useState(null);

  const fetchedEvent = useCallback(async () => {
    const response = await getEvent(eventId);
    setEvent(response.data);
  }, [eventId]);

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

  // const setMetaTags = ({ event }: Event) => {
  // let meta = document.querySelector('meta[name="description"]');
  // meta?.setAttribute('content', event.title);
  // };

  useEffect(() => {
    if (!event) fetchedEvent();
    alarmState(eventId);
    window.scrollTo(0, 0);
  }, [eventId, fetchedEvent, event]);

  return (
    <>
      <Header />
      {!event ? (
        <DetailSkeleton />
      ) : (
        <StyledWrap>
          <StyledMain>
            <StyledCategoryBar color={catetoryColors[event.category]} />
            <h1>{event.title}</h1>
            <div>
              {event.location && <h3>???? {event.location}</h3>}
              <h3>
                ???? {timeFormat(event.beginAt)} -{' '}
                {endAtFormat(event.beginAt, event.endAt)}
              </h3>
              {event.maxSubscribers && (
                <h3>
                  ???? {event.currentSubscribers} / {event.maxSubscribers}
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
              <h2>?????? ??????</h2>
              <Markdown>{event.description}</Markdown>
              <Tag>#{event.category}</Tag>
              {event.tags &&
                event.tags.map((tag: string, index: number) => {
                  return <Tag key={event.id + index}>#{tag}</Tag>;
                })}
              {event.intraId && (
                <a
                  href={`https://profile.intra.42.fr/events/${event.intraId}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <StyledSubscription>
                    <h3>????????? ???????????? ??????</h3>
                    <Icon size={12} color={colors.black} icon="arrowRight" />
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
  /* main ????????? ????????? ????????? ????????? ????????? ??????1, ????????? ????????? ????????? ??????1, ?????? ????????? ???????????? ?????? 0 */
  flex: 1 1 0;
  padding-top: 52px;
  background: ${({ theme }) => theme.colors.snow};
`;

const StyledCategoryBar = styled.span`
  display: inline-block;
  width: 80px;
  height: 5px;
  background: ${(props) => props.color || props.theme.colors.lightgray};
  border-radius: 10px;
`;

const StyledMain = styled.main`
  padding: 28px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
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
    word-break: break-all;
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
  background: ${({ theme }) => theme.colors.white};
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

const Tag = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  border-radius: 50px;
  margin: 8px 8px 8px 0;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.darksnow};
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
  border-top: 1px solid ${({ theme }) => theme.colors.darksnow};
  margin-top: 14px;
  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
  &:hover svg {
    fill: ${({ theme }) => theme.colors.blue};
  }
`;

export default EventDetail;

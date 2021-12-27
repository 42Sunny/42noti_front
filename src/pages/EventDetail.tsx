import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import styled from 'styled-components';

import Header from '../components/Header';
import SubmitInput from '../components/SubmitInput';
import Footer from '../components/Footer';
import DetailSkeleton from '../components/DetailSkeleton';

import {
  useEventsState,
  useEventsDispatch,
  fetchEvent,
} from '../contexts/EventContext';
import { Event } from '../types/event';
import { catetoryColors } from '../constants/category';
import { timeFormat, endAtFormat } from '../utils/time';

const EventDetail: React.FC = () => {
  const state = useEventsState();
  const dispatch = useEventsDispatch();

  const { data: events } = state.events;
  const { data: userEvents } = state.userEvents;
  const { loading } = state.event;

  const params: any = useParams();
  const eventId: number = parseInt(params.eventId);
  const event: Event | undefined =
    events?.find((e) => e.id === eventId) ||
    userEvents?.find((e) => e.id === eventId);

  useEffect(() => {
    if (event) {
      return;
    }
    fetchEvent(dispatch, eventId);
  }, [dispatch, eventId, event]);

  return (
    <>
      <Header />
      {loading || !event ? (
        <DetailSkeleton />
      ) : (
        <StyledDiv>
          <StyledMain>
            <StyledCategoryBar color={catetoryColors[event.category]} />
            <h1>{event.title}</h1>
            <h3>📍 {event.location}</h3>
            <h3>
              🕒 {timeFormat(event.beginAt)} -{' '}
              {endAtFormat(event.beginAt, event.endAt)}
            </h3>
            <h3>
              👥 {event.currentSubscribers} / {event.maxSubscribers}
            </h3>
            <SubmitInput />
          </StyledMain>
          <StyledSection>
            <StyledDescription>
              <h2>상세 정보</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(event.description),
                }}
              />
              <Tag>#{event.category}</Tag>
              {event.tags &&
                event.tags.map((tag: string, index: number) => {
                  return <Tag key={event.id + index}>#{tag}</Tag>;
                })}
            </StyledDescription>
          </StyledSection>
        </StyledDiv>
      )}
      <Footer />
    </>
  );
};

const StyledDiv = styled.div`
  /* main 부분의 크기를 넘치는 속성을 줄이는 속성1, 모자른 속성을 채우는 속성1, 해당 속성을 유지하는 속성 0 */
  flex: 1 1 0;
  padding-top: 52px;
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
  height: 100%;
  background: var(--white);
  line-height: 1.6rem;
  h1 {
    margin: 16px 0 22px;
    font-size: calc(1.3rem + 0.6vw);
    font-weight: 700;
    letter-spacing: -0.3px;
    line-height: calc(1.8rem + 0.5vw);
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
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
  h2 {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 12px;
  }
  div {
    margin-bottom: 14px;
  }
  a {
    color: var(--blue);
    word-break: break-all;
  }
  strong {
    font-weight: 600;
  }
  ul {
    list-style: inside;
    margin: 10px;
  }
`;

const Tag = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  border-radius: 50px;
  margin: 0 8px 8px 0;
  padding: 4px 12px;
  background: var(--darksnow);
`;

export default EventDetail;

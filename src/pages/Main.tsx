import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Icon from 'components/Icon';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PastedEvents from 'components/PastedEvents';
import MainSkeleton from 'components/MainSkeleton';
import EventList, { StyledNodata } from 'components/EventList';

import {
  useEventsState,
  useEventsDispatch,
  fetchEventsForce,
  fetchEvents,
} from 'contexts/EventContext';
import { colors } from 'styles/theme';
import { useAppSelector } from 'app/hooks';
import { selectPage } from 'features/page/pageSlice';
import { selectPastedEvents } from 'features/pastedEvents/pastedEventsSlice';
import { DEFAULT_PAGE_LIMIT } from 'constants/api';

const MainPage = () => {
  const eventState = useEventsState();
  const eventDispatch = useEventsDispatch();
  const { data: events, loading, error } = eventState.events;
  const [buttonIsVisible, setButtonIsVisible] = useState(false);

  const page = useAppSelector(selectPage);
  const pastedEvents = useAppSelector(selectPastedEvents);

  useEffect(() => {
    fetchEvents(eventDispatch);
  }, [eventDispatch]);

  return (
    <>
      <Header />
      {loading ? (
        <MainSkeleton />
      ) : error ? (
        <StyledSection>
          <StyledNodata>
            <div>🧐</div>
            Error! 데이터를 불러오지 못했습니다.
            <br />
            잠시 후 다시 이용해 주세요 !
          </StyledNodata>
        </StyledSection>
      ) : (
        <StyledSection>
          <StyledContentTitle>
            <h1>다가오는 이벤트</h1>
            <SyncButton onClick={() => fetchEventsForce(eventDispatch)}>
              <Icon size={15} color={colors.lightgray} icon="sync" />
            </SyncButton>
          </StyledContentTitle>
          <EventList events={events} />
          <StyledContentTitle>
            <h1>지나간 이벤트</h1>
          </StyledContentTitle>
          <PastedEvents
            isLastPage={pastedEvents.length !== page * DEFAULT_PAGE_LIMIT}
            page={page}
            pastedEvents={pastedEvents}
            buttonIsVisible={buttonIsVisible}
            setButtonIsVisible={setButtonIsVisible}
          />
        </StyledSection>
      )}
      <Footer />
    </>
  );
};

export const StyledSection = styled.section`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.snow};
  padding: 68px 18px 18px 18px;
  text-align: left;
`;

const StyledContentTitle = styled.div`
  width: 100%;
  display: flex;
  margin: 6px 0 10px;
  h1 {
    font-size: 1.3rem;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const SyncButton = styled.button`
  margin-left: 3px;
  background: none;
  border: none;
  transition: transform 0.3s;
  padding: 4px;
  &:active svg {
    transform: rotate(-180deg);
    transition: transform 0.4s;
  }
`;

export default MainPage;

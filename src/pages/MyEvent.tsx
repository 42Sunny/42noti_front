import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import Footer from 'components/Footer';
import SubHeader from 'components/SubHeader';
import EventList from 'components/EventList';
import MyEventTab from 'components/MyEventTab';
import MainSkeleton from 'components/MainSkeleton';

import {
  useEventsState,
  useEventsDispatch,
  fetchUserEvents,
} from 'contexts/EventContext';
import { filterUpcomingEvents, filterPastEvents } from 'utils/time';

const MyEvent = () => {
  const state = useEventsState();
  const dispatch = useEventsDispatch();
  const { data: userEvents, loading, error } = state.userEvents;
  const upcomingEvents = filterUpcomingEvents(userEvents);
  const pastEvents = filterPastEvents(userEvents);

  useEffect(() => {
    fetchUserEvents(dispatch);
  }, [dispatch]);
  return (
    <>
      <SubHeader title="내 이벤트" />
      <MyEventTab />
      {loading || (!error && userEvents === null) ? (
        <MainSkeleton />
      ) : (
        <MyEventSection>
          <Routes>
            <Route path="on" element={<EventList events={upcomingEvents} />} />
            <Route path="past" element={<EventList events={pastEvents} />} />
          </Routes>
        </MyEventSection>
      )}
      <Footer />
    </>
  );
};

export default MyEvent;

const MyEventSection = styled.section`
  display: flex;
  flex: 1 1 0;
  align-items: center;
  flex-direction: column;
  background: var(--snow);
  padding: 110px 18px 18px 18px;
  text-align: left;
`;

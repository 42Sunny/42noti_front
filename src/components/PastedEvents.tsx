import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { getEventsPagination } from '../api/api';
import { Event } from '../types/event';
import EventList from './EventList';

const PastedEvents = () => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buttinIsvisible, setButtonIsvisible] = useState(true);
  const [pastedEvents, setPastedEvents] = useState<Event[] | []>([]);

  const getEvents = useCallback(async () => {
    setLoading(true);
    const response = await getEventsPagination('past', page);
    const event: Event[] = response.data;
    if (event.length !== 0)
      setPastedEvents((prevState) => [...prevState, ...event]);
    setLoading(false);
  }, [page]);

  const toggleButtonIsVisible = () => {
    setButtonIsvisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    getEvents();
    setButtonIsvisible(true);
  }, [getEvents]);

  return (
    <>
      <EventList events={pastedEvents} />
      {buttinIsvisible ? (
        <Button onClick={toggleButtonIsVisible}>더보기</Button>
      ) : (
        <div ref={ref} />
      )}
    </>
  );
};

export default PastedEvents;

const Button = styled.button`
  all: unset;
  width: 90px;
  height: 45px;
  text-align: center;
  background-color: var(--blue);
  color: var(--white);
  border-radius: 20px;
`;

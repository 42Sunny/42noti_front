import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getEventsPagination } from '../api/api';
import { Event } from '../types/event';
import EventList from './EventList';

const PastedEvents = () => {
  const [page, setPage] = useState(1);

  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [pastedEvents, setPastedEvents] = useState<Event[] | []>([]);

  const getEvents = useCallback(async () => {
    setLoading(true);
    const response = await getEventsPagination('past', page);
    const event: Event[] = response.data;
    if (event.length !== 0)
      setPastedEvents((prevState) => [...prevState, ...event]);
    setLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <>
      <EventList events={pastedEvents} />
      <div ref={ref} />
    </>
  );
};

export default PastedEvents;

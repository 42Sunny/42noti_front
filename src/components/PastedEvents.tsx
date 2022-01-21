import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getEventsPagination } from '../api/api';
import { Event } from '../types/event';
//import { usePageDispatch, usePageState } from '../contexts/PageContext';
import EventCard from './EventCard';

const PastedEvents = () => {
  //const { page } = usePageState();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(false);
  //const dispatch = usePageDispatch();

  const { ref, inView } = useInView({ skip: lastPage });
  const [loading, setLoading] = useState(false);
  const [pastedEvents, setPastedEvents] = useState<Event[] | []>([]);

  const getEvents = useCallback(async () => {
    setLoading(true);
    const response = await getEventsPagination('past', page);
    if (response.data.length !== 0) setPastedEvents(response.data);
    else {
      setLastPage(true);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      //dispatch({ type: 'ADD_PAGE' });
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <div>
      {pastedEvents.map((event) => {
        return <EventCard event={event} />;
      })}
      <div ref={ref}>Element {inView.toString()}</div>
    </div>
  );
};

export default PastedEvents;

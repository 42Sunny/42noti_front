import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { getEventsPagination } from '../api/api';
import { StyledSection } from '../pages/NotFound';
import { Event } from '../types/event';
import EventList from './EventList';

const PastedEvents = () => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [buttinIsvisible, setButtonIsvisible] = useState(true);
  const [pastedEvents, setPastedEvents] = useState<Event[] | []>([]);
  const isSuccess = useRef<boolean | undefined>(undefined);

  const getEvents = useCallback(async () => {
    setLoading(true);
    const response = await getEventsPagination('past', page);
    if (response.status === 200) isSuccess.current = true;
    else isSuccess.current = false;

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
      {isSuccess.current === true && <EventList events={pastedEvents} />}
      {buttinIsvisible && isSuccess.current === true ? (
        <Button onClick={toggleButtonIsVisible}>더보기</Button>
      ) : (
        <div ref={ref} />
      )}
      {isSuccess.current === false && (
        <StyledSection>
          <h1>데이터를 불러오는데 실패 했습니다.</h1>
        </StyledSection>
      )}
    </>
  );
};

export default PastedEvents;

const Button = styled.button`
  all: unset;
  width: 80px;
  height: 40px;
  text-align: center;
  background-color: var(--blue);
  color: var(--white);
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

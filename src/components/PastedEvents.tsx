import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import EventList from 'components/EventList';
import { useAppDispatch } from 'app/hooks';
import { addPage } from 'features/page/pageSlice';
import { fetchPastedEvents } from 'features/pastedEvents/pastedEventsSlice';
import { Events } from 'types/event';

type PropsTypes = {
  page: number;
  isLastPage: boolean;
  pastedEvents: Events;
  buttonIsVisible: boolean;
  setButtonIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const PastedEvents = ({
  pastedEvents,
  buttonIsVisible,
  setButtonIsVisible,
  page,
  isLastPage,
}: PropsTypes) => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const dispatch = useAppDispatch();
  const prevPage = useRef(page);

  const getEvents = useCallback(async () => {
    //제일 처음에 getEvents가 두번 불러지는 문제 (page가 0일때도 들어가짐)
    if (prevPage.current === page || page === 0) return;
    const response = await dispatch(fetchPastedEvents(page));
    console.log(response);
    setButtonIsVisible(true);
    prevPage.current = page;
  }, [dispatch, page, setButtonIsVisible]);

  const toggleButtonIsVisible = useCallback(() => {
    setButtonIsVisible((prevState) => !prevState);
  }, [setButtonIsVisible]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  useEffect(() => {
    if (inView) {
      dispatch(addPage());
    }
  }, [dispatch, inView]);
  //TODO: error처리 해야함.
  return (
    <>
      {pastedEvents !== [] && <EventList events={pastedEvents} />}
      {buttonIsVisible === true ? (
        isLastPage ? (
          <LastPageDiv>마지막 글 입니다.</LastPageDiv>
        ) : (
          <Button onClick={toggleButtonIsVisible}>더보기</Button>
        )
      ) : (
        <InfinityDev ref={ref} />
      )}
      {/* {isSuccess === false && (
        <StyledSection>
          <h1>데이터를 불러오는데 실패 했습니다.</h1>
        </StyledSection>
      )} */}
    </>
  );
};

export default PastedEvents;

const InfinityDev = styled.div``;
const Button = styled.button`
  all: unset;
  width: 80px;
  height: 40px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

const LastPageDiv = styled.div`
  width: 30%;
  min-width: 130px;
  height: 40px;
  text-align: center;
  padding-top: 10px;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
`;

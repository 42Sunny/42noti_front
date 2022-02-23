import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import EventList from 'components/EventList';
import { useAppDispatch } from 'app/hooks';
import { addPage } from 'features/page/pageSlice';
import { fetchPastedEvents } from 'features/pastedEvents/pastedEventsSlice';
import { Events } from 'types/event';
import Icon from 'components/Icon';
import { colors } from 'styles/theme';

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
    await dispatch(fetchPastedEvents(page));
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
      {pastedEvents?.length !== 0 && <EventList events={pastedEvents} />}
      {buttonIsVisible === true ? (
        isLastPage ? (
          <LastPageDiv>마지막 글 입니다.</LastPageDiv>
        ) : (
          <Button onClick={toggleButtonIsVisible}>
            지나간 이벤트 더보기
            <Icon size={20} color={colors.gray} icon="arrowDown" />
          </Button>
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
  display: block;
  width: 100%;
  max-width: 350px;
  padding: 13px;
  margin: 2px 0 10px;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.gray};
  font-weight: 500;
  border-radius: 28px;
  border: 0;
  cursor: pointer;
  svg {
    vertical-align: -40%;
  }
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

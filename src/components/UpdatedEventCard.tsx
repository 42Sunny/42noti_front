// 사용하지 않는 컴포넌트
import { useState, useCallback, useEffect, SetStateAction } from 'react';
import styled from 'styled-components';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const UpdatedEventCard = ({ event }: any) => {
  const [agoTime, setAgoTime] = useState('');

  const handleAgoTime = useCallback(
    (updatedAt: string): SetStateAction<string> => {
      const now = dayjs();
      const hoursAgo24 = now.subtract(1, 'day');
      const updated = dayjs(updatedAt);
      const timeDiff = Math.floor(now.diff(updated) / 60000); //분

      if (updated.isAfter(hoursAgo24)) {
        if (1 < timeDiff) {
          //1분 이후부터 -> (1시간 전 ~ 23시간 전, 59분 전 ~ 2분 전)
          return `${updated.from(now)}`;
        } else {
          //1분 이내의 시간은 방금 전으로 표시
          return '방금 전';
        }
      }
      return '업데이트 됨';
    },
    [],
  );

  useEffect(() => {
    setAgoTime(handleAgoTime(event.updatedAt));
  }, [event.updatedAt, handleAgoTime]);

  return (
    <Card>
      <h1>{event.title}</h1>
      <StyledInfo>
        <span>{agoTime}</span>
        {agoTime && <UpdatedIcon />}
      </StyledInfo>
    </Card>
  );
};

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  margin-bottom: 14px;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0px 4px 5px 3px rgba(0, 0, 0, 0.02);
  :hover {
    cursor: pointer;
  }
  h1 {
    font-size: 1.15rem;
    line-height: 1.5rem;
    letter-spacing: -0.3px;
    font-weight: 700;
    margin-bottom: 6px;
    word-break: keep-all;
  }
`;

const StyledInfo = styled.span`
  display: flex;
  align-items: center;
  span {
    font-size: 0.8rem;
    font-weight: 500;
    margin-right: 5px;
    letter-spacing: -0.3px;
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export const UpdatedIcon = styled.div`
  min-width: 10px;
  min-height: 10px;
  max-width: 10px;
  max-height: 10px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.white};
  margin-right: 5px;
`;

export default UpdatedEventCard;

import { useCallback, useEffect } from 'react';
import { useState } from 'react';

import styled from 'styled-components';
import { handleKRDiffTime } from '../utils/time';

const UpdatedEventCard = ({ title, updatedAt }: any): any => {
  const [agoTime, setAgoTime] = useState('');

  const secondsToMin = (seconds: Number) => {
    const second = Number(seconds);
    var minutes = Math.floor(second / (1000 * 60));
    return minutes;
  };

  const handleAgoTime = useCallback((updatedAt: string) => {
    const now = new Date();
    const updated = handleKRDiffTime(updatedAt);
    const minutesDiff = secondsToMin(now.getTime() - updated.getTime());
    const DAY1_MINUTES = 1440; //하루는 1440분
    if (minutesDiff < DAY1_MINUTES) {
      const hours = Math.floor(minutesDiff / 60);
      const minutes = Math.floor(minutesDiff % 60);
      if (hours >= 1) {
        setAgoTime(`${hours}시간 전`);
      } else if (hours < 1 && minutes <= 1) {
        setAgoTime('방금 전');
      } else if (hours < 1) {
        setAgoTime(`${minutes}분 전`);
      }
    }
  }, []);

  useEffect(() => {
    handleAgoTime(updatedAt);
  }, [updatedAt, handleAgoTime]);
  return (
    <Card>
      <h1>{title}</h1>
      <StyledInfoSpan>
        <span>{agoTime}</span>
        {agoTime && <Icon />}
      </StyledInfoSpan>
    </Card>
  );
};

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  background: var(--white);
  margin-bottom: 14px;
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0px 3px 5px 5px rgba(0, 0, 0, 0.02);
  :hover {
    cursor: pointer;
  }
  h1 {
    font-size: 1.1rem;
    line-height: 22px;
    letter-spacing: -0.3px;
    font-weight: 700;
    margin-bottom: 6px;
  }
`;

const StyledInfoSpan = styled.span`
  display: flex;
  align-items: center;
  span {
    font-size: 0.8rem;
    font-weight: 500;
    margin-right: 5px;
    letter-spacing: -0.3px;
    color: var(--blue);
  }
`;

const Icon = styled.div`
  min-width: 10px;
  min-height: 10px;
  max-width: 10px;
  max-height: 10px;
  border-radius: 50%;
  background: var(--blue);
  margin-right: 5px;
`;

export default UpdatedEventCard;

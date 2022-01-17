import React from 'react';
import styled from 'styled-components';
import Icon from '../components/Icon';

type Props = {
  alarm: boolean | null;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const AlarmButton = ({ alarm, disabled, onClick }: Props) => {
  return alarm ? (
    <ButtonOff onClick={onClick} disabled={disabled}>
      <Icon size={21} color="var(--blue)" icon="alarm" />
      알림 받는 중
    </ButtonOff>
  ) : (
    <ButtonOn onClick={onClick} disabled={disabled}>
      <Icon size={21} color="var(--white)" icon="alarmLine" />이 이벤트 알림받기
    </ButtonOn>
  );
};

export default React.memo(AlarmButton);

const Button = styled.button`
  display: block;
  width: 100%;
  max-width: 360px;
  height: 46px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 700;
  border: 0;
  padding: 10px 0 12px;
  cursor: pointer;
  svg {
    margin: 0 2px -5px 0;
  }
  &:disabled {
    background-color: var(--snow);
    color: var(--lightgray);
  }
  &:disabled svg {
    fill: var(--lightgray);
  }
`;

const ButtonOn = styled(Button)`
  background-color: var(--blue);
  color: var(--white);
`;

const ButtonOff = styled(Button)`
  background-color: var(--snow);
  color: var(--blue);
`;

import React from 'react';
import styled from 'styled-components';
import Icon from 'components/Icon';
import { colors } from 'styles/theme';

type Props = {
  alarm: boolean | null;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const AlarmButton = ({ alarm, disabled, onClick }: Props) => {
  return alarm ? (
    <ButtonOff onClick={onClick} disabled={disabled}>
      <Icon size={21} color={colors.blue} icon="alarm" />
      알림 받는 중
    </ButtonOff>
  ) : (
    <ButtonOn onClick={onClick} disabled={disabled}>
      <Icon size={21} color={colors.white} icon="alarmLine" />이 이벤트 알림받기
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
    background-color: ${({ theme }) => theme.colors.snow};
    color: ${({ theme }) => theme.colors.lightgray};
  }
  &:disabled svg {
    fill: ${({ theme }) => theme.colors.lightgray};
  }
`;

const ButtonOn = styled(Button)`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
`;

const ButtonOff = styled(Button)`
  background-color: ${({ theme }) => theme.colors.snow};
  color: ${({ theme }) => theme.colors.blue};
`;

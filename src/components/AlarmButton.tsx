import styled from 'styled-components';
import Icon from '../components/Icon';

type Props = {
  alarm: boolean | null;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const AlarmButton = ({ onClick, alarm }: Props) => {
  if (alarm || null)
    return (
      <ButtonOff onClick={onClick}>
        <Icon size={21} color="var(--blue)" icon="alarm" />
        알림 받는 중
      </ButtonOff>
    );
  else if (alarm === null)
    return (
      <ButtonDisable disabled>
        <Icon size={21} color="var(--lightgray)" icon="alarmLine" />
        준비중입니다
      </ButtonDisable>
    );
  else
    return (
      <ButtonOn onClick={onClick}>
        <span>
          <Icon size={21} color="var(--white)" icon="alarmLine" />이 이벤트
          알림받기
        </span>
      </ButtonOn>
    );
};

export default AlarmButton;

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
    margin: 0 3px -5px 0;
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

const ButtonDisable = styled(Button)`
  background-color: var(--snow);
  color: var(--lightgray);
`;

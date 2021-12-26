import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../components/Icon';
import {
  handleUpdaterEvents,
  useEventsDispatch,
  useEventsState,
} from '../contexts/EventContext';

type Props = {
  title?: string;
};

const SubHeader = ({ title }: Props) => {
  const dispatch = useEventsDispatch();
  const state = useEventsState();

  const updateEvents = (): void => {
    handleUpdaterEvents(dispatch, state.allEvents.data);
  };
  return (
    <StyledHeader>
      <Link to="/" onClick={updateEvents}>
        <Icon size={18} color="var(--black)" icon="arrowLeft" />
      </Link>
      <h1>{title}</h1>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 640px;
  padding: 0 14px;
  background-color: white;
  height: 52px;
  line-height: 52px;
  text-align: center;
  z-index: 10;
  h1 {
    font-size: 1.1rem;
    font-weight: 700;
  }
  svg {
    position: absolute;
    top: 16px;
    left: 10px;
  }
`;

export default SubHeader;

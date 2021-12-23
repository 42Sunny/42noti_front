import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MyEventTab = () => {
  return (
    <StyledTab>
      <button>알림받는 이벤트</button>
      <button>지나간 이벤트</button>
    </StyledTab>
  );
};

const StyledTab = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 52px;
  width: 100%;
  max-width: 640px;
  background-color: white;
  button {
    height: 48px;
    line-height: 48px;
    font-size: 1rem;
    font-weight: 600;
    margin-left: 6px;
    border: 0;
    background-color: white;
    border-bottom: 2px solid var(--black);
    margin: 0 12px;
  }
`;

export default MyEventTab;

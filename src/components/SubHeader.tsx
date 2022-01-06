import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../components/Icon';

type Props = {
  title?: string;
};

const SubHeader = ({ title }: Props) => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <button onClick={() => navigate('/')}>
        <Icon size={18} color="var(--black)" icon="arrowLeft" />
      </button>
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
  button {
    position: absolute;
    top: 16px;
    left: 10px;
    background: none;
    border: none;
    padding: 0;
  }
`;

export default SubHeader;

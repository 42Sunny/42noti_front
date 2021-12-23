import { Link } from "react-router-dom";
import styled from 'styled-components';

type Props = {
  title?: string;
}

const SubHeader = ({ title }: Props) => {
  return (
    <StyledHeader>
      <Link to = "/">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width='12' height='52'>
          <polygon points="0,26 20,10 20,42" fill="none" strokeWidth="2" stroke="black"/>
        </svg>
      </Link>
      <h1>{title}</h1>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top:0;
  width: 100%;
  max-width: 640px;
  padding: 0 14px;
  background-color: white;
  height: 52px;
  line-height: 52px;
  border-bottom: 1px solid var(--darksnow);
  text-align: center;
  z-index: 10;
  h1 {
    font-size: 1.1rem;
    font-weight: 700;
  }
  svg {
    position: absolute;
    left: 16px;
  }
`;

export default SubHeader;


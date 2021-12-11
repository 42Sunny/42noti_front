import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: white;
  height: 52px;
  border-bottom: 1px solid var(--darksnow);
  padding: 0 16px;
  h1 {
    font-size: 1.2rem;
    line-height: 52px;
    font-weight: 600;
  }
  a {
    font-size: 1rem;
    line-height: 52px;
    font-weight: 600;
  }
`;

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Link to="/">
          <h1>42 MEETUP</h1>
        </Link>
        <a>내 이벤트</a>
      </StyledHeader>
    </>
  );
};

export default Header;

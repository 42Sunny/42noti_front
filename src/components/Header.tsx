import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: white;
  height: 52px;
  line-height: 52px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid var(--darksnow);
  margin-bottom: 10px;
`;

const MainHeader = () => {
  return (
    <>
      <StyledHeader>42 Meetup</StyledHeader>
    </>
  );
};

export default MainHeader;

import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  padding: 0 14px;
  background-color: white;
  height: 52px;
  line-height: 52px;
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px solid var(--darksnow);
  margin-bottom: 10px;
  h1 {
    margin-left: 6px;
  }
`;

const SubHeader = () => {
  return (
    <>
      <StyledHeader>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width='12' height='52'>
        <polygon points="0,26 20,10 20,42" fill="none" stroke-width="2" stroke="black"/>
      </svg>
        <h1>42 Meetup</h1>
      </StyledHeader>
    </>
  );
};

export default SubHeader;

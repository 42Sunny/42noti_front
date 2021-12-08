import styled from 'styled-components';

export const EventCategory = () => {
  return (
    <StyledCategoryDiv>
      <Button>All</Button>
      <Button>conference</Button>
      <Button>exam</Button>
      <Button>hackton</Button>
      <Button>rush</Button>
    </StyledCategoryDiv>
  );
};

const StyledCategoryDiv = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;
const Button = styled.button`
  display: inline-block;
  border-style: none;
  height: 32px;
  background: var(--darksnow);
  border-radius: 20px;
  color: var(--black);
  margin: 0 10px 8px 0;
  padding: 6px 12px;
`;

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
  display: flex;
  padding: 5px 10px;
`;
const Button = styled.button`
  border-style: none;
  width: 100%;
  height: 31px;
  left: 19px;
  top: 351px;
  background: #3ea2ff;
  border-radius: 20px;
  color: #fff;
  margin-right: 9px;
  padding: 6px 10px;
`;

import styled from 'styled-components';
import { skeletonAnimation } from '../constants/skeletonAnimation';

const MainSkeleton = () => {
  return (
    <StyledSection>
      <StyledDiv>
        <h1 />
        <StyledEvent />
        <h1 />
        <StyledCategory>
          <StyledButton />
          <StyledButton />
          <StyledButton />
          <StyledButton />
          <StyledButton />
        </StyledCategory>
        <span />
        <StyledEvent />
        <StyledEvent />
        <StyledEvent />
        <StyledEvent />
      </StyledDiv>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  height: 90vh;
  align-items: center;
  flex-direction: column;
  padding: 18px;
  text-align: left;
  background: var(--snow);
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 4px 0 12px;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.3px;

  h1 {
    width: 45%;
    max-width: 150px;
    height: 28px;
    margin: 12px 0 24px;
    background-color: var(--darksnow);
    margin-right: 5px;
    animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
  }
  span {
    width: 15%;
    height: 15px;
    margin: 12px 0 24px;
    background-color: var(--darksnow);
    margin-right: 5px;
    animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
  }
`;

const StyledEvent = styled.div`
  width: 100%;
  height: 80px;
  margin-bottom: 14px;
  background-color: var(--darksnow);
  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

const StyledCategory = styled.div`
  display: flex;
`;
const StyledButton = styled.div`
  width: 45px;
  height: 30px;
  display: inline-block;
  border-style: none;
  height: 32px;
  background: var(--darksnow);
  border-radius: 20px;
  color: var(--black);
  margin: 0 10px 8px 0;
  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

export default MainSkeleton;

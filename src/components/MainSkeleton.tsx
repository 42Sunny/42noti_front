import styled from 'styled-components';
import { skeletonAnimation } from '../constants/skeletonAnimation';

const MainSkeleton = () => {
  return (
    <StyledSection>
      <StyledDiv>
        <strong />
        <StyledEvent />
        <strong />
        <StyledCategory>
          <StyledButton />
          <StyledButton />
          <StyledButton />
          <StyledButton />
        </StyledCategory>
        <span />
        <StyledEvent />
        <StyledEvent />
        <StyledEvent />
      </StyledDiv>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 62px 18px 18px;
  text-align: left;
  background: var(--snow);
`;

const StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.3px;
  strong {
    width: 45%;
    max-width: 150px;
    height: 26px;
    margin: 12px 0;
    background-color: var(--darksnow);
    margin-right: 5px;
    animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
  }
  span {
    width: 15%;
    height: 15px;
    margin: 12px 0px;
    background-color: var(--darksnow);
    margin-right: 5px;
    animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
  }
`;

const StyledEvent = styled.div`
  width: 100%;
  height: 78px;
  margin-bottom: 14px;
  background-color: var(--darksnow);
  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

const StyledCategory = styled.div`
  display: flex;
`;
const StyledButton = styled.div`
  width: 60px;
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

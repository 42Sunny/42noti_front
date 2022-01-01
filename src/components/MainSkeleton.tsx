import styled from 'styled-components';
import { skeletonAnimation } from '../constants/skeletonAnimation';

const MainSkeleton = () => {
  return (
    <StyledSection>
      <StyledDiv>
        <strong />
        <StyledEvent />
        <StyledEvent />
        <strong />
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

export default MainSkeleton;

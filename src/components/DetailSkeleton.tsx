import styled from 'styled-components';
import { skeletonAnimation } from 'constants/skeletonAnimation';

const DetailSkeleton = () => {
  return (
    <>
      <StyledDiv>
        <StyledMain>
          <StyledCategoryBar />
          <strong />
          <p />
          <p />
          <p />
        </StyledMain>
        <StyledSection>
          <StyledDescription>
            <strong />
            <p />
            <p />
            <p />
            <p />
            <p />
            <p />
          </StyledDescription>
        </StyledSection>
      </StyledDiv>
    </>
  );
};

export default DetailSkeleton;

const StyledDiv = styled.div`
  /* main 부분의 크기를 넘치는 속성을 줄이는 속성1, 모자른 속성을 채우는 속성1, 해당 속성을 유지하는 속성 0 */
  flex: 1 1 0;
  padding-top: 52px;
  background: ${({ theme }) => theme.colors.snow};
`;

const StyledMain = styled.main`
  padding: 28px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  line-height: 1.6rem;
  strong {
    display: block;
    width: 70%;
    height: 28px;
    margin: 12px 0 24px;
    background-color: ${({ theme }) => theme.colors.darksnow};
    animation: ${skeletonAnimation} 2s infinite;
    overflow: hidden;
    position: relative;
  }
  p {
    display: block;
    width: 85%;
    height: 18px;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.darksnow};
    animation: ${skeletonAnimation} 2s infinite;
    &:nth-child(5) {
      width: 30%;
    }
  }
`;

const StyledCategoryBar = styled.span`
  display: inline-block;
  width: 80px;
  height: 5px;
  background: ${({ theme }) => theme.colors.darksnow};
  border-radius: 10px;
  animation: ${skeletonAnimation} 2s infinite;
`;

const StyledSection = styled.section`
  padding: 16px;
  width: 100%;
  height: 100%;
`;

const StyledDescription = styled.article`
  padding: 18px;
  width: 100%;
  height: 100%px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  line-height: 1.5rem;
  strong {
    display: block;
    width: 30%;
    height: 26px;
    margin: 12px 0 24px;
    background-color: ${({ theme }) => theme.colors.darksnow};
    animation: ${skeletonAnimation} 2s infinite;
  }
  p {
    display: block;
    width: 100%;
    height: 18px;
    margin-bottom: 10px;
    background-color: ${({ theme }) => theme.colors.darksnow};
    animation: ${skeletonAnimation} 2s infinite;
    &:nth-child(3n + 1) {
      width: 70%;
      margin-bottom: 24px;
    }
  }
`;

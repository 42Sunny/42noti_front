import styled, { keyframes } from 'styled-components';

const DetailSkeleton = () => {
  return (
    <>
      <StyledDiv>
        <StyledMain>
          <StyledCategoryBar />
          <h1 />
          <h3 />
          <h3 />
          <h3 />
        </StyledMain>
        <StyledSection>
          <StyledDescription>
            <h2 />
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

const loading = keyframes`
  0% {
    background-color: var(--darksnow);
  }
  30% {
    background-color: var(--snow);
  }
  70% {
    background-color: var(--darksnow);
  }
  100% {
    background-color: var(--darksnow);
  }
`;

const StyledDiv = styled.div`
  /* main 부분의 크기를 넘치는 속성을 줄이는 속성1, 모자른 속성을 채우는 속성1, 해당 속성을 유지하는 속성 0 */
  flex: 1 1 0;
`;

const StyledCategoryBar = styled.span`
  display: inline-block;
  width: 80px;
  height: 5px;
  background: var(--darksnow);
  border-radius: 10px;
  animation: ${loading} 2s infinite;
`;

const StyledMain = styled.main`
  padding: 28px;
  width: 100%;
  height: 100%;
  background: var(--white);
  line-height: 1.6rem;
  h1 {
    display: block;
    width: 70%;
    height: 28px;
    margin: 12px 0 24px;
    background-color: var(--darksnow);
    animation: ${loading} 2s infinite;
    overflow: hidden;
    position: relative;
  }
  h3 {
    display: block;
    width: 85%;
    height: 18px;
    margin-bottom: 10px;
    background-color: var(--darksnow);
    animation: ${loading} 2s infinite;
    &:nth-child(5) {
      width: 30%;
    }
  }
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
  background: var(--white);
  border-radius: 12px;
  line-height: 1.5rem;
  h2 {
    display: block;
    width: 30%;
    height: 26px;
    margin: 12px 0 24px;
    background-color: var(--darksnow);
    animation: ${loading} 2s infinite;
  }
  p {
    display: block;
    width: 100%;
    height: 18px;
    margin-bottom: 10px;
    background-color: var(--darksnow);
    animation: ${loading} 2s infinite;
    &:nth-child(3n + 1) {
      width: 70%;
      margin-bottom: 24px;
    }
  }
`;


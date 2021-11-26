import Input from '../components/Input';
import SubHeader from '../components/SubHeader';
import Footer from '../components/Footer';
import styled from 'styled-components';

const EventDetail = () => {

  return (
    <>
      <SubHeader />
      <StyledDiv>
        <StyledMain>
          <span>목요일 오후 2시 ~ 6시</span>
          <h1>[멘토특강] 그로스해킹 101 BY 마켓핏랩 차경묵 테크리더 </h1>
          <h3>📍1층 오픈라운지</h3>
          <h3>👥12 / 42</h3>
          <Input />
        </StyledMain>
        <StyledSection>
          <StyledArticle>
            <h2>infomation</h2>
            <p>[이번 멘토특강은 온라인으로 진행됩니다]
    마켓핏랩 정성영(Growth Director), 변성철(Business Analyst)님과 함께 요즘 웹/앱 서비스들을 데이터로 성장시키는 방법들을 소개합니다. 노트북이나 태블릿을 준비해 주세요!
    링크주소: https://bit.ly/3x7RRyR</p>
            <span>#데이터 마케팅</span>
            <span>#그로스 해킹</span>
          </StyledArticle>
        </StyledSection>
      </StyledDiv>
      <Footer />
    </>
  );
};

export default EventDetail;


const StyledDiv = styled.div`
  // main 부분의 크기를 넘치는 속성을 줄이는 속성1, 모자른 속성을 채우는 속성1, 해당 속성을 유지하는 속성 0
  flex: 1 1 0;
`;

const StyledMain = styled.main`
  padding: 28px;
  width: 100%;
  height: 100%px;
  background: var(--white);
  line-height: 1.6rem;
  font-size: 1rem;
  span {
    color: var(--black  );
    font-weight: 700;
  } 
  h1 {
    margin: 2px 0 14px;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.9rem;
  }
`;

const StyledSection = styled.section`
  padding: 16px;
  width: 100%;
  height: 100%px;
`;

const StyledArticle = styled.article`
  padding: 18px;
  width: 100%;
  height: 100%px;
  background: var(--white);
  border-radius: 12px;
  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  p {
    margin-bottom: 12px;
    line-height: 1.6rem;
  }
  span {
    display: inline-block;
    font-size: 0.9rem;
    border-radius: 50px;
    margin-right: 8px;
    padding: 8px 12px;
    background: var(--darksnow);
  }
`;
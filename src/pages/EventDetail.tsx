import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import SubHeader from '../components/SubHeader';
import SubmitInput from '../components/SubmitInput';
import Footer from '../components/Footer';
import { datas } from '../data';

const EventDetail: React.FC = () => {
  const params: any = useParams();
  const event: any = datas.find((data: any) => data.id === params.eventId);
  console.log(event);

  return (
    <>
      <SubHeader />
      <StyledDiv>
        <StyledMain>
          <span>{event.date}</span>
          <h1>{event.title} </h1>
          <h3>📍{event.location}</h3>
          <h3>
            👥 {event.attendee} / {event.limit}
          </h3>
          <SubmitInput />
        </StyledMain>
        <StyledSection>
          <StyledArticle>
            <h2>infomation</h2>
            <p>{event.information}</p>
            {event.keyword &&
              event.keyword.map((tag: string) => {
                return <span>#{tag}</span>;
              })}
          </StyledArticle>
        </StyledSection>
      </StyledDiv>
      <Footer />
    </>
  );
};

const StyledDiv = styled.div`
  /* main 부분의 크기를 넘치는 속성을 줄이는 속성1, 모자른 속성을 채우는 속성1, 해당 속성을 유지하는 속성 0 */
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
    color: var(--black);
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

export default EventDetail;

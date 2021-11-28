import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = ({
  id,
  date,
  title,
  keyword,
  location,
  eventDate,
  week,
}: any) => {
  let time = date?.split('T')[1];
  const day = week[eventDate.getDay()];
  return (
    <Event>
      <StyledCardDateDiv>
        <h1>{date?.split('-')[2].split('T')[0]}</h1>
        <h3>{day}</h3>
      </StyledCardDateDiv>

      <StyledCardInfoDiv>
        <h1>{title}</h1>
        <div>
          {keyword &&
            keyword.map((keyword: string) => {
              return <span>#{keyword}</span>;
            })}
        </div>
        <StyledEventInfoDiv>
          <Icon />
          <p> {time}</p>
          <Icon />
          <p>{location}</p>
        </StyledEventInfoDiv>
      </StyledCardInfoDiv>
    </Event>
  );
};

const Event = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background: #fff;
  margin-bottom: 14px;
  border-radius: 10px;
  padding: 17px 10px;
  :hover {
    cursor: pointer;
  }
`;

const StyledCardDateDiv = styled.div`
  width: 20%;
  max-width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin-right: 17px;

  h1 {
    font-weight: normal;
    font-size: 32px;
    line-height: 1;
  }
  h3 {
    font-size: 12px;
    line-height: 1.5;
  }
`;

const StyledCardInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-weight: 700;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    line-height: 18px;
    color: #c4c4c4;
  }
  p:nth-child(even) {
    margin-right: 15px;
  }
  span {
    font-size: 12px;
    line-height: 18px;
    color: #000000;
  }
`;

const StyledEventInfoDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 5px;
`;

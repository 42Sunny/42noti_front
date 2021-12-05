import styled from 'styled-components';

const colors: any = {
  event: '#6976EF',
  exam: '#42DAD1',
  conference: '#50BBF8',
  rush: '#FF7991',
  hackaton: '#7583FD',
  meetup: ' #50BBF8',
  kickoff: ' #50BBF8',
};

export const EventCard = ({
  id,
  beginAt,
  title,
  tags,
  location,
  week,
  category,
}: any) => {
  let eventDate = new Date(beginAt);
  const month = beginAt?.split('-')[2].split('T')[0];
  const day = week[eventDate.getDay()];
  const time = beginAt
    ? `${beginAt?.split('T')[1].split('.')[0].split(':')[0]}:${
        beginAt?.split('T')[1].split('.')[0].split(':')[1]
      }`
    : '';
  return (
    <Card>
      <StyledCardDateDiv>
        <StyledCardRectangle color={colors[category]} />
        <h1>{month}</h1>
        <h3>{day}</h3>
      </StyledCardDateDiv>

      <StyledCardInfoDiv>
        <h1>{title}</h1>
        <span>
          {tags &&
            tags.map((keyword: string, index: number) => (
              <span key={index}>#{keyword}</span>
            ))}
        </span>
        <StyledEventInfoDiv>
          <StyledFlexDiv>
            <Icon />
            <p> {time}</p>
          </StyledFlexDiv>
          <StyledFlexDiv>
            <Icon />
            <p>{location}</p>
          </StyledFlexDiv>
        </StyledEventInfoDiv>
      </StyledCardInfoDiv>
    </Card>
  );
};

const Card = styled.div`
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
  position: relative;
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

const StyledCardRectangle = styled.span`
  position: absolute;
  width: 4px;
  height: 45px;
  left: -10px;
  top: 0;
  background: ${(props) => props.color || 'black'};

  border-radius: 10px;
  transform: rotate(-180deg);
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
    margin-right: 10px;
    color: #000000;
  }
`;

const StyledEventInfoDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  min-width: 12px;
  min-height: 12px;
  max-width: 12px;
  max-height: 12px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 5px;
`;

const StyledFlexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;

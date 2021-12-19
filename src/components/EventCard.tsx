import styled from 'styled-components';
import { colors } from '../consts/color';

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
      <StyledDateDiv>
        <StyledCategoryBar color={colors[category]} />
        <h1>{month}</h1>
        <h3>{day}</h3>
      </StyledDateDiv>
      <StyledInfoDiv>
        <h1>{title}</h1>
        <span>
          {tags &&
            tags.map((keyword: string, index: number) => (
              <span key={index}>#{keyword}</span>
            ))}
        </span>
        <StyledEventInfoDiv>
          <div>
            <Icon />
            <span> {time}</span>
          </div>
          <div>
            <Icon />
            <span>{location}</span>
          </div>
        </StyledEventInfoDiv>
      </StyledInfoDiv>
    </Card>
  );
};

const Card = styled.article`
  display: flex;
  align-items: flex-start;
  width: 100%;
  background: var(--white);
  margin-bottom: 14px;
  border-radius: 10px;
  padding: 18px 16px;
  box-shadow: 0px 3px 5px 5px rgba(0, 0, 0, 0.02);
  :hover {
    cursor: pointer;
  }
`;

const StyledCategoryBar = styled.span`
  position: absolute;
  width: 4px;
  height: 46px;
  left: -16px;
  top: 0;
  background: ${(props) => props.color || 'var(--lightgray)'};
  border-radius: 10px;
  transform: rotate(-180deg);
`;

const StyledDateDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 18%;
  max-width: 36px;
  margin-right: 16px;
  h1 {
    font-size: 1.9rem;
    font-weight: 400;
    line-height: 0.9;
    margin-bottom: 3px;
  }
  h3 {
    font-size: 0.8rem;
  }
`;

const StyledInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 4px;
  }
  span {
    font-size: 0.85rem;
    line-height: 18px;
    margin-right: 8px;
    color: var(--gray);
    margin-bottom: 2px;
  }
`;

const StyledEventInfoDiv = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      font-size: 0.85rem;
      line-height: 18px;
      color: var(--gray);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    span:nth-child(even) {
      margin-right: 15px;
    }
  }
`;

const Icon = styled.span`
  display: inline-block;
  min-width: 12px;
  min-height: 12px;
  max-width: 12px;
  max-height: 12px;
  border-radius: 50%;
  background: #c4c4c4;
  margin-right: 5px;
`;

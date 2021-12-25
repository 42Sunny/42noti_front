import { useState } from 'react';
import styled from 'styled-components';
import {
  handleFilterEvents,
  useEventsDispatch,
  useEventsState,
} from '../contexts/EventContext';
import Button from './Button';

const EventCategory = () => {
  const [clicked, setClicked] = useState('All');
  const dispatch = useEventsDispatch();
  const state = useEventsState();

  const handleOnclick = (e: any) => {
    const category = e.target.innerText;
    const allEvents = state.allEvents.data;
    setClicked(category);

    const filteredEvents = allEvents.filter((event) => {
      if (category !== 'All') {
        return event.category.toUpperCase() === category.toUpperCase();
      } else {
        return true;
      }
    });
    handleFilterEvents(dispatch, filteredEvents);
  };

  return (
    <StyledCategoryDiv>
      <Button
        clicked={clicked === 'All'}
        title="All"
        onClick={(e) => handleOnclick(e)}
      />
      <Button
        clicked={clicked === 'conference'}
        title="conference"
        onClick={(e) => handleOnclick(e)}
      />
      <Button
        clicked={clicked === 'exam'}
        title="exam"
        onClick={(e) => handleOnclick(e)}
      />
      <Button
        clicked={clicked === 'hackathon'}
        title="hackathon"
        onClick={(e) => handleOnclick(e)}
      />
      <Button
        clicked={clicked === 'rush'}
        title="rush"
        onClick={(e) => handleOnclick(e)}
      />
    </StyledCategoryDiv>
  );
};

export default EventCategory;

const StyledCategoryDiv = styled.div`
  margin-bottom: 10px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  min-height: 50px;
`;

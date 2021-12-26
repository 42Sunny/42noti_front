import React, { useState } from 'react';
import { useCallback } from 'react';

import styled from 'styled-components';
import {
  handleUpdaterEvents,
  useEventsDispatch,
  useEventsState,
} from '../contexts/EventContext';
import Button from './Button';

const EventCategory = () => {
  const [clicked, setClicked] = useState('All');
  const dispatch = useEventsDispatch();
  const state = useEventsState();

  const handleOnclick = useCallback(
    (e: any) => {
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
      handleUpdaterEvents(dispatch, filteredEvents);
    },
    [state.allEvents.data, dispatch],
  );
  //useEffect(() => {}, [clicked]);
  return (
    <StyledCategoryDiv>
      <Button
        //clicked={clicked.current === 'All'}
        clicked={clicked === 'All'}
        title="All"
        onClick={(e) => handleOnclick(e)}
      />
      <Button
        //clicked={clicked.current === 'conference'}
        clicked={clicked === 'conference'}
        title="conference"
        onClick={(e) => handleOnclick(e)}
      />
      <Button
        //clicked={clicked.current === 'exam'}
        clicked={clicked === 'exam'}
        title="exam"
        onClick={(e) => handleOnclick(e)}
      />
      <Button
        //clicked={clicked.current === 'hackathon'}
        clicked={clicked === 'hackathon'}
        title="hackathon"
        onClick={(e) => handleOnclick(e)}
      />
      <Button
        //clicked={clicked.current === 'rush'}
        clicked={clicked === 'rush'}
        title="rush"
        onClick={(e) => handleOnclick(e)}
      />
    </StyledCategoryDiv>
  );
};

//export default React.memo(EventCategory);
export default EventCategory;

const StyledCategoryDiv = styled.div`
  margin-bottom: 10px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  min-height: 50px;
`;

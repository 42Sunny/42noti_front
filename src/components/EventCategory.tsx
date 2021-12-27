import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import styled from 'styled-components';
import { categoryList } from '../constants/category';

import {
  updateEvents,
  useEventsDispatch,
  useEventsState,
} from '../contexts/EventContext';
import { filterUpcomingEvents } from '../pages/Main';
import RadioButton from './RadioButton';

const EventCategory = () => {
  const [checked, setChecked] = useState('All');
  const dispatch = useEventsDispatch();
  const state = useEventsState();

  useEffect(() => {
    const events = state.allEvents.data;
    updateEvents(dispatch, filterUpcomingEvents(events));
  }, [dispatch, state.allEvents.data]);

  const handleOnChange = useCallback(
    (e: any) => {
      const category = e.target.nextSibling.data;
      const allEvents = state.allEvents.data;
      setChecked(category);
      const filteredEvents = allEvents.filter((event) => {
        if (category !== 'All') {
          return event.category.toUpperCase() === category.toUpperCase();
        } else {
          return true;
        }
      });
      updateEvents(dispatch, filteredEvents);
    },
    [state.allEvents.data, dispatch],
  );
  return (
    <StyledCategoryDiv>
      {categoryList.map((category) => {
        return (
          <RadioButton
            checked={checked === category}
            label={category}
            onChange={(e) => handleOnChange(e)}
          />
        );
      })}
    </StyledCategoryDiv>
  );
};

export default React.memo(EventCategory);
//export default EventCategory;

const StyledCategoryDiv = styled.div`
  margin-bottom: 10px;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  min-height: 50px;
`;

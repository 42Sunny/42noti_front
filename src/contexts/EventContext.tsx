import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  Dispatch,
} from 'react';
import { getEvents, getEvent, getUserEvents } from '../api/api';
import { Event } from '../types/event';

type Props = {
  children?: React.ReactNode;
};

// 비동기 요청을 위한 타입
type EventsState = {
  events: {
    loading: boolean;
    error: any;
    data: Event[] | null;
  };
  event: {
    loading: boolean;
    error: any;
    data: Event | null;
  };
  userEvents: {
    loading: boolean;
    error: any;
    data: Event[] | null;
  };
};

// 액션들을 위한 타입
type Action =
  | { type: 'LOADING_EVENTS' }
  | { type: 'GET_EVENTS'; data: Event[] }
  | { type: 'FAILURE_EVENTS'; error: any }
  | { type: 'LOADING_EVENT' }
  | { type: 'GET_EVENT'; data: Event }
  | { type: 'FAILURE_EVENT'; error: any }
  | { type: 'LOADING_USER_EVENTS' }
  | { type: 'GET_USER_EVENTS'; data: Event[] }
  | { type: 'FAILURE_USER_EVENTS'; error: any }
  | { type: 'UPDATE_EVENTS'; data: Event[] };

// 디스패치를 위한 타입 (Dispatch 를 리액트에서 불러올 수 있음), 액션들의 타입을 Dispatch 의 Generics로 설정
type EventsDispatch = Dispatch<Action>;

//initialState
const initialState = {
  events: {
    loading: false,
    error: null,
    data: null,
  },
  event: {
    loading: false,
    error: null,
    data: null,
  },
  userEvents: {
    loading: false,
    error: null,
    data: null,
  },
};

// reducer useReducer 의 인자
const reducer = (state: EventsState, action: Action): EventsState => {
  switch (action.type) {
    case 'LOADING_EVENTS':
      return {
        ...state,
        events: {
          ...state.events,
          loading: true,
        },
      };
    case 'GET_EVENTS':
      return {
        ...state,
        events: {
          ...state.events,
          data: action.data,
          loading: false,
        },
      };
    case 'UPDATE_EVENTS':
      return {
        ...state,
        events: {
          ...state.events,
          data: action.data,
          loading: false,
        },
      };
    case 'FAILURE_EVENTS':
      return {
        ...state,
        events: {
          ...state.events,
          error: action.error,
          loading: false,
        },
      };
    case 'LOADING_EVENT':
      return {
        ...state,
        event: {
          ...state.event,
          loading: true,
        },
      };
    case 'GET_EVENT':
      return {
        ...state,
        event: {
          ...state.event,
          data: action.data,
          loading: false,
        },
      };
    case 'FAILURE_EVENT':
      return {
        ...state,
        event: {
          ...state.event,
          error: action.error,
          loading: false,
        },
      };
    case 'LOADING_USER_EVENTS':
      return {
        ...state,
        userEvents: {
          ...state.userEvents,
          loading: true,
        },
      };
    case 'GET_USER_EVENTS':
      return {
        ...state,
        userEvents: {
          ...state.userEvents,
          data: action.data,
          loading: false,
        },
      };
    case 'FAILURE_USER_EVENTS':
      return {
        ...state,
        userEvents: {
          ...state.userEvents,
          error: action.error,
          loading: false,
        },
      };
    default:
      throw new Error('invalid action type');
  }
};

// Context 만들기
const EventsStateContext = createContext<null | EventsState>(null);
const EventsDispatchContext = createContext<null | EventsDispatch>(null);

// API를 요청하는 함수
export const fetchEvents = async (dispatch: React.Dispatch<Action>) => {
  dispatch({ type: 'LOADING_EVENTS' });
  try {
    const response = await getEvents();
    const sortedData = response.data.sort((a: Event, b: Event) => {
      if (a.beginAt < b.beginAt) return -1;
      else return 1;
    });
    dispatch({ type: 'GET_EVENTS', data: sortedData });
  } catch (e) {
    dispatch({ type: 'FAILURE_EVENTS', error: e });
  }
};

export const fetchEvent = async (
  dispatch: React.Dispatch<Action>,
  eventId: number,
) => {
  dispatch({ type: 'LOADING_EVENT' });
  try {
    const response = await getEvent(eventId);
    dispatch({ type: 'GET_EVENT', data: response.data });
  } catch (e) {
    dispatch({ type: 'FAILURE_EVENT', error: e });
  }
};

export const updateEvents = (
  dispatch: React.Dispatch<Action>,
  events: Event[],
) => {
  events && dispatch({ type: 'UPDATE_EVENTS', data: events });
};

export const fetchUserEvents = async (dispatch: React.Dispatch<Action>) => {
  dispatch({ type: 'LOADING_USER_EVENTS' });
  try {
    const response = await getUserEvents();
    const sortedData = response.data.sort((a: Event, b: Event) => {
      if (a.beginAt < b.beginAt) return -1;
      else return 1;
    });
    dispatch({ type: 'GET_USER_EVENTS', data: sortedData });
  } catch (e) {
    dispatch({ type: 'FAILURE_USER_EVENTS', error: e });
  }
};

// provider 반환
const EventProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchEvents(dispatch);
  }, []);

  return (
    <EventsStateContext.Provider value={state}>
      <EventsDispatchContext.Provider value={dispatch}>
        {children}
      </EventsDispatchContext.Provider>
    </EventsStateContext.Provider>
  );
};

// state, dispatch 를 잘 쓰기위한 커스텀 hook
export const useEventsState = () => {
  const EventsState = useContext(EventsStateContext);
  if (!EventsState) throw new Error('Cannot find EventProvider');
  return EventsState;
};

export const useEventsDispatch = () => {
  const EventsDispatch = useContext(EventsDispatchContext);
  if (!EventsDispatch) throw new Error('Cannot find EventProvider');
  return EventsDispatch;
};

export default EventProvider;

import React, { Dispatch, createContext, useReducer, useContext } from 'react';

type Props = {
  children: React.ReactNode;
};

export type UserState = {
  userId: string;
  isLogin: boolean;
};

type Action =
  | { type: 'SET_USER_INFO'; userInfo: UserState }
  | { type: 'SET_LOGIN' }
  | { type: 'SET_LOGOUT' };

type UserDispatch = Dispatch<Action>;

const initialState = {
  userId: '-',
  isLogin: false,
};

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...action.userInfo,
      };
    case 'SET_LOGIN':
      return {
        ...state,
        isLogin: true,
      };
    case 'SET_LOGOUT':
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};

const UserStateContext = createContext<null | UserState>(null);
const UserDispatchContext = createContext<null | UserDispatch>(null);

const UserProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const UserState = useContext(UserStateContext);
  if (!UserState) throw new Error('Cannot find UserProvider');
  return UserState;
};

export const useUserDispatch = () => {
  const UserDispatch = useContext(UserDispatchContext);
  if (!UserDispatch) throw new Error('Cannot find UserProvider');
  return UserDispatch;
};

export default UserProvider;

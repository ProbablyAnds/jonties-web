import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import globalReducer from './globalReducer';

type LayoutProps = {
  children: ReactNode;
};

interface GlobalContextType {
  state: any;
  dispatch: React.Dispatch<any>;
}

const initialState = {
  data: [], currentBasket: []
};

const GlobalContext = createContext<GlobalContextType>({state: initialState, dispatch: () => {}});

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({children}: LayoutProps) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
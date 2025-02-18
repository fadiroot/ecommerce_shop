/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

interface FilterState {
  items: any;
  query: any;
  columnsInfo: any[];
  initialValues: any;
  fetchFunc: () => void;
}

type FilterAction =
  | { type: 'RESET' }
  | { type: 'SET_QUERY'; payload: { query: any } }
  | { type: 'SET_ITEMS'; payload: { items: any[] } }
  | { type: 'INIT'; payload: FilterState }
  | { type: 'NONE' };

interface FilterContextType extends FilterState {
  setQuery: Dispatch<{ query: any }>;
}

const initialFilterState: FilterState = {
  items: [],
  query: null,
  columnsInfo: [],
  initialValues: {},
  fetchFunc: () => {},
};

const reducer = (state: FilterState, action: FilterAction): FilterState => {
  switch (action.type) {
    case 'RESET': {
      return initialFilterState;
    }
    case 'SET_QUERY': {
      const { query } = action.payload;
      return {
        ...state,
        query,
      };
    }
    case 'SET_ITEMS': {
      const { items } = action.payload;
      return {
        ...state,
        items,
      };
    }
    case 'INIT': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'NONE': {
      return {
        ...state,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const FilterContext = createContext<FilterContextType>({
  ...initialFilterState,
  setQuery: () => {},
});

interface FiltersProviderProps {
  children: ReactNode;
  values: FilterState;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({ children, values }) => {
  const [state, reducerDispatch] = useReducer(reducer, values);
  const setQuery = (query: any) => {
    reducerDispatch({
      type: 'SET_QUERY',
      payload: {
        query,
      },
    });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        ...values,
        setQuery,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

import { useContext } from 'react';
import { FilterContext } from '../contexts/filterContext';

const useFilters = () => useContext(FilterContext);

export default useFilters;

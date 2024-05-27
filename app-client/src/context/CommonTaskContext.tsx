import dayjs from 'dayjs';
import React, { createContext, useContext, useState } from 'react';
import { FilterProps } from '../components/DataTableFilter';

const CommonTaskContext = createContext({});

// interface filterProps {
//   fromDate?: string;
//   toDate?: string;
//   status?: string[];
// }

interface CommonContextDataType {
  filters: FilterProps;
  updateFilters: (payload: FilterProps) => void;
}

export function CommonTaskProvider({ children }: {children: React.ReactElement}) {

  const [filters, setFilters] = useState<FilterProps>({
    fromDate: dayjs().format('DD/MM/YYYY'),
    toDate: dayjs().add(30, 'day').format('DD/MM/YYYY'),
    status: ''
  });

  const updateFilters = (payload: FilterProps) => {
    setFilters(payload);
  }

  const contextData: CommonContextDataType = {
    filters,
    updateFilters
  }

  return (
    <CommonTaskContext.Provider value={contextData}>
      {children}
    </CommonTaskContext.Provider>
  );
}

// Custom hook to use common context
export function useCommonTaskContext(): CommonContextDataType {
  return useContext(CommonTaskContext) as CommonContextDataType;
}
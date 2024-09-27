import * as React from 'react';
import { createContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface AppContextType {
  tabNumber: number;
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
  setResetTab: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tabNumber, setTabNumber] = useState(0);
  const [resetTab, setResetTab] = useState(true);
  const location = useLocation();

  React.useEffect(() => {
    if (resetTab) {
      setTabNumber(0);
    } else {
      setResetTab(true);
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const contextValue = {
    tabNumber,
    setTabNumber,
    setResetTab,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (!context) {
    throw new Error('AppContext is not available');
  }

  return context;
};

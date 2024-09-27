import { useAppContext } from 'Context/AppContext';
import { SchoolAdminList, SchoolGeneralInfo } from './Tabs';

export const SchoolInfo = () => {
  const { tabNumber } = useAppContext();

  if (tabNumber === 0) return <SchoolGeneralInfo />;
  if (tabNumber === 1) return <SchoolAdminList />;

  return <></>;
};

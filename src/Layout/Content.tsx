import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

import styles from './layout.module.css';

export interface ContentPropType {
  children?: React.ReactElement;
  navKey?: string;
  subNavKey?: string;
}

export default function Content(props: ContentPropType) {
  const { children, navKey, subNavKey } = props;

  return (
    <Paper
      sx={{
        margin: 'auto',
        borderRadius: 0,
        overflow: 'hidden',
        backgroundColor: 'inherit',
        boxShadow: 'none',
      }}
    >
      <NavigationTree navKey={navKey} subNavKey={subNavKey} />
      <div style={{ padding: '0px 25px' }}>{children}</div>
    </Paper>
  );
}

interface NavigationTreeProps {
  navKey?: string;
  subNavKey?: string;
}

const navList = {
  al: { name: 'Danh sách tài khoản', path: '/account-list' },
  as: { name: 'Thêm trường', path: '/add-school' },
  sl: { name: 'Danh sách trường', path: '/school-list' },
};

const subNavList = {
  ai: { name: 'Chi tiết tài khoản', path: '/account-list/account-info' },
  si: { name: 'Chi tiết trường', path: '/school-list/school-info' },
};

const NavigationTree: React.FC<NavigationTreeProps> = ({
  navKey,
  subNavKey,
}) => {
  return (
    <div className={styles.navigation_tree}>
      <Link
        className={`${styles.link} ${
          navKey ? styles.previous_nav : styles.current_nav
        }`}
        to='/'
      >
        Home
      </Link>
      &nbsp;&nbsp;
      {navKey && (
        <>
          <span>{'>>'}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link
            className={`${styles.link} ${
              subNavKey ? styles.previous_nav : styles.current_nav
            }`}
            to={navList[navKey as keyof typeof navList].path}
          >
            {navList[navKey as keyof typeof navList].name}
          </Link>
          &nbsp;&nbsp;
        </>
      )}
      {subNavKey && (
        <>
          <span>{'>>'}</span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div className={`${styles.link} ${styles.current_nav}`}>
            {subNavList[subNavKey as keyof typeof subNavList].name}
          </div>
          &nbsp;&nbsp;
        </>
      )}
    </div>
  );
};

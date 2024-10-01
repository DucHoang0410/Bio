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
  as: { name: 'Thêm thí nghiệm', path: '/add-test' },
  sl: { name: 'Danh sách thí nghiệm', path: '/test-list' },
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
    </div>
  );
};

import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import styles from './layout.module.css';
import { Link, useLocation } from 'react-router-dom';

const categories = [
  {
    id: 'Thí nghiệm',
    children: [
      {
        id: 'Danh sách thí nghiệm',
        icon: <DomainOutlinedIcon />,
        path: 'test-list',
      },
      {
        id: 'Thêm thí nghiệm',
        icon: <AddCircleOutlineOutlinedIcon />,
        path: 'add-test',
      },
    ],
  }
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const location = useLocation();
  const [navPath, setNavPath] = React.useState('');

  React.useEffect(() => {
    setNavPath(location.pathname.split('/')[1]);
  }, [location.pathname]);

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <ListItem
          sx={{
            ...item,
            ...itemCategory,
            fontSize: 22,
            color: '#fff',
            paddingLeft: '15px',
          }}
        >
          <ListItemIcon sx={{ marginRight: '10px' }}>
            <img className={styles.img} src='/Images/logo.png' alt='' />
          </ListItemIcon>
          Biotech Lab
        </ListItem>
        <Link to={'/'} className={styles.link}>
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Trang chủ</ListItemText>
          </ListItem>
        </Link>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, path }) => (
              <Link to={`/${path}`} className={styles.link} key={childId}>
                <ListItem disablePadding>
                  <ListItemButton selected={path === navPath} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{childId}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from 'antd';

import { PATH_INFO } from 'router';
import { useAppContext } from 'Context/AppContext';
import { postRequest } from 'api';

// const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
  onDrawerToggle: () => void;
}

interface PathInfoInterface {
  title: string;
  tabList?: string[];
}

export default function Header(props: HeaderProps) {
  const { tabNumber, setTabNumber } = useAppContext();
  const { onDrawerToggle } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [pathInfo, setPathInfo] = React.useState<PathInfoInterface>();

  React.useEffect(() => {
    let info = PATH_INFO[location.pathname as keyof typeof PATH_INFO];
    if (!info) {
      info =
        PATH_INFO[
          `/${location.pathname.split('/')[1]}/${
            location.pathname.split('/')[2]
          }` as keyof typeof PATH_INFO
        ];
    }

    setPathInfo(info);
  }, [location.pathname]);

  const handleLogout = async () => {
    Modal.confirm({
      style: { fontFamily: 'Quicksand' },
      title: 'Xác nhận Đăng xuất?',
      async onOk() {
        await postRequest('/cms/auth/customer/log-out');
        localStorage.removeItem('email');
        localStorage.removeItem('uid');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('role');
        navigate('/login');
      },
      onCancel() {},
    });
  };

  return (
    <React.Fragment>
      <AppBar color='primary' position='sticky' elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems='center'>
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={onDrawerToggle}
                edge='start'
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <IconButton
                onClick={handleLogout}
                color='inherit'
                sx={{ p: 0.5 }}
              >
                <Avatar src='/Images/logo.png' alt='My Avatar' />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component='div'
        color='primary'
        position='static'
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs>
              <Typography color='inherit' variant='h5' component='h1'>
                {pathInfo?.title}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component='div'
        position='static'
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs
          value={tabNumber}
          textColor='inherit'
          onChange={(e, value) => setTabNumber?.(value)}
        >
          {pathInfo?.tabList ? (
            pathInfo.tabList.map((e, index) => (
              <Tab value={index} label={e} key={index} />
            ))
          ) : (
            <Tab />
          )}
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

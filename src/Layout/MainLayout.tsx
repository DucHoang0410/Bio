import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import Navigator from './Navigator';
import Content, { ContentPropType } from './Content';
import Header from './Header';
import { theme } from './theme';
// import { Copyright } from './Copyright';

const drawerWidth = 256;

export default function MainLayout(props: ContentPropType) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem('email')) navigate('/login');
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (!localStorage.getItem('email')) return <div></div>;
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box
          component='nav'
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {isSmUp ? null : (
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant='temporary'
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box component='main' sx={{ flex: 1, bgcolor: '#eaeff1' }}>
            <Content {...props} />
          </Box>
          <Box component='footer' sx={{ p: 2, bgcolor: '#eaeff1' }}>
            {/* <Copyright /> */}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

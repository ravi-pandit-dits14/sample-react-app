import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const settings = ['Logout'];

const AppNavBar = ({
  setDrawer,
  user,
  open,
}: {
  setDrawer?: (open: boolean) => void;
  user?: any;
  open?: boolean;
}) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (setDrawer) {
        const openDrawerValue = !open;
        setDrawer(openDrawerValue);
      }
    },
    [setDrawer, open]
  );

  const handleOpenUserMenu = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  }, []);

  const handleCloseUserMenu = React.useCallback((event:string) => {
    if(event === 'Logout') {
      localStorage.clear();  
      navigate('/login');
    }
    setAnchorElUser(null);
  }, []);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {user?<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleOpenNavMenu}
          >
            <MenuIcon />
          </IconButton>:null}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          {user ? (
            <>
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Typography variant="body1" sx={{ color: 'white', mr: 2 }}>
              Welcome, {user?.name || 'Guest'}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box></>) : (null)}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default AppNavBar;
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation } from 'react-router-dom';

interface SideBarProps {
  toggleDrawer: (open: boolean) => () => void;
}

const SideBar: React.FC<SideBarProps> = ({ toggleDrawer }) => {
  const location = useLocation();

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ mt: '50px' }}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/dashboard"
            selected={location.pathname === '/dashboard'}
          >
            <ListItemIcon>
              <DashboardIcon color={location.pathname === '/dashboard' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/users"
            selected={location.pathname === '/users'}
          >
            <ListItemIcon>
              <PeopleIcon color={location.pathname === '/users' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
};

export default SideBar;

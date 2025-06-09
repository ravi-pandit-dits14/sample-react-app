import { Drawer } from '@mui/material';
import React, { useEffect, useState, type ReactNode } from 'react';
import api from '../../core/interceptor';
import AppNavBar from '../Header';
import SideBar from '../Drawer';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    api
      .get('auth/profile')
      .then((response) => {
        console.log('User detail:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        // Handle login failure (e.g., show error message)
      });
  }, []);

  return (
    <>
      <AppNavBar user={user} setDrawer={setOpen} open={open} />
      <div style={{ display: 'flex' }}>
        <Drawer open={open}>
            <SideBar toggleDrawer={(open: boolean) => () => setOpen(open)} />
        </Drawer>
        <main style={{ flexGrow: 1, padding: '2rem' }}>{children}</main>
      </div>
    </>
  );
};

export default MainLayout;

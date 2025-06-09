import AppNavBar from '../Header';

import type { ReactNode } from 'react';

const UnAuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AppNavBar />
      <main>{children}</main>
    </>
  );
};
export default UnAuthLayout;

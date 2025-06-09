// const Sidebar = () => {
//   return (
//     <div style={{ width: '250px', background: '#f4f4f4', padding: '1rem' }}>
//       <h2>Sidebar</h2>
//       <ul>
//         <li>Dashboard</li>
//         <li>Settings</li>
//         <li>Profile</li>
//         <li>Logout</li>
//       </ul>
//     </div>
//   );
// }
// export default Sidebar;

import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Dashboard' },
  // { key: '2', icon: <DesktopOutlined />, label: 'Settings' },
  // { key: '3', icon: <ContainerOutlined />, label: 'Profile' },
  {
    key: '4',
    icon: <UserOutlined />,
    label: 'Users',
  },
  // {
  //   key: 'sub1',
  //   label: 'Navigation One',
  //   icon: <MailOutlined />,
  //   children: [
  //     { key: '5', label: 'Option 5' },
  //     { key: '6', label: 'Option 6' },
  //     { key: '7', label: 'Option 7' },
  //     { key: '8', label: 'Option 8' },
  //   ],
  // },
  // {
  //   key: 'sub2',
  //   label: 'Navigation Two',
  //   icon: <AppstoreOutlined />,
  //   children: [
  //     { key: '9', label: 'Option 9' },
  //     { key: '10', label: 'Option 10' },
  //   ],
  // },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === '4') {
      navigate('/users'); // Navigate to the Users page
    }
    else if (e.key === '1') {
      navigate('/dashboard'); // Navigate to the Home page
    }
    // Add more navigation logic here if needed
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh',maxWidth: '160px' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          items={items}
          onClick={handleMenuClick} // Handle menu item clicks
        />
      </Sider>
    </Layout>
  );
};

export default Sidebar;
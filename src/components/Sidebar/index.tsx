import { Box, List } from '@mui/material';
import React, { ReactElement } from 'react';
import { GridSideBar } from 'Layout';
import {
  ContextType,
  SidebarStatusContext,
} from 'components/Sidebar/SidebarStatusContext';
import {
  AppsOutlined,
  DashboardOutlined,
  LabelOutlined,
  PeopleOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import SidebarItem from 'components/Sidebar/SidebarItem';

export interface SidebarItemI {
  to: string;
  label: string;
  icon: ReactElement;
}

const sideBarItems: SidebarItemI[] = [
  {
    to: '/dashboard',
    label: 'dashboard',
    icon: <DashboardOutlined />,
  },
  {
    to: '/apps',
    label: 'apps',
    icon: <AppsOutlined />,
  },
  {
    to: '/tags',
    label: 'tags',
    icon: <LabelOutlined />,
  },
  {
    to: '/users',
    label: 'users',
    icon: <PeopleOutlined />,
  },
  {
    to: '/settings',
    label: 'settings',
    icon: <SettingsOutlined />,
  },
];

const Sidebar: React.FC = () => {
  const { collapsed } = React.useContext(SidebarStatusContext) as ContextType;

  return (
    <GridSideBar
      sx={{
        width: collapsed ? '60px' : '300px',
        transition: 'width 0.5s',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <List sx={{ pt: 0 }}>
          {sideBarItems.map((item, i) => (
            <SidebarItem
              key={`sidebar-item-${item.label}-${i}`}
              collapsed={collapsed}
              icon={item.icon}
              label={item.label}
              to={item.to}
            />
          ))}
        </List>
      </Box>
    </GridSideBar>
  );
};

export default Sidebar;

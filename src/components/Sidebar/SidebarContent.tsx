import { List, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { SidebarItemI } from 'components/Header/TopNavigation';
import SidebarItem from 'components/Sidebar/SidebarItem';
import {
  ContextType,
  SidebarStatusContext,
} from 'components/Sidebar/SidebarStatusContext';
import React from 'react';

export interface SidebarContentProps {
  sidebarItems: SidebarItemI[];
}

const SidebarContent: React.FC<SidebarContentProps> = ({ sidebarItems }) => {
  const { collapsed } = React.useContext(SidebarStatusContext) as ContextType;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Paper sx={{ height: '100%' }} square>
        <List sx={{ pt: 0 }}>
          {sidebarItems.map((item, i) => (
            <SidebarItem
              key={`sidebar-item-${item.label}-${i}`}
              collapsed={collapsed}
              icon={item.icon}
              label={item.label}
              exact={item.exact}
              to={item.to}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default SidebarContent;

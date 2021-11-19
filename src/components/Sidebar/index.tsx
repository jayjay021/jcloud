import React from 'react';
import { GridSideBar } from 'Layout';
import {
  ContextType,
  SidebarStatusContext,
} from 'components/Sidebar/SidebarStatusContext';

const Sidebar: React.FC = () => {
  const { collapsed, ref } = React.useContext(
    SidebarStatusContext
  ) as ContextType;

  return (
    <GridSideBar
      id='sidebar'
      ref={ref}
      sx={{
        width: collapsed ? '60px' : '300px',
        transition: 'width 0.5s',
      }}
    ></GridSideBar>
  );
};

export default Sidebar;

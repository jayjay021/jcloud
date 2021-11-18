import React from 'react';

export type ContextType = {
  collapsed: boolean;
  toggle: () => void;
};

export const SidebarStatusContext = React.createContext<ContextType | null>(
  null
);

const SidebarStatusProvider: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarStatusContext.Provider value={{ collapsed, toggle }}>
      {children}
    </SidebarStatusContext.Provider>
  );
};

export default SidebarStatusProvider;

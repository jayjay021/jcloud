import React, { useRef } from 'react';

export type ContextType = {
  collapsed: boolean;
  toggle: () => void;
  ref: React.MutableRefObject<HTMLDivElement | null>;
};

export const SidebarStatusContext = React.createContext<ContextType | null>(
  null
);

const SidebarStatusProvider: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState<boolean>(true);
  const ref = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarStatusContext.Provider value={{ collapsed, toggle, ref }}>
      {children}
    </SidebarStatusContext.Provider>
  );
};

export default SidebarStatusProvider;

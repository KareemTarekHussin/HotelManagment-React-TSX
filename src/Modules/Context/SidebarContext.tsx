import React, { createContext, useState, ReactNode, useContext } from 'react';

interface SidebarContextType {
  toggled: boolean;
  setToggled: (value: boolean) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  toggleSidebar: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [toggled, setToggled] = useState(false);
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    if (!toggled) {
      setCollapsed(false); // Ensure the sidebar is uncollapsed when toggled open
      }
    setToggled(!toggled);
  };

  return (
    <SidebarContext.Provider value={{ toggled, setToggled, collapsed, setCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextType => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

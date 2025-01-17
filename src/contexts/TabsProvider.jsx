import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  const [tabs, setTabs] = useState({});
  const [activeTabId, setActiveTabId] = useState(null);

  const openRequestInTab = (collectionId, requestId, request) => {
    const existingTab = Object.values(tabs).find(
      tab => tab.collectionId === collectionId && tab.requestId === requestId
    );

    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    const newTabId = uuidv4();
    const newTab = {
      id: newTabId,
      collectionId,
      requestId,
      request,
      type: 'request'
    };

    setTabs(prev => ({
      ...prev,
      [newTabId]: newTab
    }));
    setActiveTabId(newTabId);
  };

  const closeTab = (tabId) => {
    setTabs(prev => {
      const newTabs = { ...prev };
      delete newTabs[tabId];
      return newTabs;
    });

    if (activeTabId === tabId) {
      const remainingTabIds = Object.keys(tabs);
      const index = remainingTabIds.indexOf(tabId);
      setActiveTabId(remainingTabIds[index - 1] || remainingTabIds[index + 1] || null);
    }
  };

  return (
    <TabsContext.Provider value={{
      tabs,
      activeTabId,
      openRequestInTab,
      closeTab,
      setActiveTabId
    }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
};
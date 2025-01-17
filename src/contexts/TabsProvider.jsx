import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TabsContext = createContext();

export const TabsProvider = ({ children }) => {
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);

  const openRequestInTab = (collectionId, requestId, request) => {
    // Check if request is already open in a tab
    const existingTab = tabs.find(
      tab => tab.collectionId === collectionId && tab.requestId === requestId
    );

    if (existingTab) {
      setActiveTabId(existingTab.id);
      return;
    }

    const newTab = {
      id: uuidv4(),
      collectionId,
      requestId,
      request,
      type: 'request'
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (tabId) => {
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTabId === tabId) {
      setActiveTabId(tabs[tabs.length - 2]?.id || null);
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
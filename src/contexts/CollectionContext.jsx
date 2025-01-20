import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { invoke } from '@tauri-apps/api/core';

const CollectionsContext = createContext();

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState({});
  const [tabs, setTabs] = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);

  const addNewCollection = async (collectionName) => {
    const collectionId = uuidv4();
    const newCollection = {
      collectionName: collectionName,
      requests: {}
    };
    
    setCollections(prev => ({
      ...prev,
      [collectionId]: newCollection
    }));
    invoke("save_collection", {
      collectionId: collectionId,
      collectionName: collectionName,
      collectionData: JSON.stringify(newCollection)
    });
  };

  const deleteCollection = (collectionId) => {
    const newCollections = { ...collections };
    delete newCollections[collectionId];
    setCollections(newCollections);
  };

  const addRequestToCollection = (collectionId, requestName, requestType, url) => {
    const requestId = uuidv4();
    const updatedCollection = {
      ...collections[collectionId],
      requests: {
        ...collections[collectionId].requests,
        [requestId]: {
          collectionId,
          requestId,
          requestName,
          requestType,
          requestURL: url,
          requestParams: {
            0: { key: "", value: "", description: "", isIncluded: true }
          },
          requestHeaders: {
            0: { key: "", value: "", description: "", isIncluded: true }
          },
          requestBody: {
            requestBodyType: "none",
            requestBodyFormData: {
              0: { key: "", value: "", description: "", isIncluded: true }
            },
            requestBodyRaw: ""
          }
        }
      }
    };
    setCollections(prev => ({
      ...prev,
      [collectionId]: updatedCollection
    }));
    invoke("save_collection", {
      collectionId,
      collectionName: updatedCollection.collectionName,
      collectionData: JSON.stringify(updatedCollection)
    });
  };

  const deleteRequestFromCollection = (collectionId, requestId) => {
    const updatedCollection = {
      ...collections[collectionId],
      requests: { ...collections[collectionId].requests }
    };
    delete updatedCollection.requests[requestId];
    setCollections(prev => ({
      ...prev,
      [collectionId]: updatedCollection
    }));
    
    invoke("save_collection", {
      collectionId,
      collectionName: updatedCollection.collectionName,
      collectionData: JSON.stringify(updatedCollection)
    });
    
    closeTab(requestId);
  };

  const updateRequestInCollection = (collectionId, requestId, updatedRequest) => {
    console.log(collectionId, requestId);
    
    if (!collections[collectionId] || !collections[collectionId].requests[requestId]) {
        console.error("Collection or request not found");
        return;
    }

    const updatedRequestData = {
        requestName: updatedRequest.requestName,
        requestType: updatedRequest.requestType,
        requestURL: updatedRequest.requestURL,
        requestParams: updatedRequest.requestParams || collections[collectionId].requests[requestId].requestParams,
        requestHeaders: updatedRequest.requestHeaders || collections[collectionId].requests[requestId].requestHeaders,
        requestBody: {
            requestBodyType: updatedRequest.requestBody?.requestBodyType || "none",
            requestBodyFormData: updatedRequest.requestBody?.requestBodyFormData || {},
            requestBodyRaw: updatedRequest.requestBody?.requestBodyRaw || ""
        }
    };

    const updatedCollection = {
        ...collections[collectionId],
        requests: {
            ...collections[collectionId].requests,
            [requestId]: updatedRequestData
        }
    };

    setCollections(prev => ({
        ...prev,
        [collectionId]: updatedCollection
    }));

    setTabs(prev => prev.map(tab => 
        tab.requestId === requestId 
            ? { ...tab, request: updatedRequestData }
            : tab
    ));

    console.log(updateRequestInCollection);

    invoke("save_collection", {
        collectionId,
        collectionName: updatedCollection.collectionName,
        collectionData: JSON.stringify(updatedCollection)
    });
  };

  const openRequestInTab = (collectionId, requestId) => {
    const request = collections[collectionId].requests[requestId];
    if (!tabs.find(tab => tab.requestId === requestId)) {
      const newTab = {
        id: uuidv4(),
        requestId,
        collectionId,
        request
      };
      setTabs(prev => [...prev, newTab]);
    }
    setActiveTabId(tabs.find(tab => tab.requestId === requestId)?.id || null);
  };

  const closeTab = (requestId) => {
    setTabs(prev => {
      const newTabs = prev.filter(tab => tab.requestId !== requestId);
      if (newTabs.length > 0 && activeTabId === requestId) {
        setActiveTabId(newTabs[newTabs.length - 1].id);
      }
      return newTabs;
    });
  };

  return (
    <CollectionsContext.Provider value={{
      collections,
      tabs,
      activeTabId,
      setCollections,
      addNewCollection,
      deleteCollection,
      addRequestToCollection,
      deleteRequestFromCollection,
      updateRequestInCollection,
      openRequestInTab,
      closeTab,
      setActiveTabId
    }}>
      {children}
    </CollectionsContext.Provider>
  );
};

export const useCollections = () => {
  const context = useContext(CollectionsContext);
  if (!context) {
    throw new Error('useCollections must be used within a CollectionsProvider');
  }
  return context;
};
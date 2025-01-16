// contexts/CollectionsContext.jsx
import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CollectionsContext = createContext();

export const CollectionsProvider = ({ children }) => {
  const [collections, setCollections] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const addNewCollection = (collectionName) => {
    const collectionId = uuidv4();
    setCollections(prev => ({
      ...prev,
      [collectionId]: {
        collectionName: collectionName,
        requests: {}
      }
    }));
  };

  const deleteCollection = (collectionId) => {
    const newCollections = { ...collections };
    delete newCollections[collectionId];
    setCollections(newCollections);
  };

  const addRequestToCollection = (collectionId, requestName, requestType, url) => {
    const requestId = uuidv4();
    setCollections(prev => ({
      ...prev,
      [collectionId]: {
        ...prev[collectionId],
        requests: {
          ...prev[collectionId].requests,
          [requestId]: {
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
      }
    }));
  };

  const deleteRequestFromCollection = (collectionId, requestId) => {
    setCollections(prev => {
      const updatedCollection = { ...prev };
      delete updatedCollection[collectionId].requests[requestId];
      return updatedCollection;
    });
  };

  const selectRequest = (collectionId, requestId) => {
    setSelectedRequest({
      collectionId,
      requestId,
      request: collections[collectionId].requests[requestId]
    });
  };

  return (
    <CollectionsContext.Provider value={{
      collections,
      selectedRequest,
      addNewCollection,
      deleteCollection,
      addRequestToCollection,
      deleteRequestFromCollection,
      selectRequest
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

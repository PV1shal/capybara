import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import NewRequestModal from "../NewRequestModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CollectionContextMenu from "../CollectionContextMenu";
import { v4 as uuidv4 } from 'uuid';

const CollectionsPanel = () => {
  const [collections, setCollections] = useState({});
  
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
          ...prev[collectionId].Requests,
          [requestId]: {
            requestName: requestName,
            requestType: requestType,
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

  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-4 p-2">
        <NewRequestModal 
          newCollection={addNewCollection} 
          deleteCollection={deleteCollection} 
        />
        <FaFilter />
      </div>
      <div className="p-1">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(collections).map(([collectionId, collection]) => (
            <AccordionItem key={collectionId} value={collectionId} className="border-0">
              <CollectionContextMenu 
                collection={collection}
                addRequestToCollection={addRequestToCollection}
                onDelete={() => deleteCollection(collectionId)}
              />
              <AccordionContent className="pt-1">
                <div className="flex flex-col space-y-1">
                  {Object.entries(collection.requests).map(([requestId, request]) => (
                    <div 
                      key={requestId}
                      className="flex items-center space-x-2 px-4 py-1 hover:bg-primary_select cursor-pointer"
                    >
                      <span className="text-[#FFB21C]">{request.requestType}</span>
                      <span className="text-sm">{request.requestName}</span>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default CollectionsPanel;

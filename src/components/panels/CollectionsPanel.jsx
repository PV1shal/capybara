import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import NewCollectionModal from "../NewCollectionModal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import CollectionContextMenu from "../CollectionContextMenu";
import { v4 as uuidv4 } from 'uuid';
import { IoMdClose } from "react-icons/io";

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
          ...prev[collectionId].requests,
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

  const deleteRequestFromCollection = (collectionId, requestId) => {
    setCollections(prev => {
      const updatedCollection = { ...prev };
      delete updatedCollection[collectionId].requests[requestId];
      return updatedCollection;
    });
  };
  
  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-4 p-2">
        <NewCollectionModal 
          newCollection={addNewCollection}
        />
        <FaFilter />
      </div>
      <div className="p-1">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(collections).map(([collectionId, collection]) => (
            <AccordionItem key={collectionId} value={collectionId} className="border-0">
              <CollectionContextMenu 
                  collection={collection}
                  collectionId={collectionId}
                  addRequestToCollection={addRequestToCollection}
                  deleteCollection={deleteCollection}
              />
              <AccordionContent className="pt-1">
                <div className="flex flex-col space-y-1">
                  {Object.entries(collection.requests).map(([requestId, request]) => (
                    <div 
                      key={requestId}
                      className="flex justify-between items-center space-x-2 px-4 py-1 hover:bg-primary_select cursor-pointer"
                    >
                      <div className="space-x-2">
                        <span className="text-[#FFB21C]">{request.requestType}</span>
                        <span className="text-sm">{request.requestName}</span>
                      </div>
                      <div>
                        <IoMdClose
                          size={20}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteRequestFromCollection(collectionId, requestId);
                          }}
                          className="text-red-500 hover:text-red-400"
                        />
                      </div>
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

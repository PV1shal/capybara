import { IoMdClose } from "react-icons/io";
import RequestTab from "../RequestTab";
import { useTabs } from "@/contexts/TabsProvider";
import { useCollections } from "@/contexts/CollectionContext";

const RequestTabs = () => {
  const { tabs, activeTabId, closeTab, setActiveTabId } = useTabs();
  const { collections } = useCollections();

  const tabsArray = Object.values(tabs);
  if (!tabs || tabsArray.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a request from collections to begin
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-primary_border">
        {tabsArray.map(tab => (
          <div
            key={tab.id}
            className={
              `flex items-center px-4 py-2 
              border-r border-t border-l border-primary_border 
              cursor-pointer rounded-md ${
              activeTabId === tab.id ? 'bg-[#474747]' : 'bg-primary_bg'
            }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <span className="text-sm">{tab.request.requestName}</span>
            <button
              className="ml-2 text-primary_bg hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <IoMdClose size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">
        {activeTabId && (
          <RequestTab 
            request={tabs[activeTabId]?.request}
            collectionName={collections[tabs[activeTabId]?.collectionId]?.collectionName}
          />
        )}
      </div>
    </div>
  );
};

export default RequestTabs;
import { IoMdClose } from "react-icons/io";
import RequestTab from "../RequestTab";
import { useTabs } from "@/contexts/TabsProvider";

const RequestTabs = () => {
  const { tabs, activeTabId, closeTab, setActiveTabId } = useTabs();

  if (!tabs || tabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a request from collections to begin
      </div>
    );
  }
  
  console.log(tabs)

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-primary_border">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`flex items-center px-4 py-2 border-r border-primary_border cursor-pointer rounded-md ${
              activeTabId === tab.id ? 'bg-primary_select' : ''
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
            request={tabs.find(tab => tab.id === activeTabId)?.request}
          />
        )}
      </div>
    </div>
  );
};

export default RequestTabs;
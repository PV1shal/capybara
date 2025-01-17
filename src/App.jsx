// App.jsx
import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./App.css";
import OptionsPanel from "./components/panels/OptionsPanel";
import CollectionsPanel from "./components/panels/CollectionsPanel";
import HistoryPanel from "./components/panels/HistoryPanel";
import SettingsPanel from "./components/panels/SettingsPanel";
import { CollectionsProvider } from "./contexts/CollectionContext";
import RequestTabs from "./components/panels/RequestTabs";
import { TabsProvider } from "./contexts/TabsProvider";

function App() {
  const [activePanel, setActivePanel] = useState("collections");

  const renderActivePanel = () => {
    switch (activePanel) {
      case "collections":
        return <CollectionsPanel />;
      case "history":
        return <HistoryPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        break;
    }
  };

  return (
    <CollectionsProvider>
      <TabsProvider>
        <div className="bg-primary_bg w-screen h-screen text-primary_text">
          <PanelGroup autoSaveId="dashboard" direction="horizontal">
            <div className="flex flex-col bg-secondary_bg w-fit">
              <OptionsPanel
                activePanel={activePanel}
                setActivePanel={setActivePanel}
              />
            </div>
            <Panel defaultSize={25} minSize={15} className="flex flex-col bg-primary_bg">
              {renderActivePanel()}
            </Panel>
            <PanelResizeHandle className="w-3 bg-secondary_bg" />
            <Panel defaultSize={25}>
              <RequestTabs />
            </Panel>
          </PanelGroup>
        </div>
      </TabsProvider>
    </CollectionsProvider>
  );
}

export default App;

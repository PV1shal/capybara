import { useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./App.css";
import OptionsPanel from "./components/OptionsPanel";
import CollectionsPanel from "./components/CollectionsPanel";
import HistoryPanel from "./components/HistoryPanel";
import SettingsPanel from "./components/SettingsPanel";
import BottomNavBar from "./components/BottomNavBar";

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
    <div className="bg-primary_bg w-[screen] h-[97vh] text-primary_text">
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
          <div>right</div>
        </Panel>
      </PanelGroup>
      <BottomNavBar />
    </div>
  );
}

export default App;

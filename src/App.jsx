import { useRef, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./App.css";
import OptionsPanel from "./components/OptionsPanel";
import CollectionsPanel from "./components/CollectionsPanel";
import HistoryPanel from "./components/HistoryPanel";
import SettingsPanel from "./components/SettingsPanel";

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
    <div className="bg-primary_bg w-screen h-screen text-primary_text">
      <PanelGroup autoSaveId="dashboard" direction="horizontal">
        <Panel defaultSize={5} className="flex flex-col bg-secondary_bg">
          <OptionsPanel
            activePanel={activePanel}
            setActivePanel={setActivePanel}
          />
        </Panel>
        <PanelResizeHandle />
        <Panel className="flex flex-col bg-primary_bg">
          {renderActivePanel()}
        </Panel>
        <PanelResizeHandle className="w-3 bg-secondary_bg" />
        <Panel defaultSize={25}>
          <div>right</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;

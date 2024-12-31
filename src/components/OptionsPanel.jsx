import { BsFillCollectionFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

const OptionsPanel = ({ activePanel, setActivePanel }) => {
  return (
    <>
      <div className="flex flex-col items-center p-5 hover:bg-primary_select" onClick={() => {
        setActivePanel("collections")
      }}>
        <BsFillCollectionFill size={32} />
        Collections
      </div>
      <div className="flex flex-col items-center p-5 hover:bg-primary_select" onClick={() => {
        setActivePanel("history")
      }}>
        <FaHistory size={32} />
        History
      </div>
      <div className="flex flex-col items-center p-5 hover:bg-primary_select" onClick={() => {
        setActivePanel("settings")
      }}>
        <IoIosSettings size={32} />
        Settings
      </div>
    </>
  );
};

export default OptionsPanel;

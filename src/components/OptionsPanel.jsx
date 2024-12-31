import { BsFillCollectionFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

const OptionsPanel = ({ activePanel, setActivePanel }) => {
  return (
    <>
      <div className="flex flex-col items-center p-3 hover:bg-primary_select hover:cursor-pointer" onClick={() => {
        setActivePanel("collections")
      }}>
        <BsFillCollectionFill size={28} />
        Collections
      </div>
      <div className="flex flex-col items-center p-3 hover:bg-primary_select hover:cursor-pointer" onClick={() => {
        setActivePanel("history")
      }}>
        <FaHistory size={28} />
        History
      </div>
      <div className="flex flex-col items-center p-3 hover:bg-primary_select hover:cursor-pointer" onClick={() => {
        setActivePanel("settings")
      }}>
        <IoIosSettings size={28} />
        Settings
      </div>
    </>
  );
};

export default OptionsPanel;

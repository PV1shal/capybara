import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import NewRequestModal from "../NewRequestModal";

const CollectionsPanel = () => {

  const [collections, setCollections] = useState([]);

  return (
    <>
      <div className="flex flex-row">
        <NewRequestModal setCollections={setCollections} />
        <FaFilter />
      </div>
    </>
  );
};

export default CollectionsPanel;

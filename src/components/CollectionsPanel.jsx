import { FaPlus } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";

const CollectionsPanel = () => {

  const [collections, setCollections] = useState([]);

  return (
    <>
      <div className="flex flex-row">
        <FaPlus />
        <FaFilter />
      </div>
    </>
  );
};

export default CollectionsPanel;

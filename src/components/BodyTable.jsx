import { useState } from "react";
import RequestInputTable from "./RequestInputTable";
import { cn } from "@/lib/utils";

const BodyTable = ({ rowsData, setRowsData }) => {
  const [bodyType, setBodyType] = useState("none");
  const [nextId, setNextId] = useState(1);

  const addRow = () => {
    setRowsData((prev) => ({
      ...prev,
      [nextId]: { key: "", value: "", description: "", isIncluded: true },
    }));
    setNextId((prev) => prev + 1);
  };

  const deleteRow = (id) => {
    if (Object.keys(rowsData).length > 1) {
      const newRows = { ...rowsData };
      delete newRows[id];
      setRowsData(newRows);
    }
  };

  return (
    <div className="space-y-4 m-5">
      <div className="flex space-x-2">
        <button
          onClick={() => setBodyType("none")}
          className={cn(
            "px-3 py-1 rounded text-sm",
            bodyType === "none" ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
          )}
        >
          none
        </button>
        <button
          onClick={() => setBodyType("form-data")}
          className={cn(
            "px-3 py-1 rounded text-sm",
            bodyType === "form-data" ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
          )}
        >
          form-data
        </button>
        <button
          onClick={() => setBodyType("raw")}
          className={cn(
            "px-3 py-1 rounded text-sm",
            bodyType === "raw" ? "bg-[#2a2a2a]" : "hover:bg-[#2a2a2a]"
          )}
        >
          raw
        </button>
      </div>
      {bodyType !== "none" && (
        <RequestInputTable
          rowsData={rowsData}
          addRow={addRow}
          deleteRow={deleteRow}
          setRowsData={setRowsData}
        />
      )}
    </div>
  );
};

export default BodyTable;

import { useState } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { IoIosClose } from "react-icons/io";
import RequestInputTable from "./RequestInputTable";

const BodyTable = () => {
  const [bodyType, setBodyType] = useState("none");
  const [rows, setRows] = useState([{ key: "", value: "", description: "" }]);

  const addRow = () => {
    setRows([...rows, { key: "", value: "", description: "" }]);
  };

  const deleteRow = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
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

      {bodyType === "form-data" && (
        <RequestInputTable
          rows={rows}
          addRow={addRow}
          deleteRow={deleteRow}
          setRows={setRows}
        />
      )}
    </div>
  );
};

export default BodyTable;

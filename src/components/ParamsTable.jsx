import { useState, useEffect } from "react";
import RequestInputTable from "./RequestInputTable";

const ParamsTable = ({ rowsData, setRowsData }) => {
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
    } else {
      const newRows = { ...rowsData };
      newRows[id] = { key: "", value: "", description: "", isIncluded: true };
      setRowsData(newRows);
    }
  };

  return (
    <div className="space-y-2 m-5">
      <div className="text-sm text-gray-400">Query Params</div>
      <RequestInputTable
        rowsData={rowsData}
        addRow={addRow}
        deleteRow={deleteRow}
        setRowsData={setRowsData}
      />
    </div>
  );
};

export default ParamsTable;

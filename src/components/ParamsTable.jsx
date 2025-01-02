import { useState } from "react";
import RequestInputTable from "./RequestInputTable";

const ParamsTable = () => {
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
    <div className="space-y-2 m-5">
      <div className="text-sm text-gray-400">Query Params</div>
      <RequestInputTable rows={rows} addRow={addRow} deleteRow={deleteRow} setRows={setRows} />
    </div>
  );
};

export default ParamsTable;

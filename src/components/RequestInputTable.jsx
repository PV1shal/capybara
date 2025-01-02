import { Input } from "./ui/input";
import { IoIosAdd } from "react-icons/io";
import { FaEraser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";

const RequestInputTable = ({ rowsData, addRow, deleteRow, setRowsData }) => {
  const handleInputChange = (id, field, value) => {
    setRowsData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleClear = (id, field) => {
    setRowsData((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: "" },
    }));
  };

  const handleCheckboxChange = (id, checked) => {
    setRowsData((prev) => ({
      ...prev,
      [id]: { ...prev[id], isIncluded: checked },
    }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <table className="w-full border-separate border-spacing-0 bg-[#1c1c1c] rounded-md">
        <thead>
          <tr>
            <th className="w-10 p-2 border-b border-[#2a2a2a]"></th>
            <th className="text-left p-2 text-sm font-normal text-gray-400 border-b border-r border-[#2a2a2a] w-1/3">
              Key
            </th>
            <th className="text-left p-2 text-sm font-normal text-gray-400 border-b border-r border-[#2a2a2a] w-1/3">
              Value
            </th>
            <th className="text-left p-2 text-sm font-normal text-gray-400 border-b border-[#2a2a2a] w-1/3">
              Description
            </th>
            <th className="w-10 p-2 border-b border-[#2a2a2a]"></th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rowsData).map(([id, row]) => (
            <tr key={id} className="group">
              <td className="w-10 p-1 border-b border-r border-[#2a2a2a]">
                <Checkbox
                  checked={row.isIncluded}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(id, checked)
                  }
                  className="border-gray-400"
                />
              </td>
              <td className="p-1 border-b border-r border-[#2a2a2a]">
                <div className="flex flex-row items-center gap-2 group/key">
                  <Input
                    className="bg-transparent border-0 h-8 w-full focus:ring-0 focus:outline-none text-white"
                    value={row.key}
                    onChange={(e) =>
                      handleInputChange(id, "key", e.target.value)
                    }
                  />
                  <FaEraser
                    size={16}
                    className="opacity-0 group-hover/key:opacity-100 transition-opacity cursor-pointer text-gray-400 hover:text-white"
                    onClick={() => handleClear(id, "key")}
                  />
                </div>
              </td>
              <td className="p-1 border-b border-r border-[#2a2a2a]">
                <div className="flex flex-row items-center gap-2 group/value">
                  <Input
                    className="bg-transparent border-0 h-8 w-full focus:ring-0 focus:outline-none text-white"
                    value={row.value}
                    onChange={(e) =>
                      handleInputChange(id, "value", e.target.value)
                    }
                  />
                  <FaEraser
                    size={16}
                    className="opacity-0 group-hover/value:opacity-100 transition-opacity cursor-pointer text-gray-400 hover:text-white"
                    onClick={() => handleClear(id, "value")}
                  />
                </div>
              </td>
              <td className="p-1 border-b border-[#2a2a2a]">
                <div className="flex flex-row items-center gap-2 group/desc">
                  <Input
                    className="bg-transparent border-0 h-8 w-full focus:ring-0 focus:outline-none text-white"
                    value={row.description}
                    onChange={(e) =>
                      handleInputChange(id, "description", e.target.value)
                    }
                  />
                  <FaEraser
                    size={16}
                    className="opacity-0 group-hover/desc:opacity-100 transition-opacity cursor-pointer text-gray-400 hover:text-white"
                    onClick={() => handleClear(id, "description")}
                  />
                </div>
              </td>
              <td className="w-10 p-1 border-b border-l border-[#2a2a2a]">
                <button
                  onClick={() => deleteRow(id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IoIosClose size={28} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-2 text-gray-400 hover:text-white transition-colors"
        onClick={addRow}
      >
        <IoIosAdd size={28} />
      </button>
    </div>
  );
};

export default RequestInputTable;

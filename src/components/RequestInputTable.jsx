import { Input } from "./ui/input";
import { IoIosClose } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";

const RequestInputTable = ({ rows, addRow, deleteRow, setRows }) => {
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
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="group">
              <td className="w-10 p-1 border-b border-r border-[#2a2a2a]">
                <button
                  onClick={() => deleteRow(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <IoIosClose size={28} />
                </button>
              </td>
              <td className="p-1 border-b border-r border-[#2a2a2a]">
                <Input
                  className="bg-transparent border-0 h-8 w-full focus:ring-0 focus:outline-none text-white"
                  value={row.key}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].key = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>
              <td className="p-1 border-b border-r border-[#2a2a2a]">
                <Input
                  className="bg-transparent border-0 h-8 w-full focus:ring-0 focus:outline-none text-white"
                  value={row.value}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].value = e.target.value;
                    setRows(newRows);
                  }}
                />
              </td>
              <td className="p-1 border-b border-[#2a2a2a]">
                <Input
                  className="bg-transparent border-0 h-8 w-full focus:ring-0 focus:outline-none text-white"
                  value={row.description}
                  onChange={(e) => {
                    const newRows = [...rows];
                    newRows[index].description = e.target.value;
                    setRows(newRows);
                  }}
                />
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

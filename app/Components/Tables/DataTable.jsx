import React from "react";

const DataTable = ({ data }) => {
  return (
    <div className="w-full border-2 border-gray-200 p-4 rounded-lg bg-white ">
      <h2 className=" font-bold mb-2 text-xl text-gray-500">
        Temperature Stats and data
      </h2>
      <div className="rounded-md shadow-md overflow-hidden bg-white overflow-x-auto">
        <table className="min-w-[700px] w-full text-black rounded-md text-sm">
          <thead className="bg-gray-500 text-white">
            <tr className="h-10">
              <th className="p-2 text-center rounded-tl-md max-w-[50px] ">
                Sr.No.
              </th>
              <th className="text-start p-2 max-w-[100px]">Date</th>
              <th className="text-center max-w-[100px]">Min Temp</th>
              <th className="text-center max-w-[100px]">Max Temp</th>
              <th className="text-center max-w-[100px]">Mean Temp</th>
              <th className="text-center max-w-[100px]">Max Apparent Temp</th>
              <th className="text-center max-w-[100px]">Min Apparent Temp</th>
              <th className="text-center rounded-tr-md max-w-[100px]">
                Mean Apparent Temp
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data?.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className="border-t border-b">
                  <td className="text-center p-2">{index + 1}</td>
                  <td className="p-2">{row.time}</td>
                  <td className="text-center p-2">
                    {row?.temperature_2m_min || "null"}
                  </td>
                  <td className="text-center p-2">
                    {row?.temperature_2m_max || "null"}
                  </td>
                  <td className="text-center p-2">
                    {row?.temperature_2m_mean || "null"}
                  </td>
                  <td className="text-center p-2">
                    {row?.apparent_temperature_max || "null"}
                  </td>
                  <td className="text-center p-2">
                    {row?.apparent_temperature_min || "null"}
                  </td>
                  <td className="text-center p-2">
                    {row?.apparent_temperature_mean || "null"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className=" w-full-[100%] flex justify-center items-center h-32 text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-gray-400 mt-2">{`Showing ${data ? 1 : 0} to ${
        data ? data.length : 0
      } of ${data ? data.length : 0} entries`}</p>
      <div className="flex justify-between mt-4 w-full">
        <div>
          <select
            name="itemsPerPage"
            aria-placeholder="Select Items per page"
            id="itemsPerPage"
            className="border-2 border-gray-200 rounded-md p-2 text-black outline-none focus-visible:outline-2 focus-within:-outline-offset-2 focus-visible:outline-sky-400"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <nav
          aria-label="Pagination"
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
        >
          <a
            href="#"
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Previous</span>
            {/* <ChevronLeftIcon aria-hidden="true" className="size-5" /> */}
          </a>
          <a
            href="#"
            aria-current="page"
            className="relative z-10 inline-flex items-center bg-sky-400 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            1
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            2
          </a>
          <a
            href="#"
            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
          >
            3
          </a>
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
            ...
          </span>
          <a
            href="#"
            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
          >
            8
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            9
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            10
          </a>
          <a
            href="#"
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span className="sr-only">Next</span>
            {/* <ChevronRightIcon aria-hidden="true" className="size-5" /> */}
          </a>
        </nav>
      </div>
    </div>
  );
};

export default DataTable;

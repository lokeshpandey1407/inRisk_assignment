import React from "react";
import Loader from "../loader/Loader";

const DataTable = ({
  data,
  filteredData,
  loading,
  limitPerPage,
  pages,
  setLimtPerPage,
  currentPage,
  setCurrentPage,
}) => {
  function handleFirst() {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }
  function handleNext() {
    setCurrentPage((prev) => {
      if (prev === pages.length || filteredData === null) {
        return prev;
      } else {
        return prev + 1;
      }
    });
  }

  function handleLast() {
    if (currentPage !== pages.length) {
      setCurrentPage(pages.length);
    }
  }

  function handlePrev() {
    setCurrentPage((prev) => {
      if (prev === 1 || filteredData === null) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  }
  return (
    <div className="w-full border-2 border-gray-200 p-2 rounded-lg bg-white">
      <h2 className=" font-bold mb-2 text-xl text-gray-500">
        Temperature Table
      </h2>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className="rounded-md shadow-md overflow-hidden bg-white overflow-x-auto max-h-96 min-h-96 overflow-y-auto [&::-webkit-scrollbar]:[width:5px] [&::-webkit-scrollbar]:[height:5px] [&::-webkit-scrollbar-thumb]:rounded-lg
            [&::-webkit-scrollbar-thumb]:bg-sky-400"
          >
            <table className="min-w-[700px] w-full text-black rounded-md text-sm">
              <thead className="bg-sky-500 text-white h-16 sticky top-0 z-50">
                <tr className="h-10 ">
                  <th className="p-2 text-center rounded-tl-md max-w-[50px] ">
                    Sr.No.
                  </th>
                  <th className="text-start p-2 max-w-[100px]">Date</th>
                  <th className="text-center max-w-[100px]">Min Temp</th>
                  <th className="text-center max-w-[100px]">Max Temp</th>
                  <th className="text-center max-w-[100px]">Mean Temp</th>
                  <th className="text-center max-w-[100px]">
                    Max Apparent Temp
                  </th>
                  <th className="text-center max-w-[100px]">
                    Min Apparent Temp
                  </th>
                  <th className="text-center rounded-tr-md max-w-[100px]">
                    Mean Apparent Temp
                  </th>
                </tr>
              </thead>
              <tbody className="z-0">
                {filteredData && filteredData?.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-t border-b odd:bg-gray-100 min-h-10"
                    >
                      <td className="text-center py-3 font-bold">{row._id}</td>
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
                    <td
                      colSpan="8"
                      className="text-center p-2 h-60 text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-xs text-gray-400 mt-2">{`Showing ${
              filteredData?.length || 0
            } entries`}</p>
            <p className="text-xs text-gray-400 mt-2">{`Total ${
              filteredData == null ? 0 : pages.length
            } pages`}</p>
          </div>
          <div className="flex justify-between mt-4 w-full">
            <div>
              <select
                name="itemsPerPage"
                aria-placeholder="Select Items per page"
                id="itemsPerPage"
                value={limitPerPage}
                className="border-2 border-gray-200 rounded-md p-2 text-black outline-none focus-visible:outline-2 focus-within:-outline-offset-2 focus-visible:outline-sky-400"
                onChange={(e) => {
                  setLimtPerPage(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            {/* pagination container */}
            <nav aria-label="Pagination" className="isolate inline-flex gap-2">
              <button
                title="First"
                className="relative h-8 w-8 flex items-center text-black  ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 rounded-full justify-center"
                onClick={handleFirst}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M7 18q-.425 0-.712-.288T6 17V7q0-.425.288-.712T7 6t.713.288T8 7v10q0 .425-.288.713T7 18m6.8-6l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T11.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"
                  />
                </svg>
              </button>
              <button
                title="Prev"
                className="relative h-8 w-8 flex items-center text-black  ring-gray-300 hover:bg-gray-50 focus:outline-offset-0 rounded-full justify-center"
                onClick={handlePrev}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="m5.293 8l3.854 3.854l.707-.707L6.707 8l3.147-3.146l-.707-.708z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <p
                className={`relative h-8 w-8 flex items-center rounded-full text-black focus:z-20 focus:outline-offset-0 justify-center bg-sky-300 ${
                  filteredData === null ? "hidden" : "block"
                }`}
              >
                {filteredData === null ? 0 : currentPage}
              </p>
              <button
                title="Next"
                className={`relative h-8 w-8 flex items-center rounded-full text-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 justify-center`}
                onClick={handleNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    d="M6 4.5L9.5 8L6 11.5"
                  />
                </svg>
              </button>
              <button
                title="Last"
                className={`relative h-8 w-8 flex items-center rounded-full text-black hover:bg-gray-50 focus:z-20 focus:outline-offset-0 justify-center`}
                onClick={handleLast}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10.2 12L6.3 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7zM17 6q.425 0 .713.288T18 7v10q0 .425-.288.713T17 18t-.712-.288T16 17V7q0-.425.288-.712T17 6"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;

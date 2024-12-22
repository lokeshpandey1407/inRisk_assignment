"use client";

import { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import DataTable from "../Tables/DataTable";
import toast from "react-hot-toast";

const baseStyle =
  "p-3 rounded-md text-black outline-none outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-sky-600 w-full xs:w-56 text-sm";

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [wetherTableData, setWetherTableData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    latitude: "",
    longitude: "",
    startDate: "",
    endDate: "",
  });

  function formatDataForTable(data) {
    if (!data) return;
    let tableArray = [];
    const keys = Object.keys(data);
    console.log(keys);
    for (let i = 0; i < keys.length; i++) {
      const newObj = {};
      for (let j = 0; j < keys.length; j++) {
        newObj[keys[j]] = data[keys[j]][i];
      }
      tableArray.push(newObj);
    }
    console.log(tableArray);
    return tableArray;
  }

  async function handleGetData(e) {
    e.preventDefault();
    if (error.endDate || error.latitude || error.longitude || error.startDate)
      return;
    const formData = new FormData(e.target);
    const latitude = formData.get("latitude");
    const longitude = formData.get("longitude");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");
    if (isNaN(latitude)) {
      // setError((prev) => {
      //   return { ...prev, latitude: "latitude must be a number" };
      // });
      toast.error("Latitude must be a number");
      return;
    }
    if (isNaN(longitude)) {
      // setError((prev) => {
      //   return { ...prev, longitude: "longitude must be a number" };
      // });
      toast.error("Longitude must be a number");
      return;
    }
    setIsLoading(true);
    const response = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,apparent_temperature_max,apparent_temperature_min,apparent_temperature_mean`,
      {
        method: "GET",
      }
    );
    const res = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      toast.error(
        res.reason || "Something went wrong while fetching the weather data"
      );
      console.log(error);
    }
    setWeatherData(res?.daily);
    const tableData = formatDataForTable(res?.daily);
    setWetherTableData(tableData);
    setIsLoading(false);
  }

  return (
    <main className="flex flex-col h-full px-5 py-10 bg-white gap-4">
      {/* user input form */}
      <form
        className="flex flex-row flex-wrap items-end
       gap-4 border-2 border-gray-200 p-4 rounded-lg bg-white w-full"
        onSubmit={handleGetData}
      >
        {/* latitude input  */}
        <div className="w-full sm:w-56">
          <label htmlFor="latitude" className="text-xs text-gray-500">
            Latitude
          </label>
          <input
            className={`${baseStyle}`}
            // className=" [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="text"
            id="latitude"
            name="latitude"
            placeholder="Enter latitude"
            onChange={() => setError((prev) => ({ ...prev, latitude: "" }))}
            required
          />
          {/* <span
            className={`text-xs ${
              error.latitude ? "text-red-600" : "text-gray-600"
            }`}
          >
            {error.latitude
              ? error.latitude
              : "Latitude must be in range of -90 to 90°"}
          </span> */}
        </div>

        {/* longitude input */}
        <div className="w-full sm:w-56">
          <label htmlFor="longitude" className="text-xs text-gray-500">
            Longitude
          </label>
          <input
            className={`${baseStyle}`}
            type="text"
            id="longitude"
            name="longitude"
            placeholder="Enter longitude"
            required
          />
          {/* <span
            className={`text-xs ${
              error.longitude ? "text-red-600" : "text-gray-600"
            }`}
          >
            {error.latitude
              ? error.longitude
              : "Longitude must be in range of -90 to 90°"}
          </span> */}
        </div>

        {/* start date input */}
        <div className="w-full sm:w-52">
          <label htmlFor="startDate" className="text-xs text-gray-500">
            Start Date
          </label>
          <input
            className={`${baseStyle}`}
            type="date"
            id="startDate"
            name="startDate"
            placeholder="Enter Start Date"
            required
          />
          {/* <span
            className={`text-[10px] ${
              error.startDate ? "text-red-600" : "text-gray-600"
            }`}
          >
            {error.startDate
              ? error.startDate
              : "End-date must be larger or equals than start-date"}
          </span> */}
        </div>

        {/* end date input */}
        <div className="w-full sm:w-52">
          <label htmlFor="endDate" className="text-xs text-gray-500">
            End Date
          </label>
          <input
            className={`${baseStyle}`}
            type="date"
            id="endDate"
            name="endDate"
            placeholder="Enter End Date"
            required
          />
          {/* <span
            className={`text-[10px] ${
              error.endDate ? "text-red-600" : "text-gray-600"
            }`}
          >
            {error.endDate
              ? error.endDate
              : "End-date must be larger or equals than start-date"}
          </span> */}
        </div>

        {/* get wether data button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-md bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 w-min-[100px] sm:w-auto`}
        >
          {isLoading ? "Loading..." : "Fetch Data"}
        </button>
      </form>
      <LineChart data={weatherData} loading={isLoading} />
      <DataTable data={wetherTableData} loading={isLoading} />
    </main>
  );
}

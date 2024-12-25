"use client";

import { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart";
import DataTable from "../Tables/DataTable";
import toast from "react-hot-toast";

const baseStyle =
  "p-3 rounded-md text-black outline-none outline outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sky-600 w-full xs:w-56 text-sm";

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherTableData, setWeatherTableData] = useState(null);
  const [pages, setPages] = useState([1]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredTableData, setFilteredTableData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [error, setError] = useState({
    latitude: "",
    longitude: "",
    startDate: "",
    endDate: "",
  });

  const [defaultLatitude, setDefaultLatitude] = useState("");
  const [defaultLongitude, setDefaultLongitude] = useState("");

  function formatDataForTable(data) {
    if (!data) return;
    let tableArray = [];
    const keys = Object.keys(data);
    for (let i = 0; i < data[keys[0]].length; i++) {
      const newObj = {};
      for (let j = 0; j < keys.length; j++) {
        newObj[keys[j]] = data[keys[j]][i];
      }
      newObj._id = i + 1;
      tableArray.push(newObj);
    }
    setWeatherTableData(tableArray);
    return tableArray;
  }

  async function getUsersLocation() {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        setDefaultLatitude(success?.coords?.latitude)
        setDefaultLongitude(success?.coords?.longitude)
      },
      (err) => {
        console.log(err);
        toast.error(err);
      }
    );
    console.log(location);
  }

  // handle per page data limit
  function handlePerPageData(data) {
    if (!data) return;
    const skip = (currentPage - 1) * Number(limitPerPage);
    let filteredTableData = data.slice(skip, skip + Number(limitPerPage));
    return filteredTableData;
  }

  function handleError(latitude, longitude, startDate, endDate) {
    let hasError = false;
    const newError = {
      latitude: "",
      longitude: "",
      startDate: "",
      endDate: "",
    };

    if (!latitude || isNaN(latitude)) {
      newError.latitude = "Invalid latitude";
      toast.error("Latitude must be a number between -90 and 90");
      hasError = true;
    }

    if (!longitude || isNaN(longitude)) {
      newError.longitude = "Invalid longitude";
      toast.error("Longitude must be a number between -90 and 90");
      hasError = true;
    }

    if (startDate > endDate) {
      newError.startDate =
        "Start date must be smaller than or equal to the end  date";
      toast.error("Start date must be smaller than or equal to the end  date");
      hasError = true;
    }

    if (endDate > new Date().toISOString().split("T")[0]) {
      newError.endDate = "End date cannot be greater than today";
      toast.error("End date cannot be greater than today");
      hasError = true;
    }

    setError(newError);
    return hasError;
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

    if (handleError(latitude, longitude, startDate, endDate)) return;

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
    }
    setWeatherData(res?.daily);
    const tableData = formatDataForTable(res?.daily);
    const filteredData = handlePerPageData(tableData);
    const pages = Math.ceil(tableData.length / Number(limitPerPage));
    const totalPages = setNumberOfPages(pages);
    setPages(totalPages);
    setFilteredTableData(filteredData);
    setIsLoading(false);
  }

  function setNumberOfPages(pages) {
    const numOfPages = [];
    for (let i = 1; i <= pages; i++) {
      numOfPages.push(i);
    }
    return numOfPages;
  }

  useEffect(() => {
    if (weatherTableData) {
      const filteredData = handlePerPageData(weatherTableData);
      setFilteredTableData(filteredData);
      const numOfPages = Math.ceil(
        weatherTableData.length / Number(limitPerPage)
      );
      const pages = setNumberOfPages(numOfPages);
      setPages(pages);
    }
  }, [limitPerPage, currentPage]);

  return (
    <main className="flex w-full sm:w-5/6 flex-col h-full sm:mx-auto mb-10 px-5 py-5 bg-white gap-4 mt-28 rounded-md">
      <p className="text-center text-2xl font-bold text-sky-500">
        Weather Dashboard
      </p>
      <form
        className="flex flex-wrap content-center items-end gap-1 sm:gap-2 border-2 border-gray-200 p-2 rounded-lg bg-white w-full"
        onSubmit={handleGetData}
      >
        {/* latitude input  */}
        <div className="w-full sm:w-56">
          <label htmlFor="latitude" className="text-xs text-gray-500">
            Latitude
          </label>
          <input
            className={`${baseStyle}`}
            type="text"
            id="latitude"
            name="latitude"
            defaultValue={defaultLatitude}
            placeholder="Enter latitude"
            onChange={() => setError((prev) => ({ ...prev, latitude: "" }))}
            required
          />
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
            defaultValue={defaultLongitude}
            placeholder="Enter longitude"
            required
          />
        </div>

        {/* start date input */}
        <div className="w-full sm:w-56">
          <label htmlFor="startDate" className="text-xs text-gray-500">
            Start Date
          </label>
          <input
            className={`${baseStyle}`}
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={
              new Date(new Date().setDate(new Date().getDate() - 7))
                .toISOString()
                .split("T")[0]
            }
            placeholder="Enter Start Date"
            required
          />
        </div>

        {/* end date input */}
        <div className="w-full sm:w-56">
          <label htmlFor="endDate" className="text-xs text-gray-500">
            End Date
          </label>
          <input
            className={`${baseStyle}`}
            type="date"
            id="endDate"
            name="endDate"
            defaultValue={new Date().toISOString().split("T")[0]}
            placeholder="Enter End Date"
            required
          />
        </div>

        {/* get weather data button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`rounded-md bg-sky-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 w-min-[100px] w-full sm:w-auto disabled:bg-slate-400`}
        >
          {isLoading ? "Fetching..." : "Fetch Data"}
        </button>
        <button
          type="button"
          onClick={getUsersLocation}
          className={`rounded-md bg-green-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 w-min-[100px] w-full sm:w-auto disabled:bg-slate-400`}
        >
          Get your coordinates ?
        </button>
      </form>

      <LineChart data={weatherData} loading={isLoading} />
      <DataTable
        data={weatherTableData}
        filteredData={filteredTableData}
        loading={isLoading}
        limitPerPage={limitPerPage}
        pages={pages}
        setLimtPerPage={setLimitPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}

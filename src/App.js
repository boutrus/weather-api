import React, { useState } from "react";
import "./App.css";
import "./R (1).jpeg";

const getDayOfWeek = (dateStr) => {
  //this is done to get a weekday for the api, we apply this at the point of calling the api for time.
  const date = new Date(dateStr);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
};

const getFormattedTime = (dateStr) => {
  const date = new Date(dateStr);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchWeatherData = () => {
    if (query.trim()) {
      // Check if query is not empty
      fetch(
        `http://api.weatherapi.com/v1/current.json?key=622d4c35edab4184afb144551241204&q=${query}&aqi=yes`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data);
          setErrorMessage(""); // Clear error message if data is fetched successfully
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setErrorMessage("Please enter a valid location");
    }
  };

  console.log(data);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="main">
      <div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter location"
        />
        <button onClick={fetchWeatherData}>Search</button>
      </div>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {data && (
        <div>
          {/* <div className="iconDiv">
            {data.current.condition.icon && (
              <img src={data.current.condition.icon} alt="Weather Icon" />
            )}
             <p>{data.current.temp_c}°C</p>
          </div> */}
          <p className="location">{data.location.name}</p>
          <p className="time">
            {getDayOfWeek(data.location.localtime)},
            {getFormattedTime(data.location.localtime)}
          </p>
          {data.current.condition.icon && (
            <img src={data.current.condition.icon} alt="Weather Icon" />
          )}
          <h1 className="weather-header">{data.current.temp_c}°C</h1>
          <p>{data.current.condition.text}</p>
        </div>
      )}
    </div>
  );
};

export default App;

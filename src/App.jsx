import { useEffect, useState } from "react";
import "./App.css";

function App(){

  const [city,setCity] = useState(()=>{
    const savedCity=localStorage.getItem("city");
    return savedCity?JSON.parse(savedCity):"";
  });

  useEffect(()=>{
    localStorage.setItem("city",JSON.stringify(city));
  },[city]);

  const [weatherData,setWeatherData] = useState(()=>{
    const savedWeatherData=localStorage.getItem("weatherData");
    return savedWeatherData?JSON.parse(savedWeatherData):{};
  });

  useEffect(()=>{
    localStorage.setItem("weatherData",JSON.stringify(weatherData));
  },[weatherData])

  function handleSearch(){
    if (city.trim()===""){
      setWeatherData({})
      return;
    }
    const url=`https://api.weatherapi.com/v1/current.json?key=768f7310440f43398cd63716260407&q=${city}&aqi=yes`;
    fetch(url).then((response)=>{
      return response.json();
    })
    .then((data)=>{
      setWeatherData(data);
    })}

  return(
    <div>
      <div className="header">
        <h1>Weather Predictor⛅</h1>
        <div>
          <input type="text" className="city-input" placeholder="Search here...." value={city} onChange={(e)=>setCity(e.target.value)} onKeyDown={(e)=>{if(e.key==="Enter") {handleSearch()}}}/>
          <button type="button" className="search-city" onClick={()=>handleSearch()} >GO</button>
        </div>
      </div>

      <div className="weather-card">
        {weatherData.location && weatherData.current ? (
        <div>
          <h1>📍{weatherData.location?.name},{weatherData.location?.region}</h1>
          <h3>{weatherData.current?.condition?.text}</h3>
          <h3>🌡️{weatherData.current?.temp_c}°C</h3>
          <h3>⌛ Local Time: {weatherData.location?.localtime}</h3>
          <h3>💧 Humidity: {weatherData.current?.humidity}%</h3>
        </div>):weatherData.error?(
          <h3>❌{weatherData.error.message}</h3>
        ):(
          <h3>Search for a City</h3>
        )}
      </div> 

      

    </div>
  )
}
export default App
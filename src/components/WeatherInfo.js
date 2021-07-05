import React, { useState, useEffect } from "react";
import BtnGrades from "./BtnGrades";
import ExtraInfo from "./Extra-info";
import logo from "../helpers/Triangles.svg";

const WeatherInfo = ({ color }) => {
  //1000 variables
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [data, setData] = useState(null);
  const [grades, setGrades] = useState(0);
  const [letter, setLetter] = useState("°C");
  const [img, setImg] = useState("");
  const [location, setLocation] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [currentTxt, setCurrentTxt] = useState("");
  const [co, setCo] = useState(0);
  const [ws, setWs] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [uv, setUv] = useState(0);
  const [wCode, setWCode] = useState("");

  //Geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  //Fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      const getData = async () => {
        try {
          let url = `https://api.weatherapi.com/v1/current.json?key=4a0110520f7c4781a7113352210207&q=${lat},${long}&aqi=yes`,
            result = await fetch(url).then((result) => result.json());

          setData(result);
        } catch (error) {
          console.log(error);
        }
      };

      getData();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [lat, long]);

  //Data
  useEffect(() => {
    if (data) {
      setGrades(data.current.temp_c);
      setImg(data.current.condition.icon);
      setLocation(data.location.name);
      setRegion(data.location.region);
      setCountry(data.location.country);
      setCurrentTxt(data.current.condition.text);
      setCo(data.current.air_quality.co);
      setWs(data.current.wind_kph);
      setHumidity(data.current.humidity);
      setUv(data.current.uv);
      setWCode(data.current.condition.code);
    }
  }, [data]);

  //ChangeGrades
  useEffect(() => {
    if (letter === "°F" && data) {
      setGrades(data.current.temp_f);
    } else if (letter === "°C" && data) {
      setGrades(data.current.temp_c);
    }
  }, [letter, data]);

  //ChangeColor
  useEffect(() => {
    function background() {
      if (wCode <= 1006) {
        color("#31a8ff");
      }
      if (wCode >= 1007 && wCode <= 1063) {
        color("#4883ae");
      }
      if (wCode >= 1064) {
        color("#334857");
      }
    }

    background();
  }, [wCode, color]);

  return (
    <>
      <div className="main-info">
        <span>
          {grades}
          {letter}
        </span>
        <BtnGrades funcLetter={setLetter} varLetter={letter} />
        <figure>
          {img === "" ? (
            <img src={logo} alt="img" />
          ) : (
            <img src={img} alt="img" />
          )}
        </figure>
        <p>{location}</p>
        <p>
          {region}, {country}
        </p>
        <p className="condition">{currentTxt}</p>
      </div>
      <div className="extra-info">
        <ExtraInfo co={co} ws={ws} humidity={humidity} uv={uv} />
      </div>
    </>
  );
};

export default WeatherInfo;

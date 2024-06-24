import { React, useState } from "react";
import "./Country.css";
import data from "./rest-countries-api-with-color-theme-switcher-master (1)/rest-countries-api-with-color-theme-switcher-master/data.json";
// import { click } from '@testing-library/user-event/dist/click';

const Country = () => {
  const [country, setCountry] = useState(data);
  const [selectOption, setSelectOption] = useState("");
  const [select, setSelect] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(20);
  const [bgColor, setBgColor] = useState(false);

  const lastCountry = currentPage * countryPerPage;
  const firstCountry = lastCountry - countryPerPage;

  const res = country.slice(firstCountry, lastCountry);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(country.length / countryPerPage); i++) {
    pageNumber.push(i);
  }

  const Continent = [
    "Asia",
    "Africa",
    "Americas",
    "Antartic Ocean",
    "Europe",
    "Oceania",
    "Polar",
  ];

  const handleChange = (event) => {
    setSelectOption(event.target.value);
  };

  const foundRegion = country.filter(
    (regions) => regions.region === selectOption
  );

  const handleChanged = (event) => {
    setSelect(event.target.value);
    const searchCountry = country.filter((region) => {
      const { name } = region;
      return name.toLowerCase().includes(select.toLowerCase());
    });
    setCountry(searchCountry);
  };

  const handleNext = () => {
    if (currentPage !== Math.ceil(country.length / countryPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const dark = () => {
    setBgColor(!bgColor);
  };

  return (
    <div style={{backgroundColor:"green",width:"100vw",backgroundSize:"cover"}}>
      <div
        className="nav"
        style={{ backgroundColor: bgColor ? "lightblue" : "lightgreen" }}
      >
        <h6>Rest Countries API with Color Theme Switcher Master</h6>

        <input
          type="text"
          placeholder="Search Region"
          onChange={(event) => handleChanged(event)}
        />

        <select
          name="Continent"
          value={selectOption}
          onChange={(event) => handleChange(event)}
        >
          <option>Continent</option>
          {Continent.map((option) => (
            <option key={option[0]}>{option}</option>
          ))}
        </select>

        <button className="btn1" onClick={dark}>
          Dark Mode
        </button>
      </div>

      <div className="div1" style={{ backgroundColor: bgColor ? "black" : "" }}>
        {foundRegion.length > 0
          ? foundRegion.map((country) => {
              return (
                <div className="meet">
                  <div className="div3">
                    <img src={country.flags.png} alt="" />
                  </div>
                  <h3>Country Name : {country.name}</h3>

                  <p>Region : {country.region}</p>
                  <p>Population : {country.population}</p>
                  <p>Native Name : {country.nativeName}</p>
                </div>
              );
            })
          : res.map((country) => {
              return (
                <div className="meet" key={country.name}>
                  <div className="div3">
                    <img src={country.flags.png} alt="" />
                  </div>
                  <h3>Country Name : {country.name}</h3>
                  <p>Region : {country.region}</p>
                  <p>Population : {country.population}</p>
                  <p>Native Name : {country.nativeName}</p>
                </div>
              );
            })}
      </div>

    
        <footer>
          <div className="divfit">
            <button className="btn" onClick={() => handleBack()}>
              Previous
            </button>
            {pageNumber.map((page) => {
              return (
                <b
                  onClick={() => setCurrentPage(page)}
                  style={{ cursor: "pointer" }}
                >
                  {page}
                </b>
              );
            })}
            <button className="btn" onClick={() => handleNext()}>
              Next
            </button>
            </div>
        </footer>
    </div>
  );
};

export default Country;

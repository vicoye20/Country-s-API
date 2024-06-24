import React, { useState } from "react";
import "./Country.css";
import data from "./rest-countries-api-with-color-theme-switcher-master (1)/rest-countries-api-with-color-theme-switcher-master/data.json";

const Country = () => {
  const [country, setCountry] = useState(data);
  const [selectOption, setSelectOption] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage, setCountryPerPage] = useState(20);
  const [bgColor, setBgColor] = useState(false);

  const lastCountry = currentPage * countryPerPage;
  const firstCountry = lastCountry - countryPerPage;

  const filteredCountries = country.filter(
    (region) =>
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectOption ? region.region === selectOption : true)
  );

  const currentCountries = filteredCountries.slice(firstCountry, lastCountry);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(filteredCountries.length / countryPerPage); i++) {
    pageNumber.push(i);
  }

  const continents = ["Asia", "Africa", "Americas", "Antarctic Ocean", "Europe", "Oceania", "Polar"];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleRegionChange = (event) => {
    setSelectOption(event.target.value);
    setCurrentPage(1); // Reset to first page on new selection
  };

  const handleNext = () => {
    if (currentPage !== Math.ceil(filteredCountries.length / countryPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const toggleDarkMode = () => {
    setBgColor(!bgColor);
  };

  return (
    <div style={{ backgroundColor: "whitesmoke", width: "100vw", backgroundSize: "cover" }}>
      <div className="nav" style={{ backgroundColor: bgColor ? "lightblue" : "lightgreen" }}>
        <h6>Rest Countries API with Color Theme Switcher Master</h6>

        <input
          type="text"
          placeholder="Search Country"
          onChange={handleSearchChange}
        />

        <select name="Continent" value={selectOption} onChange={handleRegionChange}>
          <option value="">Continent</option>
          {continents.map((continent) => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>

        <button className="btn1" onClick={toggleDarkMode}>
          Dark Mode
        </button>

        <button className="btn2" onClick={toggleDarkMode}>
          Dark
        </button>
      </div>

      <div className="div1" style={{ backgroundColor: bgColor ? "black" : "" }}>
        {currentCountries.map((country) => (
          <div className="meet" key={country.name}>
            <div className="div3">
              <img src={country.flags.png} alt="" />
            </div>
            <h3>Country Name: {country.name}</h3>
            <p>Region: {country.region}</p>
            <p>Population: {country.population}</p>
            <p>Native Name: {country.nativeName}</p>
          </div>
        ))}
      </div>

      <footer>
        <div className="divfit">
          <button className="btn" onClick={handleBack}>
            Previous
          </button>
          {pageNumber.map((page) => (
            <b
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{ cursor: "pointer" }}
            >
              {page}
            </b>
          ))}
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Country;


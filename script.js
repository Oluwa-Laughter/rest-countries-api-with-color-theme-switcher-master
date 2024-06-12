"use-strict";

const countryContainer = document.querySelector(".country_container");
const form = document.querySelector(".form");
const searchInput = document.getElementById("search");
const filter = document.getElementById("filter");

const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error(error.message);
  }
};

const displayCountryData = async function (url) {
  const data = await getJSON(url);

  data.map((data) => {
    const html = `
    <div class="country_card">
    <img src="${data.flags[0]}" alt="${data.name.common}" class="country--card__img" />
    <div class="country__content">
    <h2 class="country_name">${data.name.common}</h2>
        <div class="country__description">
          <p class="country_population">Population: ${data.population}</p>
          <p class="country_region">Region: ${data.region}</p>
          <p class="country_capital">Capital: ${data.capital}</p>
        </div>
      </div>
    </div>
  `;

    countryContainer.insertAdjacentHTML("afterbegin", html);
  });
};

displayCountryData("https://restcountries.com/v3/all");

const searchCountry = function (e) {
  e.preventDefault();
  const search = searchInput.value;

  if (!search) return;

  const url = `https://restcountries.com/v3/name/${search}`;
  countryContainer.innerHTML = "";
  displayCountryData(url);
  searchInput.value = "";
};

form.addEventListener("submit", searchCountry);

const filterCountry = function () {
  const filterValue = filter.value;

  if (!filterValue) return;

  const url =
    filterValue === "all"
      ? "https://restcountries.com/v3/all"
      : `https://restcountries.com/v3/region/${filterValue}`;

  countryContainer.innerHTML = "";
  displayCountryData(url);
};

filter.addEventListener("change", filterCountry);

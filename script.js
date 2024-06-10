"use-strict";

const countryContainer = document.querySelector(".country_container");

const searchInput = document.getElementById("search");

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
  console.log(data);

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

const searchCountry = async function (url, e) {
  e.preventDefault();
  const data = await getJSON(url);
};

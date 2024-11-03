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
    <div class="country_card" data-country="${data.name.common}">
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

  // Add click handlers after cards are created
  document.querySelectorAll(".country_card").forEach((card) => {
    card.addEventListener("click", async () => {
      const countryName = card.querySelector(".country_name").textContent;
      const countryData = await getJSON(
        `https://restcountries.com/v3/name/${countryName}`
      );
      showModal(countryData[0]);
    });
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

function showModal(country) {
  const modalContent = `
    <button class="back-button" onclick="closeModal()">
      <span>←</span>
      Back
    </button>
    
    <div class="country-detail">
      <img src="${country.flags[0]}" alt="${
    country.name.common
  }" class="country-flag">
      
      <div class="country-info">
        <h2 class="country-name">${country.name.common}</h2>
        
        <div class="info-columns">
          <div class="info-col-1">
            <p><strong>Native Name: </strong>${
              Object.values(country.name.nativeName)[0].common
            }</p>
            <p><strong>Population: </strong>${country.population.toLocaleString()}</p>
            <p><strong>Region: </strong>${country.region}</p>
            <p><strong>Sub Region: </strong>${country.subregion}</p>
            <p><strong>Capital: </strong>${country.capital}</p>
          </div>
          
          <div class="info-col-2">
            <p><strong>Top Level Domain: </strong>${country.tld.join(", ")}</p>
            <p><strong>Currencies: </strong>${Object.values(country.currencies)
              .map((cur) => cur.name)
              .join(", ")}</p>
            <p><strong>Languages: </strong>${Object.values(
              country.languages
            ).join(", ")}</p>
          </div>
        </div>
        
        <div class="border-countries">
          <strong>Border Countries: </strong>
          <div class="border-buttons">
            ${
              country.borders
                ? country.borders
                    .map(
                      (border) =>
                        `<button class="border-country">${border}</button>`
                    )
                    .join("")
                : "None"
            }
          </div>
        </div>
      </div>
    </div>
  `;

  // Set the content in the modal
  document.querySelector(".modal-body").innerHTML = modalContent;

  // Display the modal
  document.getElementById("countryModal").style.display = "block";
}

// Close modal function
function closeModal() {
  document.getElementById("countryModal").style.display = "none";
}

// Close modal when clicking the "close" button
document.querySelector(".close-modal").addEventListener("click", closeModal);

import './css/styles.css';
import _debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import fetchCountries from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")

searchBox.addEventListener("input", _debounce(inputListener,DEBOUNCE_DELAY))

function inputListener(event) {
  countryList.innerHTML = null;
  countryInfo.innerHTML = null;
  let searchValue = event.target.value;
  if (searchValue.length > 0) {
    fetchCountries(searchValue)
    .then((searchValue) => {
      renderCountryList(searchValue)
    })
    .catch((error) => {
      console.log(error);
      Notify.failure("Oops, there is no country with that name")
    });
  }
}


function renderCountryList(countries) {
  if (countries.length > 10) {

    Notify.info("Too many matches found. Please enter a more specific name.")

  } else if (countries.length >= 2 && countries.length <= 10) {

    countryList.innerHTML = null;
    countryInfo.innerHTML = null;
    const markup = countries.map((country) => {
      console.log(country)
        return `<li class="name"><img src=${country.flags.svg} class="name__img"><p>${country.name}</p></li>`
    }).join(" ");
    countryList.innerHTML = markup;

  } else if (countries.length === 1) {

    countryList.innerHTML = null;
    const markup = countries.map((country) => {
      const parsedLanguages = country.languages.map(lang => lang.name).join(", ")
      return `<ul class="country-info__list">
      <li class="name"><img src="${country.flags.svg}" class="name__img" alt="Flag of ${country.name}"><p class="country-info__name"><b>${country.name}</b></p></li>
      <li class="country-info__item"><b>Capital:</b> ${country.capital}</li>
      <li class="country-info__item"><b>Population:</b> ${country.population}</li>
      <li class="country-info__item"><b>Languages:</b> ${parsedLanguages}</li></ul>`
    }).join(" ");
    countryInfo.innerHTML = markup;

  } 
}
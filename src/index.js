import './css/styles.css';
import _debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")



searchBox.addEventListener("input", _debounce(inputListener,DEBOUNCE_DELAY))

function inputListener(event) {
  let searchValue = searchBox.value;
  console.log(searchValue)
  fetchCountries(searchValue)
    .then((searchValue) =>
      //renderCountryList(searchValue)
    renderCountryInfo(searchValue)
  )
    .catch((error) => console.log(error));
}

function fetchCountries(name) {
  return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
  //return fetch(`https://restcountries.com/v2/name/${name}`)
    .then((response) => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
    })
}



function renderCountryList(countries) {
  const markup = countries.map((country) => {
      console.log(country)
        return `<li class="country-list__item"><img src=${country.flags.svg} class="country-list__img"><p class="country-list__name"><b>${country.name}</b></p></li>`
    }).join(" ");
    countryList.innerHTML = markup;
}

function renderCountryInfo(countries) {
  const markup = countries.map((country) => {
  const parsedLanguages = country.languages.map(lang => lang.name).join(", ")
      console.log(country)
    return `<ul class="country-info__list">
        <li class="country-list__item">
        <img src=${country.flags.svg} class="country-list__img" alt="Flag of ${country.name}/>
        <p><b>${country.name}</b></p></li>
        <li><b>Capital:</b> ${country.capital}</li>
        <li><b>Population:</b> ${country.population}</li>
        <li><b>Languages:</b> ${parsedLanguages}</li>
        </ul>`
    }).join(" ");
    countryInfo.innerHTML = markup;
}
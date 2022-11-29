import './css/styles.css';
import _debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import fetchCountries from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list")
const countryInfo = document.querySelector(".country-info")

//searchBox.setAttribute("pattern","^[a-zA-Z]+$")
//searchBox.setAttribute("title","Please enter only letters. Do not use any numbers or special characters.")
searchBox.addEventListener("input", _debounce(inputListener,DEBOUNCE_DELAY))

function inputListener(event) {
  countryList.innerHTML = null;
  countryInfo.innerHTML = null;
  let searchValue = event.target.value;
  if (searchValue.length > 0) {
    if (!/^[a-zA-Z]+$/.test(searchValue)) {
      Notify.failure("Please enter only letters. Do not use any numbers or special characters.")
    } else {fetchCountries(searchValue)
    //fetchCountries(searchValue)
    .then((searchValue) => {
      renderCountryList(searchValue)
    })
      .catch((error) => {
        console.log(error);
        //if (!/^[a-zA-Z]+$/.test(searchValue)) {
          //console.log(!/^[a-zA-Z]+$/.test(searchValue));
          //Notify.failure("Please enter only letters. Do not use any numbers or special characters.")
       // } else {
      Notify.failure("Oops, there is no country with that name")    
    });
  }
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
        return `<li class="name nameMore"><img src=${country.flags.svg} class="name__img"><p>${country.name}</p></li>`
    }).join(" ");
    const markupReplaced = markup.replaceAll("undefined", "")
    countryList.innerHTML = markupReplaced;

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
    const markupReplaced = markup.replaceAll("undefined", "")
    countryInfo.innerHTML = markupReplaced;
  }

} 



// Ad 2 dodatkowe: Początkowo próbowałam obsłużyć używanie samych liter jako warunek w catchu, ale doczytałam sugestię, żeby całkowicie tego fetcha nie wykonywać - rozumiem, że to kwestia szybkości i wydajności, tak? Teraz fetch się nie wykonuje, ale czy podwójny if jest poprawny, czy może da się to lepiej zrobić? 
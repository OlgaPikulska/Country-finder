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
  if (searchValue.length > 0 && !/^[a-zA-Z]+$/.test(searchValue)) {
      Notify.failure("Please enter only letters. Do not use any numbers or special characters.")
    } else {
      fetchCountries(searchValue)
      .then((searchValue) => {
        renderCountryList(searchValue)

        document.addEventListener("click", (event) => {
          const target = event.target.closest(".country-list__item");
          if (target) {
            const name = event.target.closest("#countryName").innerHTML
            const foundedName = searchValue.find(exact => exact.name === name)
            getMoreInfo(foundedName)

            const backBtn = document.createElement("button")
            backBtn.textContent = "Go back"
            backBtn.classList.add("back-btn")
            countryList.prepend(backBtn);
              backBtn.addEventListener("click", () => {
              countryList.innerHTML = null;
              countryInfo.innerHTML = null;
              renderCountryList(searchValue)
              })
          }
        })
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
      const markupText = `<li class="name country-list__item"><img src=${country.flags.svg} class="name__img"><p id="countryName">${country.name}</p></li>`
      return markupText
    }).join(" ");
    const markupReplaced = markup.replaceAll("undefined", "")
    countryList.innerHTML = markupReplaced;

  } else if (countries.length === 1) {

    countryList.innerHTML = null;
    const markup = countries.map((country) => {
      console.log(country.languages)
      const parsedLanguages = country.languages.length === 1 ? country.languages[0].name : country.languages.map(lang => lang.name).join(', ');
      //const parsedLanguages = country.languages.map(lang => lang.name).join(", ")
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


function getMoreInfo(country) {
  countryList.innerHTML = null;
  const parsedLanguages = country.languages.length === 1 ? country.languages[0].name : country.languages.map(lang => lang.name).join(', ');
  //const parsedLanguages = country.languages.map(lang => lang.name).join(", ")
  const markup = `<ul class="country-info__list">
      <li class="name"><img src="${country.flags.svg}" class="name__img" alt="Flag of ${country.name}"><p class="country-info__name"><b>${country.name}</b></p></li>
      <li class="country-info__item"><b>Capital:</b> ${country.capital}</li>
      <li class="country-info__item"><b>Population:</b> ${country.population}</li>
      <li class="country-info__item"><b>Languages:</b> ${parsedLanguages}</li></ul>`
      const markupReplaced = markup.replaceAll("undefined", "")
  return countryInfo.innerHTML = markupReplaced;
}



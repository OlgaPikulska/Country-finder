import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");

searchBox.addEventListener("input", () => {
    
})
function fetchCountries(name) {
    return fetch("https://restcountries.com/v3.1/name/{name}").then(
          (response) => {
            if (!response.ok) {
              throw new Error(response.status);
            }
            return response.json();
          }
        );
      }
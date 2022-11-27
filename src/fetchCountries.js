
export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v2/name/${name.trim()}?fields=name,capital,population,flags,languages`)
    .then((response) => {
        if (!response.ok) throw new Error(response.status);
        return response.json();
    })
};
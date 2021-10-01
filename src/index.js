import './sass/main.scss';

import refs from "./js/refs.js"
const { searchQuery, countryListEl, wrapperEl } = refs;
console.log(searchQuery);
console.log(countryListEl);

import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import countryList from "./templates/country-list.hbs";
import countryCard from "./templates/country-card.hbs";


searchQuery.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
    const userRequest = event.target.value.trim()
    console.log(userRequest);
    if (userRequest.length < 1) {
        return
    }
  
    fetchCountries(userRequest).then(country => {
        countryListEl.innerHTML = "";
        wrapperEl.innerHTML = "";
        if (!country) {
            return
        }
        if (country.length > 1 && country.length <= 10) {
            return (countryListEl.innerHTML = countryList(country))
        }
        if (country.length === 1) {
            return (wrapperEl.innerHTML = countryCard(...country))
        }
        if (country.length > 10) {
            alert('введите более полное наименование')
        }
    })
}
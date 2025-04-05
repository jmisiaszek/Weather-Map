import { createSelector } from 'reselect';

const citiesSelector = (state) => state.cities.cities;
const filterSelector = (state) => state.filter;

export const filteredCitiesSelector = createSelector(
    [citiesSelector, filterSelector],
    (cities, filters) => {
        return cities.filter((city) => {
            const cityName = city.tags.name || '';
            const cityPop = city.tags.population ? parseInt(city.tags.population) : 0;
            const nameMatch = cityName.toLowerCase().includes(filters.name.toLowerCase());
            const popMatch = cityPop >= filters.popMin && cityPop <= filters.popMax;
            return nameMatch && popMatch;
        });
    }
);
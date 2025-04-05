import { createSelector } from 'reselect';

const selectCities = (state) => state.cities.cities;

export const selectPopMinMax = createSelector(
    [selectCities],
    (cities) => {
        const populations = cities
        .map((city) => city.tags.population ? parseInt(city.tags.population) : null)
        .filter((num) => num !== null);
        const globalMin = populations.length > 0 ? Math.min(...populations) : 0;
        const globalMax = populations.length > 0 ? Math.max(...populations) : 1000000;
        return { globalMin, globalMax };
    }
);
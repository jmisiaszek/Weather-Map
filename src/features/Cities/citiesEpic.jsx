import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { getCities, getCitiesSuccess, getCitiesError } from './citiesSlice';

export const getCitiesEpic = (action$) =>
    action$.pipe(
        ofType(getCities.type),
        mergeMap((action) => {
            const { bbox } = action.payload;
            const query = `
            [out:json];
            node
                [place="city"]
                (${bbox});
            out;
            `;
            return from(
                fetch(`https://overpass-api.de/api/interpreter`, {
                    method: 'POST',
                    body: query,
                }).then((response) => response.json())
            ).pipe(
                map((data) => {
                    let cities = data.elements || [];
                    if (cities.length && cities[0].tags && cities[0].tags.population) {
                        cities = cities.slice().sort((a, b) => parseInt(b.tags.population || 0) - parseInt(a.tags.population || 0));
                    }
                    const topCities = cities.slice(0, 20);
                    console.log(topCities);
                    return getCitiesSuccess(topCities || [])
                }),
                catchError((error) => {
                    console.error(error.message);
                    of(getCitiesError(error.message))
                })
            );
        })
    );
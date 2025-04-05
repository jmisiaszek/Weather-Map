import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { getCitiesSuccess } from '../Cities/citiesSlice';
import { getWeather } from './weatherSlice';

export const getWeatherRequestEpic = (action$) =>
    action$.pipe(
        ofType(getCitiesSuccess.type),
        mergeMap((action) => {
            const topCities = action.payload;
            return from(
                topCities.map((city) => {
                    return getWeather({
                        cityId: city.id,
                        lat: city.lat,
                        lon: city.lon
                    })
                })
            );
        })
    );
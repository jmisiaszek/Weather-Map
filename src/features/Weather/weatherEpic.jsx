import { ofType } from 'redux-observable';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { getWeather, getWeatherSuccess, getWeatherError, getWeatherExists } from './weatherSlice';

const KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherEpic = (action$, state$) =>
    action$.pipe(
        ofType(getWeather.type),
        withLatestFrom(state$),
        mergeMap(([action, state]) => {
            const {cityId, lat, lon} = action.payload;
            if (state.weather.data[cityId]) {
                return of(getWeatherExists());
            }
            console.log("🔴 Fetching weather data for city:", cityId);
            const url = `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lat},${lon}`;
            return from(
                fetch(url).then((res) => res.json())
            ).pipe(
                map((data) => {
                    console.log("Weather data:", data);
                    return getWeatherSuccess({ city: cityId, data: data.current});
                })
            );
        })
    );
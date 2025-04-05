import { interval, concat, of, from } from 'rxjs';
import { withLatestFrom, mergeMap } from 'rxjs/operators';
import { getWeather, clearWeather } from './weatherSlice';
import { getCities } from '../Cities/citiesSlice';
import { useMap } from 'react-leaflet';

// const INTERVAL = 10000; // 10 seconds
const INTERVAL = 3600000; // 1 hour

export const refreshWeatherEpic = (action$, state$) => 
    interval(INTERVAL).pipe(
        withLatestFrom(state$),
        mergeMap(([_, state]) => {
            const bbox = state.map.bbox;
            console.log('🟢 Refreshing weather for bbox:', bbox);
            if (!bbox) {
                return of (clearWeather());
            }
            return concat(of(clearWeather()), of(getCities({ bbox })));
        })
    );
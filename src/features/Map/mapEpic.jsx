import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { getUserLocation, getUserLocationSuccess, getUserLocationError } from './mapSlice';

export const getUserLocationEpic = (action$) =>
    action$.pipe(
        ofType(getUserLocation.type),
        mergeMap(() => 
            from(
                new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                })
            ).pipe(
                map((position) => {
                    return getUserLocationSuccess({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                }),
                catchError((error) => {
                    console.error(error);
                    of(getUserLocationError(error.message))
                })
            )
        )
    );
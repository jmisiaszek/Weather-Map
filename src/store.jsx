import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';

import mapReducer from './features/Map/mapSlice';
import weatherReducer from './features/Weather/weatherSlice';
import citiesReducer from './features/Cities/citiesSlice';
import filtersReducer from './features/Filter/filterSlice';
import themeReducer from './features/Theme/themeSlice';

import { getUserLocationEpic } from './features/Map/mapEpic';
import { getCitiesEpic } from './features/Cities/citiesEpic';
import { getWeatherRequestEpic } from './features/Weather/weatherRequestEpic';
import { getWeatherEpic } from './features/Weather/weatherEpic';
import { refreshWeatherEpic } from './features/Weather/refreshWeatherEpic';


const epicMiddleware = createEpicMiddleware();

export default configureStore({
    reducer: {
        map: mapReducer,
        cities: citiesReducer,
        weather: weatherReducer,
        filter: filtersReducer,
        theme: themeReducer
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(epicMiddleware)
});

epicMiddleware.run(getUserLocationEpic);
epicMiddleware.run(getCitiesEpic);
epicMiddleware.run(getWeatherEpic);
epicMiddleware.run(getWeatherRequestEpic);
epicMiddleware.run(refreshWeatherEpic);

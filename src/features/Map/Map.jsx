import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import { getUserLocation, setBbox } from './mapSlice';
import { getCities } from '../Cities/citiesSlice';
import MarkerComponent from '../Marker/Marker';
import FilterComponent from '../Filter/Filter'
import { selectWeatherData } from '../Weather/weatherSelector';
import { filteredCitiesSelector } from '../Filter/filteredCitiesSelector';
import ThemeSwitch from '../Theme/themeSwitch';
import Spinner from '../Spinner/Spinner';

const Map = styled(MapContainer)`
    height: 500px;
    width: 800px;
    margin: 0 auto;
`;

const SetUserLocation = ({ position }) => {
    const map = useMap();
    const located = useRef(false);
    useEffect(() => {
        if (!located.current && position) {
            map.setView(position, 10);
            located.current = true;
        }
    }, [map, position]);
    return null;
}

const FetchCitiesOnMove = () => {
    const map = useMap();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleMoveEnd = () => {
            const bounds = map.getBounds();
            const sw = bounds.getSouthWest();
            const ne = bounds.getNorthEast();
            const bbox = `${sw.lat},${sw.lng},${ne.lat},${ne.lng}`;
            console.log('Fetching cities for bbox:', bbox);
            dispatch(setBbox(bbox));
            dispatch(getCities({ bbox }));
        };
        map.on('moveend', handleMoveEnd);
        handleMoveEnd();
        return () => {
            map.off('moveend', handleMoveEnd);
        };
    }, [map, dispatch]);
    return null;
}

const MapComponent = () => {
    const dispatch = useDispatch();
    const { location, loading, error } = useSelector((state) => state.map);
    const { loading: citiesLoading, error: citiesError } = useSelector((state) => state.cities);
    const cities = useSelector(filteredCitiesSelector);
    const weather = useSelector(selectWeatherData);
    const filters = useSelector((state) => state.filter);
    const mapUrl = useSelector((state) => state.theme.url);
    const weatherLoading = useSelector((state) => state.weather.loading);

    useEffect(() => {
        dispatch(getUserLocation());
    }, [dispatch]);

    // const filteredCities = cities.filter(city => {
    //     const cityName = city.tags.name || '';
    //     const cityPop = city.tags.population ? parseInt(city.tags.population) : 0;
    //     const nameMatch = cityName.toLowerCase().includes(filters.name.toLowerCase());
    //     const popMatch = cityPop >= filters.popMin && cityPop <= filters.popMax;
    //     return nameMatch && popMatch;
    //   });

    console.log('Redux location:', location);
    console.log('Redux cities:', cities);
    console.log('Redux weather:', weather);
    console.log('Filters:', filters);
    console.log('Loading: ', loading, citiesLoading, weatherLoading);

    return (
        <>
        <ThemeSwitch />
        <div>
            {(loading || weatherLoading || citiesLoading) && <Spinner />}
        </div>
        <FilterComponent />
        <Map center={location || [51.505, -0.09]} zoom={10}>
            <TileLayer
                url={mapUrl}
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {location && 
                <Marker position={[location.latitude, location.longitude]}>
                    <Popup>
                        You are here!
                    </Popup>
                </Marker>
            }
            {location && <SetUserLocation position={[location.latitude, location.longitude]} />}
            
            {location && <FetchCitiesOnMove />}

            {cities &&
                cities.map((city) => {
                    console.log('Marker weather:', weather[city.id]);
                    return (
                        <MarkerComponent
                            key={city.id}
                            position={[city.lat, city.lon]}
                            city={city}
                            weather={weather[city.id]}
                        />
                    )
                })    
            }
        </Map>
        </>
    )
}

export default MapComponent;
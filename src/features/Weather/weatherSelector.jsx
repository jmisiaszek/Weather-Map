import { createSelector } from 'reselect';

const getWeather = (state) => state.weather.data;

const getHowNice = (weather) => {
    const noRain = weather.precip_mm === 0;
    const goodTemp = weather.temp_c >= 18 && weather.temp_c <= 25;
    if (noRain && goodTemp) {
        return 'nice';
    } else if (noRain || goodTemp) {
        return 'passable';
    } else {
        return 'not nice';
    }
};

const getEmoji = (howNice) => {
    if (howNice === 'nice') {
        return '🥹';
    } else if (howNice === 'passable') {
        return '😶‍🌫️';
    } else {
        return '💀';
    }
}

export const selectWeatherData = createSelector(
    [getWeather],
    (weather) => {
        const newData = {};
        Object.keys(weather).forEach((city) => {
            const data = weather[city];
            const howNice = getHowNice(data);
            const emoji = getEmoji(howNice);
            newData[city] = { ...data, howNice, emoji };
        });
        return newData;
    }
)
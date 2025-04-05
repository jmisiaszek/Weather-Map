import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import styled from 'styled-components';
import ReactDOMServer from 'react-dom/server';

// const getHowNice = (weather) => {
//     const noRain = weather.precip_mm === 0;
//     const goodTemp = weather.temp_c >= 18 && weather.temp_c <= 25;
//     if (noRain && goodTemp) {
//         return 'nice';
//     } else if (noRain || goodTemp) {
//         return 'passable';
//     } else {
//         return 'not nice';
//     }
// };

// const getEmoji = (howNice) => {
//     if (howNice === 'nice') {
//         return '🥹';
//     } else if (howNice === 'passable') {
//         return '😶‍🌫️';
//     } else {
//         return '💀';
//     }
// }

const IconContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(73, 73, 73);
    padding: 5px 5px;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    width: fit-content;
    transform: translateX(-40%);
`;

const IconImage = styled.img`
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin-right: 5px;
`;

const IconEmoji = styled.span`
    font-size: 24px;
`;

const CustomIconContent = ({ imageUrl, emoji }) => (
    <IconContainer>
        <IconImage src={imageUrl} alt="weather icon" />
        <IconEmoji>{emoji}</IconEmoji>
    </IconContainer>
);


const MarkerComponent = ({ position, city, weather }) => {
    if (!weather) {
        return (
            <Marker position={position}>
                <Popup>
                    <div>
                        <strong>{city.tags.name}</strong>
                        <br />
                        Loading...
                    </div>
                </Popup>
            </Marker>
        )
    }

    // const howNice = getHowNice(weather);
    // const emoji = getEmoji(howNice);

    const iconHtml = ReactDOMServer.renderToStaticMarkup(
        <CustomIconContent imageUrl={weather.condition.icon} emoji={weather.emoji} />
    );

    const customIcon = L.divIcon({
        className: '', // Remove default styling classes if desired
        html: iconHtml,
    });

    console.log('Rendering marker for', city.tags.name, 'at', position);

    return (
        <Marker position={position} icon={customIcon}>
            <Popup>
                <div>
                    <strong>{city.tags.name}</strong>
                    <br />
                    Temperature: {weather.temp_c}°C
                    <br />
                    Condition: {weather.condition.text}
                    <br />
                    Niceness: {weather.howNice}
                </div>
            </Popup>
        </Marker>
    )
}

export default MarkerComponent
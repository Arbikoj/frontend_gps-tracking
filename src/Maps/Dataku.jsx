import { useEffect, useRef, useState } from 'react'
import Layout from '../layout/Layout'
import { TileLayer, Marker, MapContainer, Popup, Polyline, CircleMarker} from 'react-leaflet'
import './Maps.css';


function IndexMaps() {

// const center = [-7.295833297400326, 112.80211018703706]

    let newPolyline = [];
    let polyline = [
    [-7.295833, 112.802110],
    [-7.295810, 112.801421],
    [-7.292928, 112.801740],

    [-7.291214, 112.801846],
    [-7.290189, 112.799314],
    [-7.289961, 112.798677],
    [-7.290460, 112.794716],

    [-7.290640, 112.792655],
    [-7.287152, 112.793330],
    [-7.286074, 112.795439],
    [-7.285618, 112.798313],
    [-7.285145, 112.799319],
    [-7.284482, 112.799319],
    [-7.282724, 112.799357],
]

//   console.log(polyline);

    let [garis, setGaris] = useState(0);


//   const mapRef = useRef(null);

//   const limeOptions = { color: 'lime' }
    const redOptions = { color: 'red' }

    function convertDMSToDD(dms, direction) {
    let degrees = Math.floor(dms / 100);
    let minutes = dms % 100;
    let decimalDegrees = degrees + minutes / 60;

    if (direction === 'S' || direction === 'W') {
        decimalDegrees = -decimalDegrees;
    }
    
        return decimalDegrees;
    }

    const parseNMEAData = (data) => {

    const sentences = data.split('\n');
    const coordinates = [];

    sentences.forEach((sentence) => {
    // Example NMEA sentence: $GPGGA,123519,4807.038,N,01131.000,E,1,08,0.9,545.4,M,46.9,M,,*47
    const match = sentence.match(/^\$GPGGA,\d+\.?\d*,(\d+\.\d*),([NS]),(\d+\.\d*),([EW])/);
    
    // get time
    const parts = sentence.split(",");
    const timePart = parts[1];
    
    if (match && timePart.length >= 6) {
        const latitude = convertDMSToDD(parseFloat(match[1]), match[2]);
        const longitude = convertDMSToDD(parseFloat(match[3]), match[4]);
        const hour = timePart.substring(0, 2);
        const minute = timePart.substring(2, 4);
        const second = timePart.substring(4, 6);
    
        const timestamp = `${hour}:${minute}:${second}`;
        coordinates.push({ latitude, longitude, timestamp });
    }
    });

    return coordinates;
};

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
    const contents = e.target.result;

    const koor = parseNMEAData(contents);

    // object to array value

    const multidimensionalArray = koor.map((object) => {
        return [object.latitude, object.longitude, object.timestamp];
    });

    newPolyline = multidimensionalArray;
    setGaris(garis = newPolyline);
    console.log(newPolyline);

    };
    
    reader.readAsText(file);
    };


    const position = [-7.275652145792811, 112.79376191640463]
    
    return (


    <layout>
    
    <h1>hehehe</h1>
    {/* <p>Count: {garis}</p> */}
    <input type="file" accept=".nmea" onChange={handleFileUpload} />
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
    <CircleMarker center={[51.51, -0.12]} pathOptions={redOptions} radius={20}>
        <Popup>Popup in CircleMarker</Popup>
    </CircleMarker>
    <Polyline pathOptions={redOptions} positions={garis} />
    </MapContainer>
    </layout>
)
}

export default IndexMaps
import { useRef, useState } from 'react'
import Layout from '../layout/Layout'
import { TileLayer, Marker, MapContainer, Popup, Polyline, CircleMarker} from 'react-leaflet'
import './Maps.css';
import Papa from 'papaparse';

function IndexMaps() {

  const center = [-7.295833297400326, 112.80211018703706]

  const polyline = [
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

  console.log(polyline);

  const limeOptions = { color: 'lime' }
  const redOptions = { color: 'red' }

  const parseNMEAData = (data) => {
  Papa.parse(data, {
    delimiter: '\n',
    complete: (results) => {
      // Process the parsed NMEA data
      console.log(results.data);
    },
  });
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (e) => {
    const contents = e.target.result;
    parseNMEAData(contents);
  };
  
  reader.readAsText(file);
};


  const position = [-7.275652145792811, 112.79376191640463]
  return (


    <layout>
    
    <h1>hehehe</h1>
    <input type="file" accept=".nmea" onChange={handleFileUpload} />
  <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/* <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> */}
    <CircleMarker center={[51.51, -0.12]} pathOptions={redOptions} radius={20}>
      <Popup>Popup in CircleMarker</Popup>
    </CircleMarker>
    <Polyline pathOptions={redOptions} positions={polyline} />
  </MapContainer>
  </layout>
  )
}

export default IndexMaps
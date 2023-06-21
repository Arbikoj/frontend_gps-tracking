import React from 'react'

import { useEffect, useRef } from 'react';
import { parse } from 'gps-util';
import { featureCollection, lineString } from '@turf/turf';
import Layout from '../layout/Layout';


const MapComponent = ({ nmeaData }) =>   {
    const mapRef = useRef(null);
    useEffect(() => {
        // Initialize the map
        mapRef.current = L.map('map').setView([51.505, -0.09], 13);
    
        // Add a tile layer to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data © OpenStreetMap contributors',
        }).addTo(mapRef.current);
    
        // Convert NMEA data to GeoJSON
        const convertNMEAToGeoJSON = () => {
          const sentences = nmeaData.split('\n');
          const coordinates = [];
    
          sentences.forEach((sentence) => {
            const data = parse(sentence);
            if (data && data.latitude && data.longitude) {
              coordinates.push([data.longitude, data.latitude]);
            }
          });
    
          const geojson = lineString(coordinates);
    
          // Create a GeoJSON layer and add it to the map
          L.geoJSON(geojson).addTo(mapRef.current);
    
          // Fit the map to the GeoJSON layer bounds
          mapRef.current.fitBounds(L.geoJSON(geojson).getBounds());
        };
    
        convertNMEAToGeoJSON();
      }, [nmeaData]);


  return (
    <Layout>
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
    <div>nmea</div>
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </Layout>

  )
}

export default MapComponent
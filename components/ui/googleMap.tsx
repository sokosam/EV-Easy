// npm install @react-google-maps/api
import React  from "react";
import { GoogleMap, LoadScript, Marker } from `@react-google-maps/api`;

const containerStyle = {
    width: `100%`,
    height: `400px`, 
};

const center = {
    lat: 40.7128, // Replace with your desired latitude
    lng: -74.0060, // Replace with your desired longitude
  };
  const GoogleMapComponent: React.FC = () => {
    return (
      <LoadScript googleMapsApiKey= "">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {/* Add a marker */}
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    );
  };
  
  export default GoogleMapComponent;

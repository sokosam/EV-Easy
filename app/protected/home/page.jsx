"use client"
//import { warmFlightResponse } from 'next/dist/server/app-render/app-render';
import React, { useEffect } from 'react'
import Map from '../../../components/ui/googlemaps'
import LightningBolt from '@/components/ui/lightning';


const page = () => {
    let watchId;



    function success(position) {
        const coords = position.coords;
        const latitude = coords.latitude;
        const longitude = coords.longitude;
        console.log("Current Position:", coords);
    }

    function error(e) {
        console.log(e);
    }

    const options = {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      };
    
    function startWatchingLocation() {
        watchId = navigator.geolocation.watchPosition(success, error, options);
    }

    function stopWatchingLocation () {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
        }
    }

    useEffect(startWatchingLocation, []);



  return (
    <div className="h-screen">
        <div className='flex justify-center items-center'>
            <h1 style={{fontSize: '4rem', marginBottom: '2rem'}}>Dashboard</h1>
        </div>
        <Map />

        {/* Add LightningBolt to render it */}
        <LightningBolt />
      
    </div>
  )
}

export default page

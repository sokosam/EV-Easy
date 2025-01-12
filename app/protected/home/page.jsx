"use client"
import React, { use, useEffect, useState } from 'react'
import Map from '../../../components/ui/googlemaps'
import LightningBolt from '@/components/ui/lightning';
import getUser from "@/pages/api/getUser";
import { createClient } from "@/utils/supabase/client";
function page () {
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

    async function getStationsForUser() {
        const supabase = await createClient();
        const { data, error } = await supabase.auth.getUser();
        console.log(data);

        if (data.user){
            console.log(data.user.id)
            const response = await fetch('/api/getUser', {
              method: 'POST',
              body: JSON.stringify({data: {user_id: data.user.id}}),
              headers: {
                'Content-Type': 'application/json'
              }
            });
            console.log("test")
            const responseData = await response.json()
            console.log(responseData);

            const user_data = responseData.data;
            console.log(user_data);

            let stations = []

            if (user_data) {    
                for (let name in user_data.names) {
                  const response2 = await fetch('/api/hostNetwork', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({data: {owner: user_data.names[name]}})
                  }); //getStationsFromOwner(user_data.data.names[name])
                  const station = await response2.json();
                  if (station){
                  for (let s of station) {
                    stations.push(s)
                  }
                }
            }
              } else {
                console.error("Error fetching user data:", user_data?.error);
            }
    
            console.log("Stations:", stations);
            return stations;
            
  
          }


    }

    useEffect(startWatchingLocation, []);

    useEffect( () => {
        getStationsForUser();

    }, []);


    
  return (
    <div className="h-screen">
        <div className='flex justify-center items-center'>
            <h1 style={{fontSize: '4rem', marginBottom: '2rem' }}>Dashboard</h1>
        </div>
        <Map />

        {/* Add LightningBolt to render it */}
        <LightningBolt />
      
    </div>
  )
}

export default page

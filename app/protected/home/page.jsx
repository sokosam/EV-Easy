"use client"
import React, { use, useEffect, useState } from 'react'
import Map from '../../../components/ui/googlemaps'
import LightningBolt from '@/components/ui/lightning';
import getUser from "@/pages/api/getUser";
function page () {
    let watchId;
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY );



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
        const { data: session, error } = await supabase.auth.getSession();
        if (error) {
            console.error("Error fetching session:", error);
        } else {
            console.log("Session user:", session.user);
        }
        const user_id = await fetch("/api/getUserId").then((res) => res.json()); 
        console.log("User ID:", user_id);
        if (!user_id) {
            console.error("Error fetching user ID");
            return;
        }   
        const user_data = await getUser(user_id);

        let stations = []

        if (user_data && user_data.data) {    
            for (let name in user_data.data.names) {
              let station = await getStationsFromOwner(user_data.data.names[name])
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

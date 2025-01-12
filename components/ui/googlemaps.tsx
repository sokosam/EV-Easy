"use client"
import React, { useEffect } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import { info } from 'console';

const Map = () => {

    const mapRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            console.log("Map init")
            const loader = new Loader({ 
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
                version: "weekly",
            });

            const { Map } = await loader.importLibrary('maps');
            const { Marker } = await loader.importLibrary('marker');
            const { InfoWindow } = await loader.importLibrary("maps");

            const position = {
                lat: 51.5074,
                lng: 0.1278, // WHERE WE ARE CENTERING THE MAP
            }

            // map options
            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 17,
                // mapId: 'Map.DEMO_MAP_ID',
            }

            // Setup the map
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            // put up a marker
            const marker = new Marker({
                map: map,
                position: position,
            })

            const infowindow = new InfoWindow({
                minWidth: 200,
                headerContent: `<div style="color: black;">Header</div>`,
            });

            marker.addListener("click", () => {
                infowindow.setContent(`
                    <div style="
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin: 0;
                        marginBottom: 3rem;
                        padding: 0;
                    ">
                            <span style="color: black; font-size: 1rem;">Full Window Content</span>
                        </div>
                    </div>
                `);
                infowindow.open(map, marker);
            })

        }

        initMap();

    }, []);


    return (
        <div className="h-4/6 w-[900px]" ref={mapRef} />
  )
}

export default Map

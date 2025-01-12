"use client";
import React, { useEffect, useState } from "react";
import Map from "../../../components/ui/googlemaps";
import LightningBolt from "@/components/ui/lightning";
import getUser from "@/pages/api/getUser";
import { createClient } from "@/utils/supabase/client";
import "./buffer.css";
import { Image } from "lucide-react";

function Page() {
  let watchId;
  const [position, setPosition] = useState(null);
  const [stations, setStations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followedCompanies, setFollowedCompanies] = useState([]);
  const [newHost, setNewHost] = useState("");

  async function handleFollowHost() {
    const supabase = createClient();  
    const { data, error } = await supabase.auth.getUser();
  
    if (data?.user) {
      try {
        const response = await fetch("/api/userNetwork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { user_id: data.user.id, newHost },
          }),
        });
  
        const result = await response.json();
        if (result.error) {
          console.error("Error adding host:", result.error);
          return;
        }
  
        console.log("Host added successfully:", result);
  
        // Refresh stations and followed companies
        setNewHost(""); // Clear the input
        const updatedStations = await fetchStationsForFollowedCompanies();
        setStations(updatedStations); // Trigger re-render of the map
      } catch (err) {
        console.error("Failed to add host:", err);
      }
    }
  }

  const handleUnfollowHost = async (host) => {
    const supabase = createClient();  
    const { data, error } = await supabase.auth.getUser();
  
    if (data?.user) {
      try {
        const response = await fetch("/api/userNetwork", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: { user_id: data.user.id, host },
          }),
        });
  
        const result = await response.json();
        if (result.error) {
          console.error("Error adding host:", result.error);
          return;
        }
  
        console.log("Host added successfully:", result);
  
        // Refresh stations and followed companies
        setNewHost(""); // Clear the input
        const updatedStations = await fetchStationsForFollowedCompanies();
        console.log(updatedStations)
        setStations(updatedStations); // Trigger re-render of the map
      } catch (err) {
        console.error("Failed to remove host:", err);
      }
    }
  }

  async function getStationsForUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    console.log(data);

    if (data.user) {
      console.log(data.user.id);
      const response = await fetch("/api/getUser", {
        method: "POST",
        body: JSON.stringify({ data: { user_id: data.user.id } }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData);

      const user_data = responseData.data;
      console.log(user_data);

      let stations = [];

      if (user_data) {
        setFollowedCompanies(user_data.names);
        for (let name in user_data.names) {
          const response2 = await fetch("/api/hostNetwork", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { owner: user_data.names[name] } }),
          });
          const station = await response2.json();
          if (station) {
            for (let s of station) {
              stations.push(s);
            }
          }
        }
      } else {
        console.error("Error fetching user data:", user_data?.error);
      }
      if (stations.length > 0) {
        setStations(stations);
      } else {
        const response = await fetch("/api/hostNetwork", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let newStations = await response.json();
        for (let s of newStations) {
          stations.push(s);
        }
        setStations(stations);
      }

      console.log("Stations:", stations);
      setLoading(false);
    }
  }


  async function fetchStationsForFollowedCompanies() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    const response =  await fetch("/api/getUser", {
      method: "POST",
      body: JSON.stringify({ data: { user_id: data.user.id } }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();
    const names = user.data.names;

    setFollowedCompanies(names);

    if (names){
      let updatedStations = [];
      for (let company of names) {
        const response = await fetch("/api/hostNetwork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: { owner: company } }),
        });

        const companyStations = await response.json();
        if (companyStations) {
          updatedStations = [...updatedStations, ...companyStations];
        }
      }

      setStations(updatedStations)
    }

  }

  function success(position) {
    const coords = position.coords;
    const latitude = coords.latitude;
    const longitude = coords.longitude;
    console.log("Latitude:", latitude, "Longitude:", longitude);
    setPosition({ latitude: latitude, longitude: longitude });
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

  function stopWatchingLocation() {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  }




  useEffect(() => {
    startWatchingLocation();
    getStationsForUser();

    return () => stopWatchingLocation();
  }, []);

  return (
    <div className="h-screen">
      <div
        className="flex flex-col justify-center items-center"
        style={{ marginBottom: "10%" }}
      >
        <h1 style={{ fontSize: "4rem", marginBottom: "2rem" }}>Dashboard</h1>
        <div className="flex flex-row space-x-8">
          {/* Followed EV Hosts Section */}
          <div>
            <h2 className="text-xl font-bold">Followed EV Hosts</h2>
            <ul>
              {followedCompanies &&
                followedCompanies.map((name, index) => (
                  <li key={index}>
                    <div className="flex flex-row items-center justify-center">
                        <p className="mr-2">{name}</p>
                        <a className="cursor-pointer"><img className="cursor-pointer" src="/delete.svg" width={10} height={10} alt="delete icon" onClick={() => handleUnfollowHost(name)}/></a>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          {/* Follow a Host Section */}
          <div style={{marginLeft: '5rem', marginRight: '5rem'}}>
            <h2 className="text-center font-bold text-xl">Follow a Host</h2>
            <div className="flex flex-row items-center space-x-2 mt-4">
              <input
                className="border border-gray-300 rounded-md p-2 w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Host Name"
                value={newHost}
                onChange={(e) => setNewHost(e.target.value)}
              />
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleFollowHost}
              >
                Follow
              </button>
            </div>
          </div>

          {/* CO2 Emissions Saved Section */}
          <div>
            <h2 className="text-center font-bold text-xl">CO2 Emissions Saved</h2>
          </div>
        </div>
      </div>

      {/* Render Map */}
      {position && stations && <Map currentLocation={position} stations={stations} />}
      {loading && (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;

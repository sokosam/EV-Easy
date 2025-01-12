import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = process.env.HOST_SUPABASE_URL!;
const supabaseKey = process.env.HOST_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);


export const getStationsFromOwner = async (owner : string) =>{
    try {
    let  {data : station_data, error: fetchError} =  await supabase.from('stations').select("*").eq("owner", owner);
    if (fetchError){
        console.log("Fetch error!")
    }    
    return station_data
    }
    catch(err){
        console.log(err)
        return null
    }
}

export const getAllStations = async () =>{
    try {
    let  {data : station_data, error: fetchError} =  await supabase.from('stations').select("*");
    if (fetchError){
        console.log("Fetch error!")
    }    
    return station_data
    }
    catch(err){
        console.log(err)
        return null
    }
}


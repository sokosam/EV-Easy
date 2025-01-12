import { createClient } from '@supabase/supabase-js';
import { log } from 'console';
import { use } from 'react';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const checkExist = async (user_id: string) =>{
    try {
    let  {data : user_data, error: fetchError} =  await supabase.from('users').select("*").eq("auth_user_id", user_id).maybeSingle();
    if (fetchError){
        console.log("Fetch error!")
    }    
    return user_data
    }
    catch(err){
        console.log(err)
        return null
    }
}

export const addHost = async (user_id : string, newHost : string) =>{
    try {    
    let user_data = await checkExist(user_id)
    if (!user_data){
        console.log("Something went wrong!")
        return 
    }

    for(let name in user_data.names){
        // console.log(user_data.names[name]);  
        if (user_data.names[name] === newHost){
            console.log("Name exists");
            return
        }
    }
    user_data.names.push(newHost)

    let { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({
        names: user_data.names,})
      .eq('auth_user_id', user_id)
      .select('*');

    if (updateError) {
      console.error('Error updating user names:', updateError.message);
      return;
    }

    return updatedUser
    } catch(err){
    console.log(err);
    return null
    }
}

export const removeHost = async (user_id: string, hostToRemove: string) => {
    try {
        let user_data = await checkExist(user_id);
        if (!user_data) {
            console.log("Something went wrong!");
            return;
        }
        console.log(hostToRemove)
        console.log(user_data.names);
        // if (user_data.names[5]) {
        //     console.log(user_data.names[5]);
        //     console.log(user_data.names[5].length + " " + hostToRemove.length);
        // }
        let index = user_data.names.indexOf(hostToRemove);
        if (index === -1) {
            console.log("Name does not exist");
            return;
        }
        user_data.names.splice(index, 1);

        let { data: updatedUser, error: updateError } = await supabase
            .from('users')
            .update({
                names: user_data.names,
            })
            .eq('auth_user_id', user_id)
            .select('*');

        if (updateError) {
            console.error('Error updating user names:', updateError.message);
            return;
        }

        return updatedUser;
    } catch (err) {
        console.log(err);
        return null;
    }
}


import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      console.log(req.body)
      const data = req.body;
      const user = await addHost(data.data.user_id , data.data.newHost);
      if (!user){
            res.status(200).json({error: "Error adding host!"});
            return
      }
      res.status(200).json( user);
      break;
    case 'DELETE':
        console.log(req.body)
        const data2 = req.body;
        const user2 = await removeHost(data2.data.user_id , data2.data.host);
        if (!user2){
              res.status(200).json({error: "Error removing host!"});
              return
        }
        res.status(200).json( user2);
        break
  }
}
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

    for(const name in user_data.names){
        if (name == newHost){
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
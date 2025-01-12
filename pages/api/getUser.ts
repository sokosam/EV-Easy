import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';

// Initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const getUser = async (user_id : string) => {
    // Query supabase to see if from the table users select all where auth_user_id is equal to the current user_id
    const user_data =  await supabase.from('users').select("").eq("auth_user_id", user_id).maybeSingle();

    if (!user_data.data){
      const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          auth_user_id: user_id,
          names: [], // Assuming names is an array field
          carbon_saved: 0,
          reserved: ""
        },
      ])
      .select('').maybeSingle(); // Use .select('*') to return the inserted row

    if (insertError) {
      console.error('Error creating user:', insertError.message);
      return insertError;
    }
    return user_data
    }
    else return user_data
}


import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      console.log(req.body)
      const data = req.body;
      const user = await getUser(data.data.user_id);
      res.status(200).json( user);
      break;
  }
}
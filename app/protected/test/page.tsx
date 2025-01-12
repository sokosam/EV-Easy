"use client"
import FetchDataSteps from "@/components/tutorial/fetch-data-steps";
import { createClient } from "@/utils/supabase/client";
import { log } from "console";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import getUser from "@/pages/api/getUser";
import { addHost, removeHost } from "@/pages/api/userNetwork";
import { getStationsFromOwner } from "@/pages/api/hostNetwork";
import { useEffect } from "react";


export default  function ProtectedPage() {
  // const supabase = await createClient();
  useEffect(() => {
    const fetchData = async () => {
        const supabase = await createClient();

        // const user_data =  await supabase.from('users').select("*");
        // console.log(user_data);

        const { data, error } = await supabase.auth.getUser();
        console.log(data);

        if (data.user){
          console.log(data.user.id)
          const response = await fetch('/api/createHost', {
            method: 'POST',
            body: JSON.stringify({data: {user_id: data.user.id}}),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log("test")
          console.log(await response.json());
          

        }
    };

    fetchData();
}, []);


  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/sign-in");
  // }

  // removeHost(user.id, "GM")
  // let user_data = await getUser(user.id)
  // let stations : any[] = []
  
  // if (user_data && user_data.data) {    
  //   for (let name in user_data.data.names) {
  //     let station = await getStationsFromOwner(user_data.data.names[name])
  //     if (station){
  //     for (let s of station) {
  //       stations.push(s)
  //     }
  //   }
  //     // stations.push(station)
  //   }
  // } else {
  //   console.error("Error fetching user data:", user_data?.error);
  // }

  // useEffect(() => {
  //   testApiCall();
  // }, []);

  // async function testApiCall() {
  //   const response = await fetch('/api/createHost', {
  //     method: 'POST',
  //     body: JSON.stringify({ }),
  //   });
  
  //   console.log(response);
  // }



  // let stations = await getStationsFromOwner("Tesla")
  // console.log(user_data)
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
        </pre>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div>
  );
}

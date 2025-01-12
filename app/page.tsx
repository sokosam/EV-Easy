import Hero from "@/components/hero";
import React from 'react';
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import LightningBolt from '@/components/ui/lightning';
import Landing from "@/components/landing_home";

export default async function Home() {
  return (
    <>
      {/* <Hero /> */}
      {/* Add LightningBolt to render it */}
      {/* <LightningBolt /> */}
      {/* <main className="flex-1 flex flex-col gap-6 px-4" > */}
        {/* <h2 className="font-medium text-xl mb-4">Next steps</h2> */}
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
      {/* </main> */} 
      <main className="flex-1 flex flex-col gap-6 px-4 -z-10" >
        {/* <Landing /> */}
      </main>
    </>
  );
}

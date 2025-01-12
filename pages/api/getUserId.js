import { createClient } from "@supabase/supabase-js";

// export default async function getUserId() {
//     console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
//     const supabase = await createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

//     const {
//         data: { session },
//       } = await supabase.auth.getSession();
    
//     if (session) {
//         console.log(session.user);
//             return session.user.id;
//     }
//     else {
//         return null;
//     }

// }

export default async function handler(req, res) {
    if (req.method === "GET") {
        
        res.status(200).json({ message: "Working" });
    }
    else {
        console.log("Not a valid request");
        res.status(400).json({ error: "Not a valid request" });
    }
    
}
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supaBaseUrl = process.env.SUPABASE_URL || '';
const supaBaseKey = process.env.SUPABASE_KEY || '';

const supabase = createClient(supaBaseUrl, supaBaseKey, {
    auth:{
        persistSession: false
    }
})

export {supabase}
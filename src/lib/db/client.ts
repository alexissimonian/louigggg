import { env } from "$env/dynamic/private";
import { createClient } from "@supabase/supabase-js";

const supabaseProjectUrl = env.SECRET_SB_PROJECT_URL;
const supabaseApiKey = env.SECRET_SB_API_KEY;

export const supabase = createClient(supabaseProjectUrl, supabaseApiKey);

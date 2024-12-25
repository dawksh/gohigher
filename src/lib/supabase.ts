
import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
config()

const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string)

export { supabase }
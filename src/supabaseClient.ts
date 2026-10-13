import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kwqviyqizsiwkqqywrpw.supabase.co"
const supabaseKey = "sb_publishable_vXELtVuqoJ9um428Eg6nlA_S7vAcfsf"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
import { supabase } from "$lib/db/client"
export async function getAllItems() {
  let { data, error } = await supabase.from("clothing").select("*");

  if (error) {
    console.log("error", error);
  } else {
    return data;
  }
}

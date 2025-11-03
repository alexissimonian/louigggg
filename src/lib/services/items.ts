import { supabase } from "$lib/db/client"
export async function getAllDishes(): Promise<any[]> {
  let { data, error } = await supabase.from("dishes").select("*");

  if (error) {
    console.log("error", error);
    return [];
  } else {
    return data ?? [];
  }
}

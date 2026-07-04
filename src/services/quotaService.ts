import { supabaseAdmin } from "@/lib/supabaseAdmin";

const MAX_QUESTIONS = 5;

export async function checkQuota(
  sessionId: string
): Promise<boolean> {

  const { count, error } = await supabaseAdmin
    .from("chat_logs")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("session_id", sessionId)
    .eq("sender_type", "user");

  if (error) throw error;

  return (count ?? 0) < MAX_QUESTIONS;
}
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function touchSession(sessionId: string) {
  // await supabase.from("chat_sessions").upsert({
  //   session_id: sessionId,
  //   last_activity: new Date().toISOString(),
  // });
  const { error: sessionError } = await supabaseAdmin
    .from("chat_sessions")
    .upsert({
      session_id: sessionId,
      last_activity: new Date().toISOString(),
    });

  if (sessionError) {
    console.error(sessionError);
    throw sessionError;
  }
}

export async function saveMessage(
  sessionId: string,
  senderType: "user" | "bot",
  message: string
) {
  // Pastikan session ada
  await touchSession(sessionId);

  const { error } = await supabaseAdmin
    .from("chat_logs")
    .insert({
      session_id: sessionId,
      sender_type: senderType,
      message_text: message,
    });

  if (error) throw error;
}

export async function getMessages(sessionId: string) {
  const { data, error } = await supabaseAdmin
    .from("chat_logs")
    .select("*")
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (error) throw error;

  return data;
}


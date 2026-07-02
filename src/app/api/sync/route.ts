import { syncComics } from "@/services/syncService";

export async function POST() {
  try {
    const result = await syncComics();

    return Response.json(result);
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}
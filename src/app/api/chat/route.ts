import { askQuestion } from "@/services/ragService";
import { checkQuota } from "@/services/quotaService";
import { saveMessage } from "@/services/chatLogService";

export async function POST(req: Request) {
  try {
    const { sessionId, question } = await req.json();
    console.log(sessionId);
    const allowed = await checkQuota(sessionId);

    if (!allowed) {
      return Response.json(
        {
          success: false,
          message: "Kuota habis",
        },
        {
          status: 429,
        }
      );
    }

    await saveMessage(
      sessionId,
      "user",
      question
    );

    const result = await askQuestion(
      sessionId,
      question
    );

    await saveMessage(
      sessionId,
      "bot",
      result.answer
    );

    return Response.json({
      success: true,
      ...result,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
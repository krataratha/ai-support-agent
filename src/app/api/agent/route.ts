import { NextResponse } from "next/server";
import { runRefundAgent } from "@/lib/agent/agent";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      customerId,
      message,
      history = [],
    } = body;

    if (!customerId || !message) {
      return NextResponse.json(
        {
          error: "Customer ID and message are required.",
        },
        { status: 400 }
      );
    }

    const result = await runRefundAgent(
      customerId,
      message,
      history
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Agent API error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Internal server error",
      },
      { status: 500 }
    );
  }
}
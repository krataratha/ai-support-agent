import { GoogleGenAI } from "@google/genai";

import {
  getCustomer,
  getOrder,
  getRefundPolicy,
  checkRefundEligibility,
  approveRefund,
  denyRefund,
} from "./tools";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function runRefundAgent(
  customerId: string,
  message: string
) {
  const logs: string[] = [];

  logs.push("Agent started");
  logs.push(`Customer ID: ${customerId}`);
  logs.push(`Customer message: ${message}`);

  // 1. Get customer
  const customerResult = await getCustomer(customerId);

  logs.push("Called getCustomer tool");

  if (!customerResult.success) {
    return {
      response: "I could not find your customer account.",
      logs,
    };
  }

  // 2. Detect order ID from the user's exact message
  const orderMatch = message.match(/\bORD-\d+\b/i);

  if (orderMatch) {
    // IMPORTANT:
    // Preserve the actual ID format from the database.
    const orderId = orderMatch[0].toUpperCase();

    logs.push(`Order ID identified: ${orderId}`);

    const orderResult = await getOrder(orderId);

    logs.push("Called getOrder tool");

    if (!orderResult.success) {
      return {
        response: `I could not find order ${orderId}. Please check the order ID and try again.`,
        logs,
      };
    }

    const policyResult = await getRefundPolicy();

    logs.push("Loaded refund policy");

    // Ask Gemini to extract the refund reason from the conversation.
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: `
Customer refund message:

${message}

Identify the refund reason in one short phrase.

Possible reasons:
- defective
- damaged
- incorrect
- different from description

If the customer says the product arrived damaged, return exactly:
damaged

Do not invent information.
`,
    });

    const reason =
      aiResponse.text?.trim().toLowerCase() || "damaged";

    logs.push(`Refund reason identified: ${reason}`);

    // 3. Check refund eligibility using backend
    const eligibility = await checkRefundEligibility(
      orderId,
      reason
    );

    logs.push("Checked refund eligibility");

    if (!eligibility.eligible) {
      return {
        response: eligibility.requiresManualApproval
          ? "Your refund request requires manual admin approval because the refund amount is above $500."
          : eligibility.reason,
        logs,
      };
    }

    // 4. Automatically approve
    const refundResult = await approveRefund(
      customerId,
      orderId,
      reason
    );

    logs.push("Refund approval tool called");

    if (!refundResult.success) {
      return {
        response: refundResult.error,
        logs,
      };
    }

    return {
      response: `Your refund request for order ${orderId} has been approved successfully.`,
      logs,
    };
  }

  // No order ID yet
  return {
    response:
      "I can help you with the refund. Please provide your order ID, for example: ORD-1001.",
    logs,
  };
}
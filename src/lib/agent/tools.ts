import { prisma } from "./prisma";
import { REFUND_POLICY } from "./refund-policy";

export async function getCustomer(customerId: string) {
  const customer = await prisma.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  if (!customer) {
    return {
      success: false,
      error: "Customer not found",
    };
  }

  return {
    success: true,
    customer,
  };
}

export async function getOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    return {
      success: false,
      error: "Order not found",
    };
  }

  return {
    success: true,
    order,
  };
}

export async function getRefundPolicy() {
  return {
    success: true,
    policy: REFUND_POLICY,
  };
}

export async function checkRefundEligibility(
  orderId: string,
  reason: string
) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      refundRequests: true,
    },
  });

  if (!order) {
    return {
      eligible: false,
      reason: "Order not found",
    };
  }

  if (order.status !== "DELIVERED") {
    return {
      eligible: false,
      reason: "Order has not been delivered yet.",
    };
  }

  if (!order.deliveryDate) {
    return {
      eligible: false,
      reason: "Order does not have a delivery date.",
    };
  }

  const now = new Date();

  const daysSinceDelivery =
    (now.getTime() - order.deliveryDate.getTime()) /
    (1000 * 60 * 60 * 24);

  if (daysSinceDelivery > 30) {
    return {
      eligible: false,
      reason: "Refund request is outside the 30-day refund window.",
      daysSinceDelivery: Math.floor(daysSinceDelivery),
    };
  }

  if (order.isFinalSale) {
    return {
      eligible: false,
      reason: "This order is marked as final sale.",
    };
  }

  if (order.isDigital && order.isDownloaded) {
    return {
      eligible: false,
      reason: "Downloaded digital products are non-refundable.",
    };
  }

  if (order.refundRequests.length > 0) {
    return {
      eligible: false,
      reason: "This order has already had a refund request.",
    };
  }

  const acceptedReasons = [
    "defective",
    "damaged",
    "incorrect",
    "different from description",
  ];

  const normalizedReason = reason.toLowerCase();

  const validReason = acceptedReasons.some((acceptedReason) =>
    normalizedReason.includes(acceptedReason)
  );

  if (!validReason) {
    return {
      eligible: false,
      reason:
        "The refund reason does not match an accepted refund reason.",
    };
  }

  if (order.amount > 500) {
    return {
      eligible: false,
      requiresManualApproval: true,
      reason: "Refund amount is above $500 and requires manual admin approval.",
    };
  }

  return {
    eligible: true,
    reason: "Order satisfies all automatic refund requirements.",
  };
}

export async function approveRefund(
  customerId: string,
  orderId: string,
  reason: string
) {
  const eligibility = await checkRefundEligibility(orderId, reason);

  if (!eligibility.eligible) {
    return {
      success: false,
      error: eligibility.reason,
      requiresManualApproval: eligibility.requiresManualApproval ?? false,
    };
  }

  const refund = await prisma.refundRequest.create({
    data: {
      customerId,
      orderId,
      reason,
      status: "APPROVED",
      decision: "Automatically approved according to refund policy.",
    },
  });

  return {
    success: true,
    refund,
  };
}

export async function denyRefund(
  customerId: string,
  orderId: string,
  reason: string,
  decision: string
) {
  const refund = await prisma.refundRequest.create({
    data: {
      customerId,
      orderId,
      reason,
      status: "DENIED",
      decision,
    },
  });

  return {
    success: true,
    refund,
  };
}
import { transactionMessageRegex } from "@ttbs/lib/constants";

import { WebhookPaymentInput } from "@/schemas/webhook.schema";

import { updateOrder } from "./order.service";

export const confirmPayment = async (transaction: WebhookPaymentInput["payment"]) => {
  const message = transaction.content.match(transactionMessageRegex);
  if (message) {
    const orderId = +message[0].split(" ")[1];
    if (isNaN(orderId)) return false;

    await updateOrder(orderId, {
      paymentStatus: "PAID",
    });
    return true;
  }

  return false;
};

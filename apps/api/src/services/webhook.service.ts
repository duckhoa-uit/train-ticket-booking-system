import { transactionMessageRegex } from "@ttbs/lib/constants";
import dayjs from "@ttbs/lib/dayjs";

import { WebhookPaymentInput } from "@/schemas/webhook.schema";
import { orderCompleteEmail, sendEmail } from "@/utils/email";

import { updateOrder } from "./order.service";

export const confirmPayment = async (transaction: WebhookPaymentInput["payment"]) => {
  const message = transaction.content.match(transactionMessageRegex);
  if (message) {
    const orderId = +message[0].split(" ")[1];
    if (isNaN(orderId)) return false;

    const updatedOrder = await updateOrder(orderId, {
      paymentStatus: "PAID",
    });
    if (updatedOrder) {
      const tickets = updatedOrder.tickets.map((ticket) => {
        const fromStation = ticket.fromTineline.journeyStation.station.name;
        const toStation = ticket.toTineline.journeyStation.station.name;
        return {
          ...ticket,
          fromStation,
          toStation,
          departTime: dayjs(ticket.fromTineline.departDate).format("L HH:mm"),
        };
      });

      // SEND mail
      await sendEmail(
        orderCompleteEmail({
          tickets,
          orderId: updatedOrder.id,
          name: updatedOrder.buyerName,
          email: updatedOrder.buyerEmail,
        })
      );
      return true;
    }

    return false;
  }

  return false;
};

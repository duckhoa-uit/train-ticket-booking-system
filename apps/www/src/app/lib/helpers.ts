import { v4 as _uuidV4 } from "uuid";

import type { Order } from "@ttbs/prisma";

export const uuidv4 = () => {
  return _uuidV4();
};

export const generateVietQrUrl = (order: Order) => {
  const searchParams = new URLSearchParams({
    accountName: "Easy Boarding",
    amount: `${order.amount}`,
    addInfo: `EB ${order.id}`,
  });

  return `https://api.vietqr.io/image/970422-0855269237-6u3V6Hx.jpg?${searchParams.toString()}`;
};

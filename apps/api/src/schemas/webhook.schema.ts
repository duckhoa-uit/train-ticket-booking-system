import { z } from "zod";

/**
 * Example data
 * {
    "id": 6785,        //mã định danh duy nhất của giao dịch (Casso quy định)
    "tid": "BANK_REF_ID", //Mã giao dịch từ phía ngân hàng
    "description": "giao dich thu nghiem", // nội dung giao dịch
    "amount": 79000, // số tiền giao dịch
    "cusum_balance": 20079000,  // số tiền còn lại sau giao dịch
    "when": "2020-10-14 00:34:57",    // thời gian ghi có giao dịch ở ngân hàng
    "bank_sub_acc_id": "123456789",   // Mã tài khoản ngân hàng mà giao dịch thuộc về
    "subAccId" :  "123456789"       // tương tự field bank_sub_acc_id, nhằm tương thích với code cũ.
    "virtualAccount": "", // tài khoản ảo
    "virtualAccountName": "", // tên tài khoản ảo
    "corresponsiveName": "", // tên tài khoản đối ứng
    "corresponsiveAccount": "", // tài khoản đối ứng
    "corresponsiveBankId": "", // mã ngân hàng đối ứng
    "corresponsiveBankName": "" // tên ngân hàng đối ứng
}
*/
export const webhookPaymentSchema = z.object({
  // body: z.object({
  //   error: z.number(),
  //   data: z.array(
  //     z.object({
  //       id: z.number(),
  //       when: z.coerce.date(),
  //       amount: z.number(),
  //       description: z.string(),
  //       cusum_balance: z.number(),
  //       tid: z.string(),
  //       subAccId: z.string(),
  //       bank_sub_acc_id: z.string(),
  //       virtualAccount: z.string(),
  //       virtualAccountName: z.string(),
  //       corresponsiveName: z.string(),
  //       corresponsiveAccount: z.string(),
  //       corresponsiveBankId: z.string(),
  //       corresponsiveBankName: z.string(),
  //     })
  //   ),
  // }),
  body: z.object({
    token: z.string(),
    payment: z.object({
      transaction_id: z.string(),
      amount: z.number(),
      content: z.string(),
      date: z.coerce.date(),
      account_receiver: z.string(),
      gate: z.enum(["MBBANK", "ACBBANK"]),
    }),
  }),
});

export type WebhookPaymentInput = z.infer<typeof webhookPaymentSchema>["body"];

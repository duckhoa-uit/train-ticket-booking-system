import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@ttbs/lib/cn";
import { identificationRegex, vietnamesePhoneNumberRegex } from "@ttbs/lib/constants";
import { Button, CheckboxField, Form, TextField } from "@ttbs/ui";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ttbs/ui/components/form/inputs/Form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ttbs/ui/components/table/TableNew";

import { currencyFormatter } from "@/utils/currency";

import { SelectedSeatText } from "../cart/cart-item";
import { useCart } from "../cart/context";

const TABLE_HEAD_ITEMS = [
  {
    key: 0,
    title: "Họ tên",
  },
  {
    key: 1,
    title: "Thông tin chỗ",
  },
  {
    key: 2,
    title: "Giá vé",
  },
  {
    key: 7,
    title: "",
  },
] as const;

const orderFormSchema = z.object({
  buyerName: z.string().min(5, "Độ dài tên quá ngắn"),
  buyerIdentification: z.string().regex(identificationRegex, "Mã không hợp lệ"),
  buyerPhone: z.string().regex(vietnamesePhoneNumberRegex, "Số điện thoại không hợp lệ"),
  buyerEmail: z.string().email().or(z.literal("")),
  tickets: z.array(
    z.object({
      seatId: z.number(),
      fromStationId: z.number(),
      toStationId: z.number(),
      amount: z.number(),
      userName: z.string().min(5, "Độ dài tên quá ngắn"),
      userIdentification: z.string().regex(identificationRegex, "Mã không hợp lệ"),
    })
  ),
  agreeRule: z.boolean().refine((bool) => bool == true, {
    message: "Bạn cần xác nhận đã đồng ý với quy định trên",
  }),
});

type OrderFormValues = z.infer<typeof orderFormSchema>;

const OrderForm = (
  props: { onSubmit: () => void } & Omit<JSX.IntrinsicElements["form"], "onSubmit" | "ref">
) => {
  const { onSubmit, ...rest } = props;
  const {
    lineItems,
    actions: { modifyById, setBuyer },
  } = useCart();

  const formMethods = useForm<OrderFormValues>({
    defaultValues: {
      tickets: lineItems.map((i) => ({
        seatId: i.id,
        amount: i.amount,
        fromStationId: i.fromStationId,
        toStationId: i.toStationId,
        userIdentification: i.userIdentification ?? "",
        userName: i.userName ?? "",
      })),
      buyerName: "",
      buyerIdentification: "",
      buyerPhone: "",
      buyerEmail: "",
      agreeRule: false,
    },
    resolver: zodResolver(orderFormSchema),
  });
  const handleSubmit = (values: OrderFormValues) => {
    console.log("🚀 ~ file: checkout-input.tsx:204 ~ handleSubmit ~ values:", values);
    onSubmit();

    setBuyer({
      email: values.buyerEmail ?? "",
      identification: values.buyerIdentification,
      name: values.buyerName,
      phone: values.buyerPhone,
    });

    values.tickets.forEach((ticket) => {
      modifyById(ticket.seatId, ticket);
    });
  };

  return (
    <Form form={formMethods} handleSubmit={handleSubmit} {...rest}>
      <div className="flex flex-col">
        <div className="md:overflow-x-auto">
          <Table className="border md:w-full">
            <TableHeader className="">
              <TableRow className=" text-center text-white">
                {TABLE_HEAD_ITEMS.map((item) => (
                  <TableHead className="min-w-28 text-center" key={item.key}>
                    {item.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineItems.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">
                    <div className="flex flex-col">
                      <FormField
                        control={formMethods.control}
                        name={`tickets.${idx}.userName`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <TextField
                                {...field}
                                required
                                labelSrOnly
                                className={cn("group-hover:border-emphasis mb-0")}
                                placeholder="Thông tin hành khách"
                                addOnLeading="Họ tên"
                                addOnFilled={false}
                                addOnClassname="hover:border-default w-24 group-hover:border-emphasis"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={formMethods.control}
                        name={`tickets.${idx}.userIdentification`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <TextField
                                {...field}
                                required
                                labelSrOnly
                                placeholder="Số CCCD/CMND/ Hộ chiếu"
                                addOnLeading="Số giấy tờ"
                                addOnFilled={false}
                                addOnClassname="hover:border-default w-24 group-hover:border-emphasis"
                                className={cn("group-hover:border-emphasis mb-0")}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <SelectedSeatText seat={item} className="items-center" />
                  </TableCell>
                  <TableCell className="text-center">{currencyFormatter.format(item.amount)}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="button" color="destructive">
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h3 className="text-attention my-5 text-lg font-medium">Thông tin người đặt vé</h3>
          <p className="mb-5">
            Quý khách vui lòng điền đầy đủ và chính xác các thông tin về người mua vé dưới đây. Các thông tin
            sẽ được sử dụng để xác minh người mua vé tại ga trước khi lên tàu theo đúng quy định của Tổng công
            ty Đường sắt Việt Nam
          </p>
          <div className="grid grid-cols-1 gap-x-10 gap-y-3 md:grid-cols-2">
            <div className="w-full flex-1 md:flex md:items-center md:justify-between">
              <FormField
                control={formMethods.control}
                name="buyerName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mt-2">
                      Họ và tên<span className="text-error ml-1 font-medium">*</span>
                    </FormLabel>
                    <FormControl>
                      <TextField {...field} required labelSrOnly placeholder="Họ và tên" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-1 md:flex md:items-center md:justify-between lg:mx-0">
              <FormField
                control={formMethods.control}
                name="buyerIdentification"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mt-2">
                      Số CCCD/CMND/Hộ chiếu<span className="text-error ml-1 font-medium">*</span>
                    </FormLabel>
                    <FormControl>
                      <TextField {...field} required labelSrOnly placeholder="Số CCCD/CMND/Hộ chiếu" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-1 md:flex md:items-center md:justify-between lg:mx-0">
              <FormField
                control={formMethods.control}
                name="buyerEmail"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mt-2">Email</FormLabel>
                    <FormControl>
                      <TextField {...field} labelSrOnly placeholder="Email" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex-1 md:flex md:items-center md:justify-between lg:mx-0">
              <FormField
                control={formMethods.control}
                name="buyerPhone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="mt-2">
                      Số di động<span className="text-error ml-1 font-medium">*</span>
                    </FormLabel>
                    <FormControl>
                      <TextField {...field} required labelSrOnly placeholder="Số di động" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="my-5 flex h-max items-start justify-center gap-5">
            <FormField
              control={formMethods.control}
              name="agreeRule"
              render={({ field: { onBlur, onChange, value } }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CheckboxField
                      checked={value}
                      onBlur={onBlur}
                      description="Tôi đã đọc kỹ và đồng ý tuân thủ tất cả các quy định mua vé trực tuyến, các chương trình khuyến mại của Tổng công ty đường sắt Việt Nam và chịu trách nhiệm về tính xác thực của các thông tin trên"
                      onChange={(e) => onChange(e.target.checked)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default OrderForm;

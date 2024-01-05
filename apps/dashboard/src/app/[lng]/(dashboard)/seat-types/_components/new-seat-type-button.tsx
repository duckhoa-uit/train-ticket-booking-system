"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import { HttpError } from "@ttbs/lib/http-error";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  Form,
  TextField,
} from "@ttbs/ui";
import { Plus } from "@ttbs/ui/components/icons";

import { post } from "@/lib/common/fetch";

const newSeatTypeFormSchema = z.object({
  name: z.string().trim().min(4),
  floors: z.number(),
  seatsPerRow: z.number(),
});

export type NewSeatTypeFormValues = z.infer<typeof newSeatTypeFormSchema>;

export function NewSeatTypeButton({ name = "new-seat-type" }: { name?: string }) {
  const [open, setOpen] = useState(false);

  const { t } = useClientTranslation();
  const queryClient = useQueryClient();

  const form = useForm<NewSeatTypeFormValues>({ resolver: zodResolver(newSeatTypeFormSchema) });

  const createMutation = useMutation({
    mutationFn: async (values: NewSeatTypeFormValues) => {
      const res = await post(`${env.NEXT_PUBLIC_API_BASE_URI}/api/seat-types`, values);

      if (res.error) {
        toast.error(res.error.message);
      } else {
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["seat-types"] });
        toast.success(t("seat_type_created_successfully", { seatType: res.data.name }));
      }
    },
    onError(err) {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        toast.error(message);
      }
    },
  });

  const handleCloseDialog = (open: boolean) => {
    form.reset();
    setOpen(open);
  };

  return (
    <Dialog
      name={name}
      clearQueryParamsOnClose={["copy-seat-type-id"]}
      open={open}
      onOpenChange={handleCloseDialog}
    >
      <DialogTrigger asChild>
        <Button variant="fab" StartIcon={Plus}>
          {t("new")}
        </Button>
      </DialogTrigger>
      <DialogContent title={t("add_new_seat_type")}>
        <Form
          form={form}
          handleSubmit={(values) => {
            createMutation.mutate(values);
          }}
          className="flex flex-col gap-3"
        >
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <TextField
                label={t("seat_type_name")}
                type="text"
                required
                placeholder={t("default_seat_type_name")}
                {...field}
              />
            )}
          />
          <Controller
            name="floors"
            control={form.control}
            render={({ field }) => (
              <TextField
                required
                type="number"
                label={t("seat_type_floors")}
                placeholder={t("default_seat_type_floors")}
                hint={t("seat_type_floors_hint")}
                {...field}
                onChange={(e) => {
                  field.onChange(Math.abs(Number(e.target.value)));
                }}
              />
            )}
          />
          <Controller
            name="seatsPerRow"
            control={form.control}
            render={({ field }) => (
              <TextField
                required
                type="number"
                label={t("seat_type_seat_per_row")}
                placeholder={t("default_seat_type_seat_per_row")}
                hint={t("seat_type_seat_per_row_hint")}
                {...field}
                onChange={(e) => {
                  field.onChange(Math.abs(Number(e.target.value)));
                }}
              />
            )}
          />
          <DialogFooter>
            <DialogClose />
            <Button type="submit" loading={createMutation.isPending}>
              {t("save")}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  InputField,
  TextAreaField,
} from "@ttbs/ui";
import { Plus } from "@ttbs/ui/components/icons";

import { post } from "@/lib/common/fetch";

type CreateStationFormValues = {
  name: string;
  code: string;
  description: string;
};
export function NewStationButton({ name = "new-station" }: { name?: string }) {
  const [open, setOpen] = useState(false);

  const { t } = useClientTranslation();

  const form = useForm<CreateStationFormValues>();
  const { register } = form;

  const createMutation = useMutation({
    mutationFn: async (values: CreateStationFormValues) => {
      const res = await post(`${env.NEXT_PUBLIC_API_BASE_URI}/api/stations`, values);

      if (res.error) {
        toast.error(res.error.message);
      } else {
        setOpen(false);

        toast.success(t("station_created_successfully", { stationName: res.data.name }));
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
      clearQueryParamsOnClose={["copy-station-id"]}
      open={open}
      onOpenChange={handleCloseDialog}
    >
      <DialogTrigger asChild>
        <Button variant="fab" StartIcon={Plus}>
          {t("new")}
        </Button>
      </DialogTrigger>
      <DialogContent title={t("add_new_station")}>
        <Form
          form={form}
          handleSubmit={(values) => {
            createMutation.mutate(values);
          }}
        >
          <InputField
            label={t("station_code")}
            type="text"
            id="name"
            required
            placeholder={t("default_station_code")}
            {...register("code")}
          />
          <InputField
            label={t("station_name")}
            type="text"
            id="name"
            required
            placeholder={t("default_station_name")}
            {...register("name")}
          />
          <TextAreaField
            label={t("station_description")}
            id="description"
            placeholder={t("default_station_description")}
            {...register("description")}
          />
          <DialogFooter>
            <DialogClose />
            <Button type="submit" loading={createMutation.isPending}>
              {t("submit")}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

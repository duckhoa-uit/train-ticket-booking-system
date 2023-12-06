"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
} from "@ttbs/ui";
import { Plus } from "@ttbs/ui/components/icons";

import { post } from "@/lib/common/fetch";
import type { ResponseError } from "@/types";

type CreateStationFormValues = {
  name: string;
};
export function NewJourneyButton({ name = "new-journey" }: { name?: string }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const { t } = useClientTranslation();

  const form = useForm<CreateStationFormValues>();
  const { register } = form;

  const createMutation = useMutation({
    mutationFn: async (values: CreateStationFormValues) => {
      const res = await post(`${env.NEXT_PUBLIC_API_BASE_URI}/api/journeys`, {
        ...values,
        journeyStations: [],
      });
      console.log("🚀 ~ file: new-journey-button.tsx:40 ~ mutationFn: ~ res:", res);

      if (res.error) {
        const respError = res.error as ResponseError;

        if (Array.isArray(respError.errors)) {
          respError.errors.forEach((err) => {
            if (err.path && Array.isArray(err.path) && err.message) {
              const fieldName = err.path[err.path.length - 1];
              form.setError(fieldName as keyof CreateStationFormValues, {
                message: err.message,
              });
            }
          });
        } else {
          toast.error(respError.message);
        }
      } else {
        setOpen(false);
        void router.push(`/journeys/${res.data.id}`);

        toast.success(t("journey_created_successfully", { journeyName: res.data.name }));
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
    <Dialog name={name} open={open} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild>
        <Button variant="fab" StartIcon={Plus}>
          {t("new")}
        </Button>
      </DialogTrigger>
      <DialogContent title={t("add_new_journey")}>
        <Form
          form={form}
          handleSubmit={(values) => {
            createMutation.mutate(values);
          }}
        >
          <InputField
            label={t("journey_name")}
            type="text"
            id="name"
            required
            placeholder={t("default_journey_name")}
            {...register("name")}
          />
          <DialogFooter>
            <DialogClose />
            <Button type="submit" loading={createMutation.isPending}>
              {t("continue")}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

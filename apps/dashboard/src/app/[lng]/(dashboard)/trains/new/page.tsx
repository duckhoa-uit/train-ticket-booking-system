"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import { HttpError } from "@ttbs/lib/http-error";
import { Button, Form } from "@ttbs/ui";

import Shell from "@/components/layout/common";
import { post } from "@/lib/common/fetch";
import type { ResponseError } from "@/types";

import { TrainBasicInfo } from "../_components/train-basic-info";
import { TrainCarriages } from "../_components/train-carriages";

type NewTrainPageProps = {
  params: {
    lng: string;
  };
};

export type NewTrainFormValues = {
  code: string;
  name: string;
  carriages: {
    order: number;
    code: string;
    name: string;
    seatTypeId: number | null;
    seatsPerCabin: number;
    numOfCabins?: number;
  }[];
};

const NewTrainPage = (_: NewTrainPageProps) => {
  const { t } = useClientTranslation();
  const router = useRouter();

  const queryClient = useQueryClient();
  const form = useForm<NewTrainFormValues>();

  const createMutation = useMutation({
    mutationFn: async (values: NewTrainFormValues) => {
      const res = await post(`${env.NEXT_PUBLIC_API_BASE_URI}/api/trains`, values);

      if (res.error) {
        const respError = res.error as ResponseError;

        if (Array.isArray(respError.errors)) {
          respError.errors.forEach((err) => {
            if (err.path && Array.isArray(err.path) && err.message) {
              const fieldName = err.path[err.path.length - 1];
              form.setError(fieldName as keyof NewTrainFormValues, {
                message: err.message,
              });
            }
          });
        } else {
          toast.error(respError.message);
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["trains"] });

        toast.success(
          t("train_created_successfully", {
            trainName: res.data.name,
          })
        );

        router.replace("/trains");
      }
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        toast.error(message);
      }
    },
  });

  return (
    <Shell
      backPath="/trains"
      title={t("add_train")}
      heading={t("add_train")}
      CTA={
        <div className="flex items-center justify-end">
          <Button
            className="ml-4 lg:ml-0"
            type="submit"
            form="new-train-form"
            loading={createMutation.isPending}
          >
            {t("save")}
          </Button>
        </div>
      }
    >
      <div className="mt-4 w-full md:mt-0">
        <Form
          form={form}
          id="new-train-form"
          handleSubmit={async (values) => createMutation.mutate(values)}
          className="flex flex-col sm:mx-0 xl:flex-row xl:space-x-6"
        >
          <div className="flex-1 flex-row xl:mr-0">
            <div className="border-subtle mb-6 rounded-md border">
              <TrainBasicInfo />
              <TrainCarriages />
            </div>
          </div>

          <div className="min-w-40 col-span-3 hidden space-y-2 md:block lg:col-span-1">
            <div className="xl:max-w-80 w-full pr-4 sm:ml-0 sm:mr-36 sm:p-0">
              {/* <div className="w-72">ABC</div> */}
            </div>
          </div>
        </Form>
      </div>
    </Shell>
  );
};

export default NewTrainPage;

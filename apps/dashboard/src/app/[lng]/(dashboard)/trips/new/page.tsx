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

import { TripBasicInfo } from "../_components/trip-basic-info";
import { TripTimelines } from "../_components/trip-timelines";

type NewTripPageProps = {
  params: {
    lng: string;
  };
};

export type NewTripFormValues = {
  name: string;
  journeyId: number | null;
  trainId: number | null;
  timelines: {
    journeyStationId: number;
    arrivalDate: Date | null;
    departDate: Date | null;
    prices?: {
      seatTypeId: number;
      departStationId: number;
      arrivalStationId: number;
      amount: number | null;
    }[];
  }[];
};

const NewTripPage = (_: NewTripPageProps) => {
  const { t } = useClientTranslation();
  const router = useRouter();

  const queryClient = useQueryClient();
  const form = useForm<NewTripFormValues>();

  const createMutation = useMutation({
    mutationFn: async (values: NewTripFormValues) => {
      const res = await post(`${env.NEXT_PUBLIC_API_BASE_URI}/api/trips`, values);

      if (res.error) {
        const respError = res.error as ResponseError;

        if (Array.isArray(respError.errors)) {
          respError.errors.forEach((err) => {
            if (err.path && Array.isArray(err.path) && err.message) {
              const fieldName = err.path[err.path.length - 1];
              form.setError(fieldName as keyof NewTripFormValues, {
                message: err.message,
              });
            }
          });
        } else {
          toast.error(respError.message);
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["trips"] });

        toast.success(
          t("trip_created_successfully", {
            tripName: res.data.name,
          })
        );

        router.replace("/trips");
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
      backPath="/trips"
      title={t("add_trip")}
      heading={t("add_trip")}
      CTA={
        <div className="flex items-center justify-end">
          <Button
            className="ml-4 lg:ml-0"
            type="submit"
            form="new-trip-form"
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
          id="new-trip-form"
          handleSubmit={async (values) => {
            console.log("🚀 ~ file: page.tsx:114 ~ handleSubmit={ ~ values:", values);
            createMutation.mutate(values);
          }}
          className="flex flex-col sm:mx-0 xl:flex-row xl:space-x-6"
        >
          <div className="flex-1 flex-row xl:mr-0">
            <div className="border-subtle mb-6 rounded-md border">
              <TripBasicInfo />
              <TripTimelines />
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

export default NewTripPage;

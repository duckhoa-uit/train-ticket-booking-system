"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import { HttpError } from "@ttbs/lib/http-error";
import type { Journey, JourneyStation } from "@ttbs/prisma";
import { Button, ConfirmationDialogContent, Dialog, DialogTrigger, Form, VerticalDivider } from "@ttbs/ui";
import { Trash } from "@ttbs/ui/components/icons";

import EditableHeading from "@/components/editable-heading";
import Shell from "@/components/layout/common";
import { delete_, get, patch } from "@/lib/common/fetch";
import type { ResponseError } from "@/types";

import { JourneyStations } from "./journey-stations";

type JourneyDetailsPageProps = {
  params: {
    lng: string;
    journeyId: string;
  };
};

export type UpdateJourneyFormValues = {
  name: string;
  journeyStations: {
    stationId: number;
    order: number;
  }[];
};

const JourneyDetailsPage = ({ params: { journeyId } }: JourneyDetailsPageProps) => {
  const { t } = useClientTranslation();
  const router = useRouter();

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const {
    data: journey,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["journey", journeyId],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/journeys/${journeyId}`);
      if (res.error) throw new Error(res.error);

      return res.data as Journey & { journeyStations: JourneyStation[] };
    },
  });
  useEffect(() => {
    if (status === "error") return notFound();
  }, [status]);

  const form = useForm<UpdateJourneyFormValues>({
    values: journey && {
      name: journey.name,
      journeyStations: (journey.journeyStations || [])
        .sort((a, b) => a.order - b.order)
        .map((_) => ({
          order: _.order,
          stationId: _.stationId,
        })),
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: UpdateJourneyFormValues) => {
      const res = await patch(`${env.NEXT_PUBLIC_API_BASE_URI}/api/journeys/${journeyId}`, values);

      if (res.error) {
        const respError = res.error as ResponseError;

        if (Array.isArray(respError.errors)) {
          respError.errors.forEach((err) => {
            if (err.path && Array.isArray(err.path) && err.message) {
              const fieldName = err.path[err.path.length - 1];
              form.setError(fieldName as keyof UpdateJourneyFormValues, {
                message: err.message,
              });
            }
          });
        } else {
          toast.error(respError.message);
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["journeys"] });
        queryClient.invalidateQueries({ queryKey: ["journey", journeyId] });
        toast.success(
          t("journey_updated_successfully", {
            journeyName: res.data.name,
          })
        );
      }
    },
    onError: (err) => {
      if (err instanceof HttpError) {
        const message = `${err.statusCode}: ${err.message}`;
        toast.error(message);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await delete_(`${env.NEXT_PUBLIC_API_BASE_URI}/api/journeys/${journeyId}`);
      console.log("🚀 ~ file: page.tsx:53 ~ mutationFn: ~ res:", res);

      queryClient.invalidateQueries({ queryKey: ["journeys"] });

      if (res.error) {
        const respError = res.error as ResponseError;
        toast.error(respError.message);
      } else {
        toast.success(t("journey_deleted_successfully"));
        router.push("/journeys");
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
      backPath="/journeys"
      title={journey?.name ? `${journey.name} | ${t("journeys")}` : t("journeys")}
      heading={
        <Controller
          control={form.control}
          name="name"
          render={({ field }) => <EditableHeading isReady={!isLoading} {...field} />}
        />
      }
      CTA={
        <div className="flex items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                StartIcon={Trash}
                variant="icon"
                color="destructive"
                aria-label={t("delete")}
                className="hidden sm:inline"
              />
            </DialogTrigger>
            <ConfirmationDialogContent
              isLoading={deleteMutation.isPending}
              variety="danger"
              title={t("delete_schedule")}
              confirmBtnText={t("delete")}
              loadingText={t("delete")}
              onConfirm={() => {
                journeyId && deleteMutation.mutate();
              }}
            >
              {t("delete_schedule_description")}
            </ConfirmationDialogContent>
          </Dialog>
          <VerticalDivider className="hidden sm:inline" />
          <div className="border-default border-l-2" />
          <Button
            className="ml-4 lg:ml-0"
            type="submit"
            form="availability-form"
            loading={updateMutation.isPending}
          >
            {t("save")}
          </Button>
        </div>
      }
    >
      <div className="mt-4 w-full md:mt-0">
        <Form
          form={form}
          id="availability-form"
          handleSubmit={async (values) => journeyId && updateMutation.mutate(values)}
          className="flex flex-col sm:mx-0 xl:flex-row xl:space-x-6"
        >
          <div className="flex-1 flex-row xl:mr-0">
            <div className="border-subtle mb-6 rounded-md border">
              <JourneyStations />
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

export default JourneyDetailsPage;

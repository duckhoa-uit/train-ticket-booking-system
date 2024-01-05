"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import dayjs from "@ttbs/lib/dayjs";
import { HttpError } from "@ttbs/lib/http-error";
import type { SeatType } from "@ttbs/prisma";
import {
  Button,
  ConfirmationDialogContent,
  Dialog,
  DialogTrigger,
  Form,
  VerticalDivider,
} from "@ttbs/ui";
import { Trash } from "@ttbs/ui/components/icons";

import EditableHeading from "@/components/editable-heading";
import Shell from "@/components/layout/common";
import { delete_, get, patch } from "@/lib/common/fetch";
import type { ResponseError } from "@/types";
import type {
  JourneyItemDetailsApiResponse,
  TrainItemDetailsApiResponse,
  TripItemDetailsApiResponse,
} from "@/types";

import { TripBasicInfo } from "../_components/trip-basic-info";
import { TripTimelines } from "../_components/trip-timelines";

type TripDetailsPageProps = {
  params: {
    lng: string;
    tripId: string;
  };
};

export type UpdateTripFormValues = {
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

const TripDetailsPage = ({ params: { tripId } }: TripDetailsPageProps) => {
  const { t } = useClientTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: trip,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["trips", tripId],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/trips/${tripId}`,
      );
      if (res.error) throw new Error(res.error);

      return res.data as TripItemDetailsApiResponse;
    },
  });

  const { data: selectedJourney } = useQuery({
    queryKey: ["journeys", trip?.journeyId],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/journeys/${trip?.journeyId}`,
      );
      const journey = res.data as JourneyItemDetailsApiResponse;

      return {
        ...journey,
        journeyStations: journey.journeyStations.sort(
          (a, b) => a.order - b.order,
        ),
      };
    },
    enabled: !!trip,
  });

  const { data: selectedTrain } = useQuery({
    queryKey: ["trains", trip?.train.id],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/trains/${trip?.train.id}`,
      );
      return res.data as TrainItemDetailsApiResponse;
    },
    enabled: !!trip,
  });

  const selectedTrainSeatTypes = useMemo(
    () =>
      selectedTrain
        ? selectedTrain.carriages.reduce<SeatType[]>((prev, curr) => {
            const index = prev.findIndex((item) => item.id === curr.id);
            if (index < 0) return [...prev, curr.seatType];

            return prev;
          }, [])
        : [],
    [selectedTrain],
  );

  useEffect(() => {
    if (status === "error") return notFound();
  }, [status]);

  const form = useForm<UpdateTripFormValues>({
    values: trip && {
      name: trip.name ?? "",
      journeyId: trip.journeyId,
      trainId: trip.trainId,
      timelines: (trip.timelines || [])
        .sort((a, b) => a.journeyStation.order - b.journeyStation.order)
        .map((timeline, idx) => {
          if (
            idx + 1 === trip.timelines.length ||
            !selectedTrainSeatTypes.length ||
            !selectedJourney
          )
            return {
              arrivalDate: dayjs(timeline.arrivalDate).toDate(),
              departDate: dayjs(timeline.departDate).toDate(),
              journeyStationId: timeline.journeyStation.id,
            };

          const prices = trip.pricings.filter(
            (price) =>
              price.departStationId === timeline.journeyStation.stationId,
          );

          return {
            arrivalDate: dayjs(timeline.arrivalDate).toDate(),
            departDate: dayjs(timeline.departDate).toDate(),
            journeyStationId: timeline.journeyStation.id,
            prices,
          };
        }),
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values: UpdateTripFormValues) => {
      const res = await patch(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/trips/${tripId}`,
        values,
      );

      if (res.error) {
        const respError = res.error as ResponseError;

        if (Array.isArray(respError.errors)) {
          respError.errors.forEach((err) => {
            if (err.path && Array.isArray(err.path) && err.message) {
              const fieldName = err.path[err.path.length - 1];
              form.setError(fieldName as keyof UpdateTripFormValues, {
                message: err.message,
              });
            }
          });
        } else {
          toast.error(respError.message);
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ["trips"] });
        queryClient.invalidateQueries({ queryKey: ["trips", tripId] });
        toast.success(
          t("trip_updated_successfully", {
            tripName: res.data.name,
          }),
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
      const res = await delete_(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/trips/${tripId}`,
      );
      console.log("🚀 ~ file: page.tsx:53 ~ mutationFn: ~ res:", res);

      queryClient.invalidateQueries({ queryKey: ["trips"] });

      if (res.error) {
        const respError = res.error as ResponseError;
        toast.error(respError.message);
      } else {
        toast.success(t("trip_deleted_successfully"));
        router.push("/trips");
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
      title={trip?.name ? `${trip.name} | ${t("trips")}` : t("trips")}
      heading={
        <Controller
          control={form.control}
          name="name"
          render={({ field }) => (
            <EditableHeading isReady={!isLoading} {...field} />
          )}
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
                tripId && deleteMutation.mutate();
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
            form="update-trip-form"
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
          id="update-trip-form"
          handleSubmit={async (values) => updateMutation.mutate(values)}
          className="flex flex-col sm:mx-0 xl:flex-row xl:space-x-6"
        >
          <div className="flex-1 flex-row xl:mr-0">
            <div className="border-subtle mb-6 rounded-md border">
              <TripBasicInfo />
              <TripTimelines />
            </div>
          </div>

          <div className="col-span-3 hidden min-w-40 space-y-2 md:block lg:col-span-1">
            <div className="w-full pr-4 sm:ml-0 sm:mr-36 sm:p-0 xl:max-w-80">
              {/* <div className="w-72">ABC</div> */}
            </div>
          </div>
        </Form>
      </div>
    </Shell>
  );
};

export default TripDetailsPage;

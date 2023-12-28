import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import { cn } from "@ttbs/lib/cn";
import type { Carriage, Journey, JourneyStation, SeatType, Station, Train } from "@ttbs/prisma";
import { DateTimePicker, Label, TextField } from "@ttbs/ui";

import { get } from "@/lib/common/fetch";

import type { NewTripFormValues } from "../new/page";

export const TripTimelines = ({ disabled }: { disabled?: boolean }) => {
  const { t } = useClientTranslation();

  const { watch, setValue, control } = useFormContext<NewTripFormValues>();

  const selectedJourneyId = watch("journeyId");
  const selectedTrainId = watch("trainId");

  const { data: selectedJourney } = useQuery({
    queryKey: ["journeys", selectedJourneyId],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/journeys/${selectedJourneyId}`);
      const journey = res.data as Journey & { journeyStations: Array<JourneyStation & { station: Station }> };

      return { ...journey, journeyStations: journey.journeyStations.sort((a, b) => a.order - b.order) };
    },
    enabled: !!selectedJourneyId,
  });

  const { data: selectedTrain } = useQuery({
    queryKey: ["trains", selectedTrainId],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/trains/${selectedTrainId}`);
      return res.data as Train & { carriages: Array<Carriage & { seatType: SeatType }> };
    },
    enabled: !!selectedTrainId,
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
    [selectedTrain]
  );

  useEffect(() => {
    if (selectedJourney?.id && selectedTrainSeatTypes.length) {
      setValue(
        "timelines",
        selectedJourney.journeyStations.map((journeyStation, index) => {
          if (index + 1 === selectedJourney.journeyStations.length || !selectedTrainSeatTypes.length)
            return {
              journeyStationId: journeyStation.id,
              arrivalDate: new Date(),
              departDate: new Date(),
            };

          const prices = selectedTrainSeatTypes.map((seatType) => ({
            amount: null,
            seatTypeId: seatType.id,
            departStationId: journeyStation.station.id,
            arrivalStationId: selectedJourney.journeyStations[index + 1].station.id,
          }));

          return {
            journeyStationId: journeyStation.id,
            arrivalDate: new Date(),
            departDate: new Date(),
            prices,
          };
        })
      );
    }
  }, [selectedJourney, selectedTrainSeatTypes]);

  return (
    <div className="p-6">
      <h3 className="text-emphasis mb-4 font-medium leading-6">{t("trip_stations")}</h3>
      <div className="space-y-2">
        <ol className="border-subtle relative border-s">
          {(selectedJourney?.journeyStations ?? []).map((journeyStation, idx) => (
            <li className="mb-10 ms-4" key={journeyStation.id}>
              <div className="border-subtle bg-subtle absolute -start-1.5 mt-1.5 h-3 w-3 rounded-full border" />
              <span className="mb-1 font-normal leading-none">
                {idx + 1}. {journeyStation.station.name}
              </span>

              <div className="mt-2 grid grid-cols-2">
                <div>
                  <Label htmlFor={`timelines.${idx}.arrivalDate`}>Arrival Date</Label>
                  <Controller
                    name={`timelines.${idx}.arrivalDate`}
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return <DateTimePicker date={value ?? new Date()} setDate={onChange} />;
                    }}
                  />
                </div>
                <div>
                  <Label htmlFor={`timelines.${idx}.departDate`}>Depart Date</Label>
                  <Controller
                    name={`timelines.${idx}.departDate`}
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return <DateTimePicker date={value ?? new Date()} setDate={onChange} />;
                    }}
                  />
                </div>
              </div>

              {selectedJourney && idx + 1 < +selectedJourney.journeyStations.length && (
                <>
                  <Label className="mt-5">Pricing</Label>
                  <ol className={cn("mt-3 flex flex-col gap-2")}>
                    {selectedTrainSeatTypes.map((type, index) => (
                      <li className="flex items-center gap-3 rounded-md p-2" key={type.id}>
                        <div className="min-w-20 mb-3 text-sm">- {type.name}</div>
                        <Controller
                          name={`timelines.${idx}.prices.${index}.amount`}
                          control={control}
                          render={({ field: { ref, onBlur, value, onChange } }) => {
                            return (
                              <TextField
                                ref={ref}
                                onBlur={onBlur}
                                required
                                value={value ?? undefined}
                                label={t("price")}
                                type="number"
                                disabled={disabled}
                                addOnSuffix={<span>VND</span>}
                                onChange={(e) => {
                                  !isNaN(e.target.valueAsNumber)
                                    ? onChange(e.target.valueAsNumber)
                                    : onChange(null);
                                }}
                              />
                            );
                          }}
                        />
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

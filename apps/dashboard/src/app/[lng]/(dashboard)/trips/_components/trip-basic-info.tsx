import { useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import type { Journey, Train } from "@ttbs/prisma";
import { Label, Select, TextField } from "@ttbs/ui";

import { get } from "@/lib/common/fetch";

import type { NewTripFormValues } from "../new/page";

export const TripBasicInfo = ({ disabled }: { disabled?: boolean }) => {
  const { t } = useClientTranslation();

  const { control } = useFormContext<NewTripFormValues>();

  const { data: journeys } = useQuery({
    queryKey: ["journeys"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/journeys`);
      return res.data as Journey[];
    },
  });

  const journeyOpts = (journeys ?? []).map((s) => ({
    label: s.name,
    value: s.id,
  }));

  const { data: trains } = useQuery({
    queryKey: ["trains"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/trains`);
      return res.data as Train[];
    },
  });

  const trainsOpts = (trains ?? []).map((s) => ({
    label: s.name,
    value: s.id,
  }));

  return (
    <div className="p-6">
      <h3 className="text-emphasis mb-4 font-medium leading-6">{t("basic_info")}</h3>
      <div className="space-y-2">
        <div className="grid w-full grid-cols-2 gap-3">
          <div className="col-span-2">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange, ref, onBlur } }) => {
                return (
                  <TextField
                    ref={ref}
                    onBlur={onBlur}
                    required
                    value={value}
                    label={t("carriage_code")}
                    disabled={disabled}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                );
              }}
            />
          </div>
          <div>
            <Label htmlFor="journeyId">Journey</Label>
            <Controller
              name="journeyId"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    onBlur={field.onBlur}
                    isSearchable
                    required
                    isDisabled={disabled}
                    placeholder={t("select")}
                    options={journeyOpts}
                    onChange={(selected) => {
                      field.onChange(selected?.value || null);
                    }}
                    className="block w-full min-w-0 flex-1 rounded-sm text-sm"
                    value={journeyOpts.find((opt) => opt.value === field.value)}
                    isMulti={false}
                  />
                );
              }}
            />
          </div>
          <div>
            <Label htmlFor="trainId">Train</Label>
            <Controller
              name="trainId"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    onBlur={field.onBlur}
                    isSearchable
                    required
                    isDisabled={disabled}
                    placeholder={t("select")}
                    options={trainsOpts}
                    onChange={(selected) => {
                      field.onChange(selected?.value || null);
                    }}
                    className="block w-full min-w-0 flex-1 rounded-sm text-sm"
                    value={trainsOpts.find((opt) => opt.value === field.value)}
                    isMulti={false}
                  />
                );
              }}
            />
          </div>
          {/* <div className="mt-2 grid grid-cols-2">
            <div>
              <Label htmlFor="arrivalDate">Arrival Date</Label>
              <Controller
                name="arrivalDate"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return <DateTimePicker date={value ?? new Date()} setDate={onChange} />;
                }}
              />
            </div>
            <div>
              <Label htmlFor="departDate">Depart Date</Label>
              <Controller
                name="departDate"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return <DateTimePicker date={value ?? new Date()} setDate={onChange} />;
                }}
              />
            </div>
          </div> */}
          {/* TODO: arrivalDate; departDate */}
        </div>
      </div>
    </div>
  );
};

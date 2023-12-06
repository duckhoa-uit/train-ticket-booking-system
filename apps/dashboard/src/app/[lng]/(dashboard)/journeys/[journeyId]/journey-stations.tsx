import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { ArrayPath, FieldArrayWithId } from "react-hook-form";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import type { Station } from "@ttbs/prisma";
import { Button, Select, Tooltip } from "@ttbs/ui";
import { Plus, Trash2 } from "@ttbs/ui/components/icons";

import { get } from "@/lib/common/fetch";

import type { UpdateJourneyFormValues } from "./page";

export const JourneyStations = ({ disabled }: { disabled?: boolean }) => {
  const { control } = useFormContext<UpdateJourneyFormValues>();
  const { t } = useClientTranslation();

  const { data: stations } = useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/stations`);
      return res.data as Station[];
    },
  });

  const { remove, append, fields, update } = useFieldArray<UpdateJourneyFormValues, "journeyStations">({
    control,
    name: "journeyStations",
  });

  useEffect(() => {
    const updateOrder = () => {
      fields.forEach((f, idx) => {
        update(idx, {
          ...f,
          order: idx + 1,
        });
      });
    };
    updateOrder();
  }, [fields.length]);

  const handleRemoveItem = (index: number) => {
    remove(index);
  };

  return (
    <div className="p-6">
      <h3 className="text-emphasis mb-4 font-medium leading-6">{t("journey_stations")}</h3>
      <div className="space-y-2">
        <JourneyStationList remove={handleRemoveItem} items={fields} disabled={disabled} />
        <Button
          color="secondary"
          StartIcon={Plus}
          disabled={!stations?.length}
          onClick={() => {
            if (stations) {
              append({
                stationId: stations[0].id,
                order: fields.length + 1,
              });
            }
          }}
        >
          {t("add_journey_station")}
        </Button>
      </div>
    </div>
  );
};

const JourneyStationList = ({
  items,
  remove,
  disabled,
}: {
  remove: (indx: number) => void;
  items: FieldArrayWithId<UpdateJourneyFormValues, ArrayPath<UpdateJourneyFormValues>, "id">[];
  disabled?: boolean;
}) => {
  const { t } = useClientTranslation();
  const { control } = useFormContext();

  const { data: stations } = useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/stations`);
      return res.data as Station[];
    },
  });

  const options = (stations ?? []).map((s) => ({
    label: s.name,
    value: s.id,
  }));

  if (!items.length) {
    return <></>;
  }

  const handleRemoveItem = (index: number) => {
    remove(index);

    // re-order stations
  };

  return (
    <ul className="border-subtle rounded border">
      {items.map((item, index) => (
        <li
          key={`${item.id}_${index}`}
          className="border-subtle flex justify-between border-b px-5 py-4 last:border-b-0"
        >
          <div className="flex items-center">
            <h3 className="text-emphasis text-sm">
              {index + 1}
              {". "}
            </h3>
            <div className="ml-4 w-40">
              <Controller
                name={`journeyStations.${index}.stationId`}
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      isSearchable
                      isDisabled={disabled}
                      placeholder={t("select")}
                      options={options}
                      onChange={(selected) => {
                        field.onChange(selected?.value || null);
                      }}
                      className="block w-full min-w-0 flex-1 rounded-sm text-sm"
                      value={options.find((opt) => opt.value === field.value)}
                      isMulti={false}
                    />
                  );
                }}
              />
            </div>
          </div>
          <div className="flex flex-row-reverse gap-5 space-x-2 rtl:space-x-reverse">
            <Tooltip content="Delete">
              <Button
                className="text-default"
                color="destructive"
                variant="icon"
                StartIcon={Trash2}
                onClick={() => handleRemoveItem(index)}
              />
            </Tooltip>
          </div>
        </li>
      ))}
    </ul>
  );
};

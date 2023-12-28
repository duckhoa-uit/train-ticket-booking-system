import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { FieldArrayWithId } from "react-hook-form";
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { env } from "@ttbs/env";
import { useClientTranslation } from "@ttbs/i18n";
import { cn } from "@ttbs/lib/cn";
import type { SeatType, Station } from "@ttbs/prisma";
import { Button, Label, Select, TextField, Tooltip } from "@ttbs/ui";
import { Plus, Trash2 } from "@ttbs/ui/components/icons";

import { get } from "@/lib/common/fetch";

import type { NewTrainFormValues } from "../new/page";

export const TrainCarriages = ({ disabled }: { disabled?: boolean }) => {
  const { t } = useClientTranslation();

  const { control } = useFormContext<NewTrainFormValues>();
  const { remove, append, fields, update } = useFieldArray<
    NewTrainFormValues,
    "carriages"
  >({
    control,
    name: "carriages",
  });

  const { data: stations } = useQuery({
    queryKey: ["stations"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/stations`);
      return res.data as Station[];
    },
  });

  const { data: seatTypes } = useQuery({
    queryKey: ["seat-types"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/seat-types`);
      return res.data as SeatType[];
    },
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
      <h3 className="text-emphasis mb-4 font-medium leading-6">
        {t("train_carriages")}
      </h3>
      <div className="space-y-2">
        <ul
          className={cn(
            "rounded border",
            fields.length ? "border-subtle" : null,
          )}
        >
          {fields.map((item, index) => (
            <Carriage
              key={item.id}
              item={item}
              index={index}
              disabled={disabled}
              onRemove={handleRemoveItem}
            />
          ))}
        </ul>
        <Button
          color="secondary"
          StartIcon={Plus}
          disabled={!stations?.length}
          onClick={() => {
            if (stations) {
              append({
                order: fields.length + 1,
                code: "",
                name: "",
                seatsPerCabin: 0,
                seatTypeId: seatTypes?.[0]?.id ?? null,
                numOfCabins: 1,
              });
            }
          }}
        >
          {t("add_train_carriage")}
        </Button>
      </div>
    </div>
  );
};

const Carriage = ({
  item,
  index,
  disabled,
  onRemove,
}: {
  item: FieldArrayWithId<NewTrainFormValues, "carriages", "id">;
  index: number;
  disabled?: boolean;
  onRemove: (index: number) => void;
}) => {
  const { t } = useClientTranslation();

  const { control } = useFormContext();

  const fieldValue = useWatch({ control, name: `carriages` });
  const selectedSeatTypeId = fieldValue?.[index]?.seatTypeId;

  const { data: selectedSeatType } = useQuery({
    queryKey: ["seat-types", selectedSeatTypeId],
    queryFn: async () => {
      const res = await get(
        `${env.NEXT_PUBLIC_API_BASE_URI}/api/seat-types/${selectedSeatTypeId}`,
      );
      return res.data as SeatType;
    },
  });

  const { data: seatTypes } = useQuery({
    queryKey: ["seat-types"],
    queryFn: async () => {
      const res = await get(`${env.NEXT_PUBLIC_API_BASE_URI}/api/seat-types`);
      return res.data as SeatType[];
    },
  });

  const options = (seatTypes ?? []).map((s) => ({
    label: s.name,
    value: s.id,
  }));

  return (
    <li
      key={`${item.id}_${index}`}
      className="border-subtle flex justify-between border-b px-5 py-4 last:border-b-0"
    >
      <div className="flex flex-1 items-start">
        <h3 className="text-emphasis min-w-16 mt-3 text-sm">{`Order ${
          index + 1
        } `}</h3>
        <div className="mx-4 grid w-full grid-cols-2 gap-3">
          <div>
            <Label htmlFor={`carriages.${index}.code`}>Code</Label>
            <Controller
              name={`carriages.${index}.code`}
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
            <Label htmlFor={`carriages.${index}.name`}>Name</Label>
            <Controller
              name={`carriages.${index}.name`}
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
          <div className="col-span-2">
            <Label htmlFor={`carriages.${index}.seatTypeId`}>Seat Type</Label>
            <Controller
              name={`carriages.${index}.seatTypeId`}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    onBlur={field.onBlur}
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
          <div>
            <Label htmlFor={`carriages.${index}.seatsPerCabin`}>
              Seats per Cabin
            </Label>
            <Controller
              name={`carriages.${index}.seatsPerCabin`}
              control={control}
              render={({ field: { value, onChange, ref, onBlur } }) => {
                return (
                  <TextField
                    ref={ref}
                    onBlur={onBlur}
                    value={value}
                    type="number"
                    label={t("carriage_code")}
                    disabled={disabled}
                    min={1}
                    onChange={(e) => {
                      !isNaN(e.target.valueAsNumber)
                        ? onChange(e.target.valueAsNumber)
                        : onChange(undefined);
                    }}
                    hint={
                      selectedSeatType
                        ? t("seats_constraint", {
                            seatsPerRow: selectedSeatType.seatsPerRow,
                          })
                        : null
                    }
                  />
                );
              }}
            />
          </div>
          <div>
            <Label htmlFor={`carriages.${index}.numOfCabins`}>
              Cabins per Carriage
            </Label>
            <Controller
              name={`carriages.${index}.numOfCabins`}
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <TextField
                    value={value}
                    type="number"
                    label={t("carriage_code")}
                    disabled={disabled}
                    min={1}
                    onChange={(e) => {
                      !isNaN(e.target.valueAsNumber)
                        ? onChange(e.target.valueAsNumber)
                        : onChange(undefined);
                    }}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center gap-5 space-x-2 rtl:space-x-reverse">
        <Tooltip content="Delete">
          <Button
            className="text-default"
            color="destructive"
            variant="icon"
            StartIcon={Trash2}
            onClick={() => onRemove?.(index)}
          />
        </Tooltip>
      </div>
    </li>
  );
};

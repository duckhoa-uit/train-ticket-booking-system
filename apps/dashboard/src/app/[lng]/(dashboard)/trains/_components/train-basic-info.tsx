import { Controller, useFormContext } from "react-hook-form";

import { useClientTranslation } from "@ttbs/i18n";
import { Label, TextField } from "@ttbs/ui";

import type { NewTrainFormValues } from "../new/page";

export const TrainBasicInfo = ({ disabled }: { disabled?: boolean }) => {
  const { t } = useClientTranslation();

  const { control } = useFormContext<NewTrainFormValues>();

  return (
    <div className="p-6">
      <h3 className="text-emphasis mb-4 font-medium leading-6">{t("basic_info")}</h3>
      <div className="space-y-2">
        <div className="grid w-full grid-cols-2 gap-3">
          <div>
            <Label htmlFor="code">Code</Label>
            <Controller
              name="code"
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
        </div>
      </div>
    </div>
  );
};

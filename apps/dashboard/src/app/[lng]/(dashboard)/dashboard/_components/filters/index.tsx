import { DateSelect } from "./date-select";

export const Filters = () => {
  return (
    <div className="ml-auto mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-between">
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-nowrap sm:justify-start">
        <span />
      </div>

      {/* @NOTE: To be released in next iteration */}
      {/* <ButtonGroup combined containerProps={{ className: "hidden lg:flex mr-2" }}>
         <Tooltip content={t("settings")}>
                  <Button
                    variant="icon"
                    color="secondary"
                    target="_blank"
                    rel="noreferrer"
                    StartIcon={Settings}
                    className="h-[38px]"
                  />
                </Tooltip>
         <Tooltip content={t("download_csv")>
          <Button
            variant="icon"
            color="secondary"
            target="_blank"
            rel="noreferrer"
            StartIcon={Download}
            className="h-[38px]"
          />
        </Tooltip>
      </ButtonGroup> */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:flex-nowrap sm:justify-between">
        <DateSelect />
      </div>
    </div>
  );
};

import { cn } from "@ttbs/lib/cn";

export function Label(props: JSX.IntrinsicElements["label"]) {
  const { className, ...restProps } = props;
  return (
    <label
      className={cn("text-default text-emphasis mb-2 block text-sm font-medium", className)}
      {...restProps}>
      {props.children}
    </label>
  );
}

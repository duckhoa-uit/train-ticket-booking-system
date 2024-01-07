import { Card } from "@tremor/react";

import { cn } from "@ttbs/lib/cn";

interface ICardProps {
  children: React.ReactNode;
  className?: string;
}

export const CardInsights = (props: ICardProps) => {
  const { children, className = "", ...rest } = props;

  return (
    <Card
      className={cn(`ring-subtle bg-muted shadow-none `, className)}
      {...rest}
    >
      {children}
    </Card>
  );
};

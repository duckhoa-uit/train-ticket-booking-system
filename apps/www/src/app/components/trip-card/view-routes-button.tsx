"use client";

import { useState } from "react";

import { Button, Dialog, DialogContent, DialogTrigger, DialogFooter, DialogClose } from "@ttbs/ui";
import { Route, ExternalLinkIcon } from "@ttbs/ui/components/icons";

import { DetailRoutes } from "../detail-routes/DetailRoutes";

const ViewRoutesButton = ({ tripId }: { tripId: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger>
        <Button StartIcon={Route} color="minimal">
          Xem lộ trình
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DetailRoutes tripId={tripId} />
        <DialogFooter>
          <DialogClose />
          <Button StartIcon={ExternalLinkIcon} href={`/trips/${tripId}`}>
            Chi tiết
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewRoutesButton;

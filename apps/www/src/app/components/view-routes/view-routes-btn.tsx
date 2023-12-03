import React, { useState } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@ttbs/ui";

import { DetailRoutes } from "../detail-routes/DetailRoutes";

const ViewRoutesBtn = () => {
  const [open, setOpen] = useState(false);
  const handleChange = () => {
    setOpen(!open);
  };
  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogTrigger>
        <button className="text-attention">Xem tuyến</button>
      </DialogTrigger>
      <DialogContent>
        <DetailRoutes />
      </DialogContent>
    </Dialog>
  );
};

export default ViewRoutesBtn;

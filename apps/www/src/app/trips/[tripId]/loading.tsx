import React from "react";

import { TrainLoader } from "@/app/components/loader/loader";

const loading = () => {
  return (
    <div className="min-h-screen">
      <TrainLoader />
    </div>
  );
};

export default loading;

import React, { Suspense } from "react";
import ConfirmAccount from "./_confirmAccount";

const Page = () => {
  return (
    <Suspense>
      <ConfirmAccount />
    </Suspense>
  );
};

export default Page;

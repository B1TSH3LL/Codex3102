import React, { Suspense } from "react";
import ResetPassword from "./_resetPassword";

const Page = () => {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
};

export default Page;

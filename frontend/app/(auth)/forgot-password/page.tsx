import React, { Suspense } from "react";
import ForgotPassword from "./_forgotPassword";

const Page = () => {
  return (
    <Suspense>
      <ForgotPassword />
    </Suspense>
  );
};

export default Page;

import React, { useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

const StarterPage = () => {
  return (
    <div className="w-full flex flex-col p-3 md:p-5">
      <Alert
        severity="warning"
        className="w-full my-3">
        <AlertTitle>توجه</AlertTitle>
        در این مرحله شما باید نوع حساب کاربری خود را مشخص کنید.
        <strong className="mr-1">
          لطفا اپلیکیشن موبایل را نصب و مراحل را از آن طریق دنبال نمایید.
        </strong>
        <strong className="mr-1">
          بعد از اتمام مراحل فعال سازی در اپلیکیشن موبایل می توانید از پنل وب
          سایت برای مشاهده آمارها استفاده نمایید.
        </strong>
      </Alert>
    </div>
  );
};

export default StarterPage;

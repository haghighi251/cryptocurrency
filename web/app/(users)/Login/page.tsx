"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/services/Redux/store";
import { actionLogin, user } from "@/services/Redux/userReducer";

import { isValidPhone } from "@/utils/validation";
import { Iuser } from "@/utils/types";
import LoginForm from "./LoginForm";
import ActivationForm from "./ActivationForm";

async function RegisterOrLogin(mobile: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: mobile,
    }),
  });
  if (!res.ok) {
    throw new Error("خطا در ارتباط با سرور.");
  }
  return res.json();
}

async function CheckActivationCodeOnDB(mobile: string, code: string) {
  const res = await fetch("/api/auth/activation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile: mobile,
      code: code,
    }),
  });
  if (!res.ok) {
    throw new Error("خطا در ارتباط با سرور.");
  }

  return res.json();
}

export default function Login() {
  const [mobile, setMobile] = useState<string>("");
  const [activationCode, setActivationCode] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showActivation, setShowActivation] = useState<boolean>(false);

  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const currentUser: Iuser = useSelector(user);
  if (currentUser.isLoggedIn !== false) router.push("/");

  const setMobileChanges = useCallback(
    (value: string) => {
      setMobile(value);
    },
    [mobile]
  );

  const handleSubmit = useCallback(async () => {
    let errorMsg = "";
    try {
      if (mobile === null || mobile === undefined) {
        errorMsg += "لطفا شماره همراه خود را وارد نمایید.";
      }

      if (!isValidPhone(mobile)) {
        errorMsg +=
          "شماره همراه صحیح نیست. لطفا شماره یازده رقمی که با صفر آغاز می شود را وارد کنید.";
      }

      if (errorMsg === "") {
        // Handling the submit event of the registration of the form
        setIsLoading(true);
        setError(null);
        const data: any = await RegisterOrLogin(mobile);
        if (data.success) {
          setShowActivation(true);
          setIsLoading(false);
        } else {
          setError(data.error);
          setIsLoading(false);
        }
      } else {
        setError(errorMsg);
        setIsLoading(false);
      }
    } catch (e) {
      setError("متاسفانه یک خطا رخ داده است. لطفا لحظاتی دیگر تلاش نمایید.");
      setIsLoading(false);
    }
  }, [mobile, error, isLoading, showActivation]);

  const handleActivationCode = useCallback(
    (value: string) => {
      setActivationCode(value);
    },
    [activationCode]
  );

  const handleActivation = useCallback(async () => {
    let errorMsg = "";
    try {
      if (activationCode === null || activationCode === undefined) {
        errorMsg += "لطفا کد فعال سازی خود را وارد نمایید.";
      }

      if (errorMsg === "") {
        // Handling the submit event of the registration of the form
        setIsLoading(true);
        setError(null);
        const res: any = await CheckActivationCodeOnDB(mobile, activationCode);
        if (res.success) {
          dispatch(
            actionLogin({
              user: {
                user_id: res.data.user_id,
                isAdmin: res.data.isAdmin,
                isStarterUser: res.data.isStarterUser,
                isDriver: res.data.isDriver,
                isCompanyAdmin: res.data.isCompanyAdmin,
                isMarketers: res.data.isMarketers,
                isStoreAdmin: res.data.isStoreAdmin,
                isProvinceAdmin: res.data.isProvinceAdmin,
                isCityAdmin: res.data.isCityAdmin,
              },
              isLoggedIn: true,
            })
          );
          router.push("/dashboard");
          setIsLoading(false);
        } else {
          setError(res.error);
          setIsLoading(false);
        }
      } else {
        setError(errorMsg);
        setIsLoading(false);
      }
    } catch (e) {
      setError("متاسفانه یک خطا رخ داده است. لطفا لحظاتی دیگر تلاش نمایید.");
      setIsLoading(false);
    }
  }, [activationCode]);

  return (
    <div className="flex flex-col mx-auto max-w-screen-sm justify-center items-center mt-3 md:mt-5 ">
      <div className="flex flex-col items-center border border-slate-400 shadow-md py-3 md:py-6 px-3 md:px-6 rounded-md m-5">
        {showActivation === false && (
          <LoginForm
            mobile={mobile}
            error={error}
            isLoading={isLoading}
            setMobileChanges={setMobileChanges}
            handleSubmit={handleSubmit}
          />
        )}
        {showActivation === true && (
          <ActivationForm
            handleActivation={handleActivation}
            activationCode={activationCode}
            handleActivationCode={handleActivationCode}
            error={error}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

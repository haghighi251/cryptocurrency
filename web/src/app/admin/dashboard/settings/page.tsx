"use client";
import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Loading from "@/components/loading";
import { Button, TextField } from "@mui/material";

const SettingsPage = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [usd, setUsd] = useState<number>();
  const [profit, setProfit] = useState<number>(1); //increasing prices based on their USD price. it is number.
  const [cryptoCommisition, setCryptoCommisition] = useState<string>("0.2"); // commistion of transfering coins in the market. it is percentage.
  const [addDealCommisition, setAddDealCommisition] = useState<number>(3000); // The price of adding new deal for selling or buying based on Toman.
  const [botCommisition, setBotCommisition] = useState<string>("0.1"); // Based on %
  const [commisitionLevel1, setCommisitionLevel1] = useState<string>("0.3"); // Based on %
  const [commisitionLevel2, setCommisitionLevel2] = useState<string>("0.25"); // Based on %
  const [commisitionLevel3, setCommisitionLevel3] = useState<string>("0.2"); // Based on %
  const [commisitionLevel4, setCommisitionLevel4] = useState<string>("0.15"); // Based on %
  const [commisitionLevel5, setCommisitionLevel5] = useState<string>("0.1"); // Based on %
  const [minimumAsset, setMinimumAsset] = useState<number>(100000); // The minimum value of each user assets when they want to charge their account. Based on Toman
  const [minimumWithdrawal, setMinimumWithdrawal] = useState<number>(20000); // The minimum value withdrawal. Based on Toman
  const [maximumWithdrawalLevel1, setMaximumWithdrawalLevel1] =
    useState<number>(1000000);
  const [maximumWithdrawalLevel2, setMaximumWithdrawalLevel2] =
    useState<number>(10000000);
  const [maximumWithdrawalLevel3, setMaximumWithdrawalLevel3] =
    useState<number>(50000000);
  const [maximumWithdrawalLevel4, setMaximumWithdrawalLevel4] =
    useState<number>(100000000);
  const [maximumWithdrawalLevel5, setMaximumWithdrawalLevel5] =
    useState<number>(1000000000);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/admin/authorized/settings");
      const settings = await res.json();
      setIsLoading(false);
      if (settings.success === false) setError(settings.error);
      else {
        settings.data.usd && setUsd(settings.data.usd);
        settings.data.profit && setProfit(settings.data.profit);
        settings.data.cryptoCommisition &&
          setCryptoCommisition(settings.data.cryptoCommisition);
        settings.data.addDealCommisition &&
          setAddDealCommisition(settings.data.addDealCommisition);
        settings.data.botCommisition &&
          setBotCommisition(settings.data.botCommisition);
        settings.data.commisitionLevel1 &&
          setCommisitionLevel1(settings.data.commisitionLevel1);
        settings.data.commisitionLevel2 &&
          setCommisitionLevel2(settings.data.commisitionLevel2);
        settings.data.commisitionLevel3 &&
          setCommisitionLevel3(settings.data.commisitionLevel3);
        settings.data.commisitionLevel4 &&
          setCommisitionLevel4(settings.data.commisitionLevel4);
        settings.data.commisitionLevel5 &&
          setCommisitionLevel5(settings.data.commisitionLevel5);
        settings.data.minimumAsset &&
          setMinimumAsset(settings.data.minimumAsset);
        settings.data.minimumWithdrawal &&
          setMinimumWithdrawal(settings.data.minimumWithdrawal);
        settings.data.maximumWithdrawalLevel1 &&
          setMaximumWithdrawalLevel1(settings.data.maximumWithdrawalLevel1);
        settings.data.maximumWithdrawalLevel2 &&
          setMaximumWithdrawalLevel2(settings.data.maximumWithdrawalLevel2);
        settings.data.maximumWithdrawalLevel3 &&
          setMaximumWithdrawalLevel3(settings.data.maximumWithdrawalLevel3);
        settings.data.maximumWithdrawalLevel4 &&
          setMaximumWithdrawalLevel4(settings.data.maximumWithdrawalLevel4);
        settings.data.maximumWithdrawalLevel5 &&
          setMaximumWithdrawalLevel5(settings.data.maximumWithdrawalLevel5);
      }
    };
    fetchData();
  }, []);

  const handleUpdates = () => {
    // Check if all states are not nullish
    const allStatesNotNullish =
      usd &&
      profit &&
      cryptoCommisition &&
      addDealCommisition &&
      botCommisition &&
      commisitionLevel1 &&
      commisitionLevel2 &&
      commisitionLevel3 &&
      commisitionLevel4 &&
      commisitionLevel5 &&
      minimumAsset &&
      minimumWithdrawal &&
      maximumWithdrawalLevel1 &&
      maximumWithdrawalLevel2 &&
      maximumWithdrawalLevel3 &&
      maximumWithdrawalLevel4 &&
      maximumWithdrawalLevel5;
    if (!allStatesNotNullish) {
      setError("لطفا تمام مقادیر را پر نمایید.");
    } else {
      // We are free to send data to the server and update the database
      setIsLoading(true);
      setSuccessMessage(null);
      setError(null);
      fetch("/api/admin/authorized/settings/update", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          usd: usd,
          profit: profit,
          cryptoCommisition: cryptoCommisition,
          addDealCommisition: addDealCommisition,
          botCommisition: botCommisition,
          commisitionLevel1: commisitionLevel1,
          commisitionLevel2: commisitionLevel2,
          commisitionLevel3: commisitionLevel3,
          commisitionLevel4: commisitionLevel4,
          commisitionLevel5: commisitionLevel5,
          minimumAsset: minimumAsset,
          minimumWithdrawal: minimumWithdrawal,
          maximumWithdrawalLevel1: maximumWithdrawalLevel2,
          maximumWithdrawalLevel2: maximumWithdrawalLevel2,
          maximumWithdrawalLevel3: maximumWithdrawalLevel3,
          maximumWithdrawalLevel4: maximumWithdrawalLevel4,
          maximumWithdrawalLevel5: maximumWithdrawalLevel5,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) setSuccessMessage("تنظیمات انجام شد.");
          else setError(res.error);
        })
        .catch((e) => {
          setError("خطایی در سرور رخ داده است.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="mx-auto mt-3 my-auto px-3">
      {successMessage !== null && (
        <>
          <Alert severity="success">{successMessage}</Alert>
        </>
      )}
      {error !== null && (
        <>
          <Alert
            severity="error"
            className="my-3">
            {error}
          </Alert>
        </>
      )}
      {isLoading ? (
        <div className="flex my-4 justify-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex flex-col mx-auto my-4 w-full">
            <Button
              className="w-1/4 my-3 justify-center"
              variant="contained"
              onClick={handleUpdates}>
              به روز رسانی
            </Button>
            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">قیمت دلار</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="قیمت دلار"
                  variant="outlined"
                  value={usd}
                  onChange={(e) => setUsd(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">نرخ سود به دلار</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="نرخ سود به دلار"
                  variant="outlined"
                  value={profit}
                  onChange={(e) => setProfit(parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">کمیسیون ارز دیجیتال</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="کمیسیون ارز دیجیتال"
                  variant="outlined"
                  value={cryptoCommisition}
                  onChange={(e) => setCryptoCommisition(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">کمیسیون ایجاد معامله</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="کمیسیون ایجاد معامله"
                  variant="outlined"
                  value={addDealCommisition}
                  onChange={(e) =>
                    setAddDealCommisition(parseInt(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">کمیسیون ربات</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="کمیسیون ربات"
                  variant="outlined"
                  value={botCommisition}
                  onChange={(e) => setBotCommisition(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">کمسیسون کاربر سطح اول</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="کمیسیون کاربر سطح اول"
                  variant="outlined"
                  value={commisitionLevel1}
                  onChange={(e) => setCommisitionLevel1(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">کمسیسون کاربر سطح دوم</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="کمیسیون کاربر سطح دوم"
                  variant="outlined"
                  value={commisitionLevel2}
                  onChange={(e) => setCommisitionLevel2(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">کمسیسون کاربر سطح سوم</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="کمیسیون کاربر سطح سوم"
                  variant="outlined"
                  value={commisitionLevel3}
                  onChange={(e) => setCommisitionLevel3(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">کمیسیون کاربر سطح چهارم</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="کمیسیون کاربر سطح چهارم"
                  variant="outlined"
                  value={commisitionLevel4}
                  onChange={(e) => setCommisitionLevel4(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">کمیسیون کاربر سطح پنجم</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="کمیسیون کاربر سطح پنجم"
                  variant="outlined"
                  value={commisitionLevel5}
                  onChange={(e) => setCommisitionLevel5(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">حداقل واریزی</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="مقدار بر حسب تومان"
                  variant="outlined"
                  value={minimumAsset}
                  onChange={(e) => setMinimumAsset(parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">حداقل برداشت</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="مقدار بر حسب تومان"
                  variant="outlined"
                  value={minimumWithdrawal}
                  onChange={(e) =>
                    setMinimumWithdrawal(parseInt(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">حداکثر برداشت سطح 1</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="مقدار بر حسب تومان"
                  variant="outlined"
                  value={maximumWithdrawalLevel1}
                  onChange={(e) =>
                    setMaximumWithdrawalLevel1(parseInt(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">حداکثر برداشت سطح 2</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="مقدار بر حسب تومان"
                  variant="outlined"
                  value={maximumWithdrawalLevel2}
                  onChange={(e) =>
                    setMaximumWithdrawalLevel2(parseInt(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">حداکثر برداشت سطح 3</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="مقدار بر حسب تومان"
                  variant="outlined"
                  value={maximumWithdrawalLevel3}
                  onChange={(e) =>
                    setMaximumWithdrawalLevel3(parseInt(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">حداکثر برداشت سطح 4</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="مقدار بر حسب تومان"
                  variant="outlined"
                  value={maximumWithdrawalLevel4}
                  onChange={(e) =>
                    setMaximumWithdrawalLevel4(parseInt(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="flex w-full mx-auto p-2 gap-2">
              <div className="basis-1/3">حداکثر برداشت سطح 5</div>
              <div className="basis-2/3">
                <TextField
                  id="outlined-basic"
                  label="مقدار بر حسب تومان"
                  variant="outlined"
                  value={maximumWithdrawalLevel5}
                  onChange={(e) =>
                    setMaximumWithdrawalLevel5(parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SettingsPage;

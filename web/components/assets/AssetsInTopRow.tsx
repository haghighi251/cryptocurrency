"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { AdminSettingsObjectType, AssetsType } from "@/utils/types";
import Loading from "../loading";
import Image from "next/image";

const AssetsInTopRow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assets, setAssets] = useState<AssetsType | null>(null);
  const [error, setError] = useState<string>("");
  const [settingsLoading, setSettingsLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<AdminSettingsObjectType | null>(
    null
  );

  useEffect(() => {
    // Getting fresh data from the remote api
    fetch("https://api.coincap.io/v2/assets", {
      method: "GET",
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result.data);
        setAssets(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(
          "خطایی رخ داده است. لطفا اتصال به اینترنت خود را بررسی کنید و در صورت اطمینان از آن مجددا صفحه را بارگذاری نمایید."
        );
      });
    /*
    fetch("/api/assets/getall", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((json) => {
        console.log(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    */
  }, []);

  useEffect(() => {
    fetch("/api/application/settings")
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        if (res.success === true) {
          setSettingsLoading(false);
          setSettings(res.data);
        } else {
          setError(res.error);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(
          "خطایی در بازیابی اطلاعات رخ داده است. لطفا بعدا دوباره صفحه را بارگذاری نمایید."
        );
      });
  }, []);

  const AddRaise = (number: number | string) => {
    // Round the number to 4 decimal places
    let roundedNumber = Number(parseFloat(number.toString()).toFixed(4));
    // Increase the rounded number by one
    let increasedNumber = roundedNumber + parseFloat(settings?.profit!);
    return increasedNumber;
  };

  const myLoader = ({ src, width, quality }: any) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="w-full p-2 border-b border-slate-300">
      {isLoading === true && (
        <div className="flex justify-center pt-4">
          <Loading />
          <p className=" text-sky-400 mr-2 md:mr-5">
            در حال بازیابی آخرین تغییرات...
          </p>
        </div>
      )}
      {isLoading === false && settingsLoading === false && (
        <div className="w-full container mx-auto">
          <Swiper
            slidesPerView={6}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            className="mySwiper">
            {assets !== null &&
              assets.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="flex border-l border-slate-300  ">
                      <div className="w-[45px]">
                        <Image
                          src={`/assets/images/coins/${item.symbol}.svg`}
                          loader={myLoader}
                          object-fill="cover"
                          width={40}
                          height={40}
                          alt={item.name}
                          quality={80}
                          className=""
                        />
                      </div>
                      <div className="w-[90px]">{item.name}</div>
                      <div className="w-[100px]">
                        {AddRaise(item.priceUsd)} $
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default AssetsInTopRow;

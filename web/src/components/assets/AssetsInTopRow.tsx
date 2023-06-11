"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { AssetsType } from "@/utils/types";
import Loading from "../loading";

const AssetsInTopRow = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [assets, setAssets] = useState<AssetsType | null>(null);
  const [error, setError] = useState<string>("");

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

  return (
    <div className="w-full p-2">
      {isLoading === true && (
        <div className="flex justify-center pt-4">
          <Loading />
          <p className=" text-sky-400 mr-2 md:mr-5">
            در حال بازیابی آخرین تغییرات...
          </p>
        </div>
      )}
      {isLoading === false && (
        <div className="w-full">
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            className="mySwiper">
            {assets !== null &&
              assets.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="flex">
                      <div className="basis-1/4"></div>
                      <div className="basis-2/4">{item.name}</div>
                      <div className="basis-1/4">{item.priceUsd} $</div>
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

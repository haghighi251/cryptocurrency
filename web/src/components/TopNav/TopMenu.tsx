"use client";
import { Iuser } from "@/utils/types";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout, user } from "@/services/Redux/userReducer";
import { AppDispatch } from "@/services/Redux/store";
import Image from "next/image";
import logo from "../../public/assets/images/logo.png";
import StarterUserItems from "./StarterUserItems";

const TopMenu = () => {
  const currentUser: Iuser = useSelector(user);
  const dispatch: AppDispatch = useDispatch();

  return (
    <div className="w-full border-y border-slate-400/25 ">
      <div className="container flex mx-auto flex-col md:flex-row gap-2 w-full">
        <div className="border-l border-slate-400/25 md:basis-2/8">
          <Link
            className=""
            href="/">
            <Image
              src={logo}
              object-fill="cover"
              width={250}
              alt="Logo"
              className="p-2"
            />
          </Link>
        </div>
        <div className="flex gap-2 md:gap-8 p-2 md:p-5 flex-col md:flex-row md:basis-6/8">
          <Link
            className="links"
            href="/">
            شروع
          </Link>
          <Link
            className="links"
            href="/assets">
            معاملات حرفه ای
          </Link>
          <Link
            className="links"
            href="/assets">
            معاملات ساده
          </Link>
          <Link
            className="links"
            href="/apps">
            اپ ها
          </Link>
          <Link
            className="links"
            href="/prices">
            قیمت ها
          </Link>
          <Link
            className="links"
            href="/laws">
            قوانین
          </Link>
          <Link
            className="links"
            href="/about-us">
            درباره ما
          </Link>
        </div>
        <div className="p-2 md:p-5 md:basis-2/8">
          {currentUser.isLoggedIn === false && (
            <>
              <Link
                className="links ring-offset-2 ring-2 ring-sky-300 rounded-md p-2 hover:bg-sky-300 hover:text-white"
                href="/Login">
                ورود/ثبت نام
              </Link>
            </>
          )}
          {currentUser.isLoggedIn === true && (
            <>
              <StarterUserItems />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopMenu;

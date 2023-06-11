"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/services/Redux/store";
import { user } from "@/services/Redux/userReducer";
import { Iuser } from "@/utils/types";
import UsersLeftSide from "@/components/users/dashboard/UsersLeftSide";
import StarterPage from "@/components/StarterUser/StarterPage";

const DashboardHomepage = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const currentUser: Iuser = useSelector(user);
  if (currentUser.isLoggedIn === false) router.push("/");

  return currentUser.user.isStarterUser ? <StarterPage /> : <UsersLeftSide />;
};

export default DashboardHomepage;

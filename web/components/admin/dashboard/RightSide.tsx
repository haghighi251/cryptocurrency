"use client";
import React from "react";
import Dashboard from "@mui/icons-material/Dashboard";
import School from "@mui/icons-material/School";
import Settings from "@mui/icons-material/Settings";
import LocalTaxi from "@mui/icons-material/LocalTaxi";
import FamilyRestroom from "@mui/icons-material/FamilyRestroom";
import Link from "next/link";
import { AccountBalance, Newspaper } from "@mui/icons-material";

const RightSide = () => {
  return (
    <div className="basis-1/4 bg-white w-full pr-3">
      <div className="rightMenuLink ">
        <div className="rightMenuLinkInternally">
          <Dashboard sx={{ my: 0.3 }} />
          <Link href={`/admin/dashboard/`}>شروع</Link>
        </div>
      </div>
      <div className="rightMenuLink ">
        <div className="rightMenuLinkInternally">
          <Settings sx={{ my: 0.3 }} />
          <Link href={`/admin/dashboard/settings`}>تنظیمات</Link>
        </div>
      </div>
      <div className="rightMenuLink ">
        <div className="rightMenuLinkInternally">
          <School sx={{ my: 0.3 }} />
          <Link href={`/admin/dashboard/schools`}>مدرسه ها</Link>
        </div>
      </div>
      <div className="rightMenuLink ">
        <div className="rightMenuLinkInternally">
          <LocalTaxi sx={{ my: 0.3 }} />
          <Link href={`/admin/dashboard/drivers`}>مدیریت رانندگان</Link>
        </div>
      </div>
      <div className="rightMenuLink rightMenuLinkActive">
        <div className="rightMenuLinkInternally">
          <FamilyRestroom sx={{ my: 0.3 }} />
          <Link href={`/admin/dashboard/packages`}>مدیریت پکیج ها</Link>
        </div>
      </div>
      <div className="rightMenuLink ">
        <div className="rightMenuLinkInternally">
          <AccountBalance sx={{ my: 0.3 }} />
          <Link href={`/`}>حسابداری</Link>
        </div>
      </div>
      <div className="rightMenuLink ">
        <div className="rightMenuLinkInternally">
          <Newspaper sx={{ my: 0.3 }} />
          <Link href={`/`}>اخبار</Link>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
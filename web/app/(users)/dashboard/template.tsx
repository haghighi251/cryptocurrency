import React from "react";
import UserRightSideMenus from "@/components/users/dashboard/UserRightSideMenus";

const template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex ">
      <UserRightSideMenus />
      <div className="w-full mx-5">{children}</div>
    </div>
  );
};

export default template;

import React, { useState, MouseEvent, memo } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { actionLogout, user } from "@/services/Redux/userReducer";
import { AppDispatch } from "@/services/Redux/store";
import { Iuser } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";

const StarterUserItems = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const currentUser: Iuser = useSelector(user);
  const dispatch: AppDispatch = useDispatch();
  const logOut = async () => {
    await dispatch(actionLogout());
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const UserProfileImage = () => {
    if (currentUser.user.picture !== null) {
      return (
        <Image
          src={currentUser.user.picture!}
          object-fill="cover"
          width={250}
          alt={currentUser.user.nickname!}
          className="p-2"
        />
      );
    } else {
      return <AccountCircle />;
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="حساب کاربری">
          <IconButton
            onClick={handleOpenUserMenu}
            sx={{ p: 0 }}>
            <UserProfileImage />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}>
          <MenuItem>
            <Link href="/dashboard">
              <Typography textAlign="center">حساب کاربری</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={logOut}>
            <Typography textAlign="center">خروج</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
};

export default memo(StarterUserItems);

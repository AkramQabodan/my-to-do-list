"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { removeCurrentUserAtom } from "@/stateManagement/auth/Users/usersActions";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Link from "next/link";
import { userProfilePictureAtom } from "@/stateManagement/auth/Users/usersSlice";
import ToggleButton from "@mui/material/ToggleButton";
import { useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { darkModeAtom } from "@/stateManagement/darkmode";

export default function MenuAppBar() {
  const userProfilePicture = useAtomValue(userProfilePictureAtom);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const removeCurrentUser = useSetAtom(removeCurrentUserAtom);
  const handleLogout = () => {
    handleClose();
    removeCurrentUser();
    router.push("/auth/login");
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/main/to-do-list">To Do List</Link>
          </Typography>
          <ToggleButton
            value="check"
            selected={darkMode}
            onChange={() => {
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? <WbSunnyIcon /> : <DarkModeIcon />}
          </ToggleButton>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt="Profile"
                src={userProfilePicture || "/static/images/avatar/1.jpg"}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link href="/main/profile">
                  <Chip
                    avatar={<AccountCircle />}
                    label="Profile"
                    variant="outlined"
                  />
                </Link>
              </MenuItem>
              <MenuItem>
                <Chip
                  icon={<LogoutIcon />}
                  label="Logout"
                  onClick={handleLogout}
                />
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

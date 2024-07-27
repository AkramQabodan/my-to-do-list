"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import useLoggedInGuard from "@/hooks/useloggedInGuardHook";
import { loggedInUserAtom } from "@/stateManagement/auth/Users/usersAtom";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { useAtomValue, useSetAtom } from "jotai";
import {
  updateProfilePictureAtom,
  userProfilePictureAtom,
} from "@/stateManagement/auth/Users/todosActions";

const Profile: React.FC = () => {
  useLoggedInGuard();
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const updateProfilePicture = useSetAtom(updateProfilePictureAtom);
  const userProfilePicture = useAtomValue(userProfilePictureAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userProfilePicture) {
      updateProfilePicture(userProfilePicture);
    }
  }, []);

  const editProfilePictureHandler = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfilePicture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center h-full w-full pt-10 gap-5 ">
      <h1 className="text-4xl">{loggedInUser}</h1>
      <div className="relative">
        <Avatar
          alt={loggedInUser}
          src={userProfilePicture || "/static/images/avatar/1.jpg"}
          sx={{ width: 150, height: 150 }}
        />
        <Tooltip title="Edit">
          <IconButton
            aria-label="edit"
            size="small"
            sx={{
              marginLeft: "auto",
              position: "absolute",
              right: "-10px",
              bottom: "0px",
            }}
            onClick={editProfilePictureHandler}
          >
            <EditIcon fontSize="small" color="info" />
          </IconButton>
        </Tooltip>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Profile;

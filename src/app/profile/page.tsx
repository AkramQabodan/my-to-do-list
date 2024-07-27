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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Box from "@mui/material/Box";
import WebcamComponent from "@/components/webcam";

const Profile: React.FC = () => {
  useLoggedInGuard();
  const loggedInUser = useAtomValue(loggedInUserAtom);
  const updateProfilePicture = useSetAtom(updateProfilePictureAtom);
  const userProfilePicture = useAtomValue(userProfilePictureAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (userProfilePicture) {
      updateProfilePicture(userProfilePicture);
    }
  }, [userProfilePicture, updateProfilePicture]);

  const editProfilePictureHandler = () => {
    setOpen(true);
  };

  const handleCapture = (imageSrc: string) => {
    updateProfilePicture(imageSrc);
    setOpen(false);
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="profile picture options"
          >
            <Tab label="Capture" />
            <Tab label="Upload" />
          </Tabs>
          <Box sx={{ p: 2 }}>
            {tabIndex === 0 && <WebcamComponent onCapture={handleCapture} />}
            {tabIndex === 1 && (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Button
                  variant="contained"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose File
                </Button>
              </div>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;

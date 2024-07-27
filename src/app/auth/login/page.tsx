"use client";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { validateLogin } from "@/Utilities/userUtils";
import { useAtomValue, useSetAtom } from "jotai";
import { usersAtom } from "@/stateManagement/auth/Users/usersAtom";
import { setCurrentUserAtom } from "@/stateManagement/auth/Users/usersActions";
import Alert from "@mui/material/Alert";
import useLoggedOutGuard from "@/hooks/useloggedOutGuard";

type Inputs = {
  username: string;
  password: string;
};

export default function Home() {
  useLoggedOutGuard();
  const [showPassword, setShowPassword] = useState(false);
  const [showUserExistsWarning, setShowUserExistsWarning] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const users = useAtomValue(usersAtom);

  const setUser = useSetAtom(setCurrentUserAtom);

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    if (validateLogin(username, password, users)) {
      setUser(username);
      router.push("/main/to-do-list");
    } else {
      setShowUserExistsWarning(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded  md:w-1/3 lg:w-1/3 xl:w-1/4 min-w-80 mt-4 flex flex-col items-center gap-7 px-10 pt-5 pb-5"
      >
        <TextField
          className="w-full"
          id="username"
          {...register("username", { required: "please enter username" })}
          label="username"
          variant="standard"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          className="w-full"
          id="password"
          {...register("password", { required: "please enter password" })}
          label="password"
          variant="standard"
          type={showPassword ? "text" : "password"}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {showUserExistsWarning && (
          <Alert severity="error">Invalid Email Or Password</Alert>
        )}
        <div className="row gap-3 flex">
          <Button variant="contained" type="submit" color="success">
            Login
          </Button>
          <Button variant="contained" type="button">
            <Link href="/auth/sign-up">Sign up</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import useLoggedOutGuard from "@/hooks/useloggedOutGuard";
import { addUserAtom } from "@/stateManagement/auth/Users/usersActions";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  useLoggedOutGuard();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [showPassword, setShowPassword] = useState(false);
  const [showUserExistsWarning, setShowUserExistsWarning] = useState(false);
  const router = useRouter();
  const password = watch("password");
  const addUser = useSetAtom(addUserAtom);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const userExist = addUser({
      username: data.username,
      password: data.password,
      todos: [],
    });
    if (userExist) {
      setShowUserExistsWarning(true);
    } else {
      setShowUserExistsWarning(false);
      router.push("/auth/login");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="flex flex-col items-center h-full w-full justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded  md:w-1/3 lg:w-1/3 xl:w-1/4 min-w-72 mt-4 flex flex-col items-center gap-7 px-10 pt-5 pb-5"
      >
        <TextField
          className="w-full"
          id="username"
          {...register("username", {
            required: "please enter username",
            minLength: {
              value: 8,
              message: "username must be at least 8 characters",
            },
          })}
          label="username"
          variant="standard"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          className="w-full"
          id="password"
          {...register("password", {
            required: "please enter password",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
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
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          className="w-full"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "please confirm password",
            validate: (value) => value === password || "Passwords do not match",
          })}
          label="confirmPassword"
          variant="standard"
          type="password"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        {showUserExistsWarning && (
          <Alert severity="error">This user already exists</Alert>
        )}
        <div className="row gap-3 flex">
          <Button variant="contained" type="button">
            <Link href="/auth/login">Back To Login</Link>
          </Button>
          <Button variant="contained" type="submit" color="success">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";
import { loggedInUserAtom } from "@/stateManagement/auth/Users/usersAtom";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const user = useAtomValue(loggedInUserAtom);
  useEffect(() => {
    if (user) {
      router.push("/main/to-do-list");
    } else {
      router.push("/login");
    }
  }, [router, user]);
  return <></>;
};

export default Home;

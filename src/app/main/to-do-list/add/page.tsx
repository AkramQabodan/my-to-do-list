"use client";
import CreateToDoForm from "@/components/createToDoForm";
import useLoggedInGuard from "@/hooks/useloggedInGuardHook";
import { Button } from "@mui/material";
import Link from "next/link";

const AddToDoPage = () => {
  useLoggedInGuard();
  return (
    <div className="flex flex-col items-center h-full w-full pt-10 gap-5">
      <CreateToDoForm />
      <Button variant="contained" color="primary">
        <Link href="/main/to-do-list">Back To List</Link>
      </Button>
    </div>
  );
};

export default AddToDoPage;

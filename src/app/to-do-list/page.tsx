"use client";

import ToDoList from "@/components/toDoList";
import useLoggedInGuard from "@/hooks/useloggedInGuardHook";

const ToDoListPage = () => {
  useLoggedInGuard();
  return (
    <div className="flex flex-col items-center h-full w-full pt-10 gap-5 ">
      <ToDoList />
    </div>
  );
};
export default ToDoListPage;

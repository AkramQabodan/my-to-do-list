"use client";

import ToDoList from "@/components/toDoList";

export default function ToDoListPage() {
  return (
    <div className="flex flex-col items-center h-full w-full pt-10 gap-5 ">
      <ToDoList />
    </div>
  );
}

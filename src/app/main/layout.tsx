// app/dashboard/layout.tsx
import MenuAppBar from "@/components/navBar";
import React from "react";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className=" dark:bg-stone-800 w-full h-full">
      <MenuAppBar />
      {children}
    </div>
  );
};

export default DashboardLayout;

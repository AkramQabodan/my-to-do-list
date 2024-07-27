// app/dashboard/layout.tsx
import MenuAppBar from "@/components/navBar";
import React from "react";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
      <MenuAppBar />
      {children}
    </>
  );
};

export default DashboardLayout;

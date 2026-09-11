import React from "react";
import NavStep from "../components/NavStep";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex flex-col justify-start items-center border border-green-400 md:w-160 md:h-100vh md:flex-row">
        <NavStep />
        <div className="w-full h-full border border-gray-800 flex justify-center items-start md:items-center ">
          {children}
        </div>
      </div>
    </div>
  );
}

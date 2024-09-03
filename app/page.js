"use client";
import Image from "next/image";
import Calendar from "./components/Calendar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [sidebar, setSidebar] = useState(true);

  const handleOpen = () => {
    setSidebar((prev) => !prev);
  };
  return (
    <main className="flex items-center h-screen bg-darkGray">
      <div>
        <Sidebar sidebar={sidebar} handleOpen={handleOpen} />
      </div>
      <div
        className={` ${sidebar ? "w-4/5" : "w-full"} h-screen overflow-scroll`}
      >
        <Calendar />
      </div>
    </main>
  );
}

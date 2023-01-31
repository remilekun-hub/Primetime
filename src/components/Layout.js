import React from "react";
import Search from "./search";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

function Layout({ children }) {
  const router = useRouter();
  return (
    <div className="bg-[#10141E]">
      <div className="lg:flex  md:pt-6">
        <Navbar />
        <main className="min-h-screen flex-1 max-w-screen-2xl  mx-auto px-4 md:px-5 lg:px-6 overflow-x-hidden lg:pl-[125px]">
          {router.pathname != "/bookmarks" && <Search />}

          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;

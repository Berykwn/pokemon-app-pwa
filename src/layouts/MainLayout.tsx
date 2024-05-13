import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import ThemeToggle, { darkModeAtom } from "../components/ThemeToggle";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [darkMode] = useAtom(darkModeAtom);

  const location = useLocation();

  return (
    <div className="bg-slate-900 font-jersey">
      <div
        className={`h-screen flex flex-col justify-center mx-auto w-full max-w-lg ${
          darkMode ? "dark" : ""
        }`}
      >
        <div className="bg-slate-950 py-4 px-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl text-neutral-400">
              Poke~mon
            </Link>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
        <div
          className="bg-white flex-grow overflow-y-auto max-h-[600px] dark:bg-neutral-800"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "gray white",
          }}
        >
          {children}
        </div>
        <div className="bg-slate-950 py-3 px-4 sticky bottom-0 z-10">
          <div className="flex justify-center gap-5">
            <Link
              to="/"
              className={`px-4 text-neutral-400 text-lg ${
                location.pathname === "/" &&
                "bg-neutral-700 rounded-lg border border-neutral-500"
              }`}
            >
              Home
            </Link>
            <Link
              to="/my-pokemons"
              className={`px-4 text-neutral-400 text-lg ${
                location.pathname === "/my-pokemons" &&
                "bg-neutral-700 rounded-lg border border-neutral-500"
              }`}
            >
              My Pokemon
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

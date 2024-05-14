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
    <div
      className={`h-screen flex flex-col justify-between mx-auto w-full max-w-lg font-jersey ${
        darkMode ? "dark" : ""
      }`}
    >
      <header className="bg-slate-950 py-4 px-4 sticky top-0 z-10 h-16">
        <nav className="flex justify-between items-center">
          <Link to="/" className="text-2xl text-neutral-400">
            Poke~mon
          </Link>
          <ThemeToggle />
        </nav>
      </header>
      <main className="bg-white flex-grow overflow-y-auto max-h-[calc(100vh - 16rem)] dark:bg-neutral-800">
        {children}
      </main>
      <footer className="bg-slate-950 py-3 px-4 sticky bottom-0 z-10 flex justify-center gap-5 min-h-16">
        <Link
          to="/"
          className={`px-4 py-2 text-lg ${
            location.pathname === "/" ? "text-neutral-100" : "text-neutral-500"
          }`}
        >
          Home
        </Link>
        <Link
          to="/my-pokemons"
          className={`px-4 py-2 text-lg ${
            location.pathname === "/my-pokemons"
              ? "text-neutral-100"
              : "text-neutral-500"
          }`}
        >
          My Pokemon
        </Link>
      </footer>
    </div>
  );
};

export default MainLayout;

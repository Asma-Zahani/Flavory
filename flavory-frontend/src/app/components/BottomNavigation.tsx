"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { CookingPot, Plus, Search, UserRound } from "lucide-react";
import { UserContext } from "@/context/UserContext";

export default function BottomNavigation() {
  const { user } = useContext(UserContext);
  const [showSticky, setShowSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 150);
    };

    const handleResize = () => {
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <header className={`fixed bottom-0 left-0 w-full bg-white shadow-[0px_-8px_44px_0px_rgba(20,25,44,0.08)] z-50 transition-transform duration-700 ease-in-out ${showSticky ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mx-10 lg:mx-55">
          <div className="px-8 py-4">
            <div className="flex mx-auto justify-between items-center">
              <Link href="/" className={`${pathname === "/" ? 'text-primary' : 'text-gray'}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.75 3C1.75 2.30964 2.30964 1.75 3 1.75H9C9.69036 1.75 10.25 2.30964 10.25 3V11C10.25 11.6904 9.69036 12.25 9 12.25H3C2.30964 12.25 1.75 11.6904 1.75 11V3Z" fill="white" stroke={pathname === "/" ? "#e35640" : "#595959"} strokeWidth="1.5"/>
                  <path d="M13.75 3C13.75 2.30964 14.3096 1.75 15 1.75H21C21.6904 1.75 22.25 2.30964 22.25 3V7C22.25 7.69036 21.6904 8.25 21 8.25H15C14.3096 8.25 13.75 7.69036 13.75 7V3Z" fill="white" stroke={pathname === "/" ? "#e35640" : "#595959"} strokeWidth="1.5"/>
                  <path d="M1.75 17C1.75 16.3096 2.30964 15.75 3 15.75H9C9.69036 15.75 10.25 16.3096 10.25 17V21C10.25 21.6904 9.69036 22.25 9 22.25H3C2.30964 22.25 1.75 21.6904 1.75 21V17Z" fill="white" stroke={pathname === "/" ? "#e35640" : "#595959"} strokeWidth="1.5"/>
                  <path d="M13.75 13C13.75 12.3096 14.3096 11.75 15 11.75H21C21.6904 11.75 22.25 12.3096 22.25 13V21C22.25 21.6904 21.6904 22.25 21 22.25H15C14.3096 22.25 13.75 21.6904 13.75 21V13Z" fill="white" stroke={pathname === "/" ? "#e35640" : "#595959"} strokeWidth="1.5"/>
                </svg>
              </Link>
              <Link href="/recipes" className={`${(pathname === "/recipes" || pathname === "/recipe-category") ? 'text-primary' : 'text-gray'}`}>
                <CookingPot />
              </Link>
              <Link href={user ? "add-recipe" : "/login"} className={`-mt-[50px] -mx-[20px] transition-all duration-700 ${showSticky ? "" : "translate-y-1/2"}`}>
                <Plus strokeWidth={2} size={24} className="bg-primary text-white rounded-full h-15 w-15 p-3" />
              </Link>
              <Link href="/search-recipes" className={`${pathname === "/search-recipes" ? 'text-primary' : 'text-gray'}`}>
                <Search />
              </Link>
              <Link href={user ? "user-account" : "/login"} className={`${pathname === "/user-account" ? 'text-primary' : 'text-gray'}`}>
                <UserRound />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

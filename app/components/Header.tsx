"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";

export default function Header() {
  const [showSticky, setShowSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) {
        setShowSticky(false);
      } else {
        setShowSticky(window.scrollY > 150);
      }
    };

    window.addEventListener("scroll", handleScroll);
    const handleResize = () => {
      if (window.innerWidth < 1024) setShowSticky(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
      <header className={`${showSticky ? 'fixed top-0 left-0 border-b border-grayLight' : 'relative'} bg-white w-full`}>
        <div className="mx-22">
          <div className={`${showSticky ? 'py-4' : 'py-10 sm:py-8 lg:border-b border-grayLight'} px-0 flex justify-between w-full`}>
            <Image src="/logo.svg" alt="Flavory Logo" width={200} height={51} priority />
            <div className={`${showSticky ? 'hidden w-1250:flex' : 'hidden'}`}><NavElement /></div>
            <div className="hidden lg:flex items-center ml-6 mx-3">
              <form className="flex items-center">
                <input type="text" placeholder="Search" className="max-w-75 w-[240px] mx-4 border-b py-1 text-md outline-none"/>
                <button className="text-white bg-primary rounded-full p-2">
                  <Search size={16} />
                </button>
              </form>
            </div>
            <div className="lg:hidden flex items-center">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {!showSticky && 
            <div className="py-5 hidden lg:flex justify-between w-full lg:border-b border-grayLight">
              <nav className="h-full">
                <NavElement />
              </nav>
              <p className={`${showSticky ? 'hidden' : 'hidden md:flex'} uppercase leading-[1.6em] text-[12px] font-500 tracking-[2px] hover:text-primary`}>Cart (0)</p>
            </div>
          }
          {menuOpen && (
            <div className="lg:hidden bg-white w-full absolute left-0 top-full border-b border-grayLight ">
              <div className="mx-22 my-4"><NavElement mobile /></div>
              {/* <div className="mx-22 p-4">
                <form className="flex items-center">
                  <input type="text" placeholder="Search" className="flex-1 border-b py-1 text-md outline-none"/>
                  <button className="text-white bg-primary rounded-full p-2 ml-2">
                    <Search size={16} />
                  </button>
                </form>
              </div> */}
            </div>
          )}
        </div>
      </header>
    </>
  );
}

function NavElement({ mobile }: { mobile?: boolean }) {
  return (
    <ul className={`flex ${mobile ? 'flex-col gap-4 p-4' : 'items-center gap-12'} uppercase whitespace-nowrap leading-[1.6em] text-[12px] font-600 tracking-[2px]`}>
      <li className="text-primary hover:text-primary cursor-pointer">HOME</li>
      <li className="hover:text-primary cursor-pointer">PAGES</li>
      <li className="hover:text-primary cursor-pointer">RECIPES</li>
      <li className="hover:text-primary cursor-pointer">BLOG</li>
      <li className="hover:text-primary cursor-pointer">SHOP</li>
      <li className="hover:text-primary cursor-pointer">LANDING</li>
    </ul>
  );
}
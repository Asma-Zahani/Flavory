"use client";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import BottomNavigation from "./BottomNavigation";

export default function Header() {
  const { user } = useContext(UserContext);
  const [showSticky, setShowSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isDesktop = window.innerWidth >= 1100;
      setShowSticky(isDesktop && window.scrollY > 150);
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
      <header className="relative bg-white w-full z-40">
        <div className="mx-10 lg:mx-22">
          <div className="py-8 lg:border-b border-grayLight px-0 flex justify-between w-full">
            <Image src="/logo.svg" alt="Flavory Logo" width={100} height={51} className="h-auto w-[200px]" priority />
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
          <div className="py-5 hidden lg:flex justify-between w-full lg:border-b border-grayLight">
            <nav className="h-full">
              <NavElement />
            </nav>
            {user ? (
              <p className="hidden md:flex uppercase leading-[1.6em] text-[12px] font-500 tracking-[2px] hover:text-primary">Cart (0)</p>
            ) : (
              <p className="hidden md:flex uppercase leading-[1.6em] text-[12px] font-500 tracking-[2px] gap-3">
                <Link href="/login" className="hover:text-primary">Login</Link> / 
                <Link href="/register" className="hover:text-primary">Register</Link>
              </p>
            ) }
          </div>
        </div>
      </header>

      <header className={`fixed top-0 left-0 w-full bg-white border-b border-grayLight z-50 transition-transform duration-700 ease-in-out ${showSticky ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="mx-10 lg:mx-22">
          <div className="py-4 px-0 flex justify-between w-full">
            <Image src="/logo.svg" alt="Flavory Logo" width={200} height={51} className="h-auto w-[120px]" priority />
            <div className="hidden lg:flex"><NavElement /></div>
            <div className="hidden lg:flex items-center ml-6 mx-3">
              <form className="flex items-center">
                <input type="text" placeholder="Search" className="max-w-75 w-[240px] mx-4 border-b py-1 text-md outline-none"/>
                <button className="text-white bg-primary rounded-full p-2">
                  <Search size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <BottomNavigation />
    </>
  );
}

function NavElement({ mobile }: { mobile?: boolean }) {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'HOME' },
    { href: '/about', label: 'ABOUT' },
    { href: '/recipes', label: 'RECIPES' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <ul className={`flex ${mobile ? 'flex-col gap-4 p-4' : 'items-center gap-12'} uppercase whitespace-nowrap leading-[1.6em] text-[12px] font-600 tracking-[2px]`}>
      {links.map(link => (
        <Link key={link.href} href={link.href}>
          <li className={`cursor-pointer hover:text-primary ${pathname === link.href ? 'text-primary' : ''}`}>
            {link.label}
          </li>
        </Link>
      ))}
    </ul>
  )
}

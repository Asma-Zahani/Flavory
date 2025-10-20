/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useContext } from "react";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import BottomNavigation from "./BottomNavigation";
import { SearchContext } from "@/context/SearchContext";

export default function Header() {
  const { user } = useContext(UserContext);
  const { formData, setFormData } = useContext(SearchContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <>
      <header className="relative bg-white w-full z-40">
        <div className="mx-10 lg:mx-22">
          <div className="py-8 lg:border-b border-grayLight flex flex-col lg:flex-row justify-between">
            <div className="flex justify-between">
              <Link href="/"><Image src="/logo.svg" alt="Flavory Logo" width={100} height={51} className="h-auto w-[200px]" priority /></Link>
              <div className="lg:hidden flex items-center">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
            {(pathname === "/recipes" || pathname === "/recipe-category") ?
              <div className="pt-10 lg:py-0 flex items-center justify-center lg:ml-6 lg:mx-3 w-full lg:w-auto">
                <form className="flex items-center w-[90%] gap-3">
                  <div className="flex flex-col w-full">
                    <div className="border-b flex py-1 pb-2 text-md">
                      <div className="flex gap-1 w-[70%] lg:w-50 border-r">
                        <label>What?</label>
                        <input type="text" placeholder="Recipe Title" value={formData.title} onChange={(e) => setFormData((prev: any) => ({ ...prev, title: e.target.value }))} className="w-full outline-none mr-2"/>
                      </div>
                      <input type="text" placeholder="Ingredient Name" value={formData.ingredient} onChange={(e) => setFormData((prev: any) => ({ ...prev, ingredient: e.target.value }))} className="w-[45%] outline-none ml-2"/>
                    </div>
                  </div>
                  <button className="text-white bg-primary rounded-full p-2">
                    <Search size={16} />
                  </button>
                </form>
              </div>
            :
              <div className="hidden lg:flex items-center ml-6 mx-3">
                <form onFocus={() => router.push("/recipes")} className="flex items-center">
                  <input type="text" placeholder="Search" className="max-w-75 w-[240px] mx-4 border-b py-1 text-md outline-none"/>
                  <button className="text-white bg-primary rounded-full p-2">
                    <Search size={16} />
                  </button>
                </form>
              </div>
            }
            {menuOpen && (
              <div className="lg:hidden bg-white w-full absolute left-0 top-full border-b border-grayLight ">
                <div className="mx-22 my-4"><NavElement mobile /></div>
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

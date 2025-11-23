/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useContext, useEffect, useRef } from "react";
import Image from "next/image";
import { CookingPot, Home, Menu, Plus, Search, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { UserContext } from "@/context/UserContext";
import { SearchContext } from "@/context/SearchContext";
import RecipeCard from "../app/(recipes)/RecipeCard";
import { Recipe } from "@/types/recipe";


export function Header() {
  const { user } = useContext(UserContext);
  const { formData, setFormData } = useContext(SearchContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isFavoriteSelected, setIsFavoriteSelected] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  
  const [showSticky, setShowSticky] = useState(false);

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
              <p onClick={() => setIsFavoriteSelected(true)} className="hidden md:flex uppercase leading-[1.6em] text-[12px] font-500 tracking-[2px] hover:text-primary cursor-pointer">Favorites ({user.favorites ? user.favorites.length : 0})</p>
            ) : (
              <p className="hidden md:flex uppercase leading-[1.6em] text-[12px] font-500 tracking-[2px] gap-3">
                <Link href="/login" className="hover:text-primary">Login</Link> / 
                <Link href="/register" className="hover:text-primary">Register</Link>
              </p>
            ) }
          </div>
        </div>
      </header>
      <FavoriteSidebar user={user} isFavoriteSelected={isFavoriteSelected} setIsFavoriteSelected={setIsFavoriteSelected} />
      
      <div className={`fixed bottom-0 left-0 w-full bg-white shadow-[0px_-8px_44px_0px_rgba(20,25,44,0.08)] z-50 transition-transform duration-700 ease-in-out ${showSticky ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mx-10 lg:mx-55">
          <div className="px-8 py-4">
            <div className="flex mx-auto justify-between items-center">
              <Link href="/" className={`${pathname === "/" ? 'text-primary' : 'text-gray'}`}>
                <Home />
              </Link>
              <Link href="/recipes" className={`${(pathname === "/recipes" || pathname === "/recipe-category") ? 'text-primary' : 'text-gray'}`}>
                <CookingPot />
              </Link>
              <Link href="/add-recipe" className={`-mt-[50px] -mx-[20px] transition-all duration-700 ${showSticky ? "" : "translate-y-1/2"}`}>
                <Plus strokeWidth={2} size={24} className="bg-primary text-white rounded-full h-15 w-15 p-3" />
              </Link>
              <Link href="/recipes" className={`${pathname === "/search-recipes" ? 'text-primary' : 'text-gray'}`}>
                <Search />
              </Link>
              <Link href="/user-account" className={`${pathname === "/user-account" ? 'text-primary' : 'text-gray'}`}>
                <UserRound />
              </Link>
            </div>
          </div>
        </div>
      </div>
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

type FavoriteSidebarProps = {user: {favorites: any[]}; isFavoriteSelected: boolean; setIsFavoriteSelected: (value: boolean) => void};

export function FavoriteSidebar({ user, isFavoriteSelected, setIsFavoriteSelected }: FavoriteSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsFavoriteSelected(false);
      }
    };

    if (isFavoriteSelected) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFavoriteSelected, setIsFavoriteSelected]);

  useEffect(() => {
    if (isFavoriteSelected) {
      setIsFavoriteSelected(false);
    }
  }, [pathname]);

  if (!isFavoriteSelected) return null;

  return (
    <div ref={sidebarRef} className={`fixed bottom-0 right-0 w-80 h-full bg-white shadow-[0px_-8px_44px_0px_rgba(20,25,44,0.08)] z-[100] flex flex-col transition-transform duration-500 ease-in-out`}
      data-aos="fade-left" data-aos-duration="500" data-aos-once="true" >
      <button onClick={() => setIsFavoriteSelected(false)} type="button" className="absolute top-3 end-2.5 text-gray hover:text-primary rounded-md w-8 h-8 inline-flex justify-center items-center hover:scale-110">
        <X size={20} />
      </button>

      <div className="my-4 px-4">
        <h2 className="text-xl font-semibold font-garamond tracking-wide text-gray">
          Favorites List
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar">
        {user.favorites?.length > 0 ? (
          user.favorites.map((recipe: Recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} information={false} />
          ))
        ) : (
          <p className="text-sm text-center mt-10">
            You have no favorite recipes yet.
          </p>
        )}
      </div>

      <div className="p-4 border-t border-grayLight">
        <Link onClick={() => setIsFavoriteSelected(false)} href={user.favorites?.length > 0 ? "/user-account/favorites" : "/recipes"} type="button" className="w-full inline-flex justify-center items-center font-raleway text-xs font-semibold tracking-wider uppercase rounded-none outline-none transition-transform duration-200 ease-out px-6 py-3 cursor-pointer text-white bg-primary hover:scale-105">
          {user.favorites?.length > 0 ? "View Favorites" : "View Recipes"}
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <>
      <footer className="mb-14 relative w-full bg-beige bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/pattern-new.png')" }}>
        <div className='flex justify-center py-12 sm:py-16 min-h-[400px]'>
          <div className="flex flex-col justify-center lg:max-w-[30%]">
            <img src="/logo.svg" alt="Flavory Logo" className="h-20 my-6" />
            <p className="text-center font-raleway text-[17px] font-normal text-gray mx-[5%] lg:mx-0">
              Theme especially made for cooking experts, novices & all who enjoy sharing their recipes.
            </p>
            <ul className="relative flex justify-center gap-8 leading-none italic text-[17px] font-serif cursor-pointer my-6">
              <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-19px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                  <a href="#" className="hover:text-primary">fb</a>
              </li>
              <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-19px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                  <a href="#" className="hover:text-primary">tw</a>
              </li>
              <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-19px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                  <a href="#" className="hover:text-primary">ln</a>
              </li>
              <li>
                  <a href="#" className="hover:text-primary">p</a>
              </li>
            </ul>
            <div className="flex justify-center items-center w-full lg:mx-0">
              <form className="w-[80%]">
                <div className="flex border-b border-grayDark">
                  <input type="email" placeholder="Enter your email address here" className="py-2 w-full text-[15px] placeholder:text-gray focus:placeholder:text-black focus:outline-none cursor-pointer"/>
                  <button type="submit" className="ml-2 p-1 flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1">
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24.007px" height="23.361px" viewBox="0 0 24.007 23.361" enableBackground="new 0 0 24.007 23.361">
                          <g><polygon fill="#E35640" points="0.244,10.194 12.244,11.194 13.244,23.194 23.338,0.267 23.244,0.194"/></g>
                      </svg>
                  </button>
                </div>
                <span className="text-[13px] italic mt-1.25 items-start text-[#919191]">*Be informed about the latest recipes & workshops.</span>
              </form>
            </div>
          </div>
          
        </div>

        <hr className="my-4 border-grayLight" />
        <div className="mx-12 pb-4 text-xs flex flex-col sm:flex-row items-center justify-center sm:justify-between font-raleway">
          <div className="flex items-center">
            © {new Date().getFullYear()} Flavory™.
          </div>
          <div>Fabriqué à la main & fait avec ❤️</div>
        </div>
      </footer>
    </>
  );
}
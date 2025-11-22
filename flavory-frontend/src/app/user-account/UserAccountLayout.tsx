"use client";

import { UserContext } from "@/context/UserContext";
import { ReactNode, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { BookOpen, Heart, Key, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import Popup from "@/app/components/Popup";
import { createEntity } from "@/services/EntitesService";
import { SuccessMessageContext } from "@/context/SuccessMessageContext";
import { useRouter } from "next/navigation";

interface NavItem {
  href: string;
  icon: ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/user-account', icon: <LayoutDashboard className="w-5 h-5 ml-8" />, label: 'Dashboard' },
  { href: '/user-account/details', icon: <Key className="w-5 h-5 ml-8" />, label: 'Account Details' },
  { href: '/user-account/favorites', icon: <Heart className="w-5 h-5 ml-8" />, label: 'My Favorites' },
  { href: '/user-account/recipes', icon: <BookOpen className="w-5 h-5 ml-8" />, label: 'My Added Recipes' },
];

interface UserAccountPageProps {
  children: React.ReactNode;
}

export default function UserAccountLayout({ children }: UserAccountPageProps) {
  const { user, setUser, setToken } = useContext(UserContext);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const { setSuccessMessage } = useContext(SuccessMessageContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p>Loading your account...</p>
      </div>
    );
  }

  const handleLogout = async (e?: React.FormEvent) => {
    e?.preventDefault();

    const res = await createEntity("logout", {});
    const data = await res.json(); 

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      setSuccessMessage(data.message);
      router.push('/');
    }
  };

  return (
    <div className="py-12 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <aside className="p-6 bg-white lg:border-r border-grayLight shadow-lg md:shadow-none rounded-l-xl">
            <div className="text-center mb-10">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-3 border-primary">
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl">
                        <Image src={user.profile_photo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${user.profile_photo}` : '/user.jpg'} alt='' width={100} height={100} priority />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800">{user.full_name}</h3>
                <p className="text-sm text-gray-500">Member Since {new Date(user.created_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: undefined})}</p>
            </div>

            <nav>
                <ul>
                  {navItems.map((item) => (
                      <li key={item.href} className="mb-2">
                      <Link href={item.href} className={`flex items-center p-3 rounded-lg transition duration-200 ${pathname === item.href ? 'bg-primaryLight text-primary font-semibold border-l-4 border-primary' : 'text-gray'}`}>
                          <span className="mr-3 text-lg">{item.icon}</span>
                          {item.label}
                      </Link>
                      </li>
                  ))}
                  <li className="mt-6 border-t border-grayLight pt-4">
                      <button onClick={() => {setIsOpen(true)}} className="flex items-center p-3 w-full text-left text-gray transition duration-200">
                          <LogOut className="w-5 h-5 me-3 ml-8" /> Logout
                      </button>
                  </li>
                </ul>
            </nav>
            {isOpen && <Popup icon={<LogOut className="mx-auto mb-4 text-gray" size={56} />} setIsOpen={() => setIsOpen(false)} message="Are you sure you want to log out?" handleConfirm={handleLogout}/>}
        </aside>
        <div className="col-span-2">{children}</div>
      </div>
    </div>
  );
}
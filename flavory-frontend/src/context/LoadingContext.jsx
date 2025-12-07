"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        setLoading(true);

        if (pathname === ("/login" || "register")) {
            const token = localStorage.getItem("token");

            if (token) {
            router.replace("/");
            return;
            }
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [pathname]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && 
        <div className="absolute inset-0 z-50 w-full h-full flex items-center justify-center bg-beige bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/spinner-background.png')" }}>
          <div className="text-center">
            <h2 className="font-allura font-400 text-6xl">Flavory</h2>
            <h2 className="mt-2 font-poppins font-500 text-primary text-sm uppercase tracking-[0.3em]">crafted with Flavor</h2>
          </div>
        </div>
      }
      {!loading && children}
    </LoadingContext.Provider>
  );
}
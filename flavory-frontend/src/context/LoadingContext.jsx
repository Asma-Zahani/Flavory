"use client";

import Loading from "@/components/Loading";
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
      {loading && <Loading />}
      {!loading && children}
    </LoadingContext.Provider>
  );
}
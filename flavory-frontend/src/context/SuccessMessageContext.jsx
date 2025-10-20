"use client";

import { BellRing, X } from "lucide-react";
import { createContext, useEffect, useState } from "react";

export const SuccessMessageContext = createContext();

export function SuccessMessageProvider({ children }) {
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [setSuccessMessage, successMessage]);
    
    return (
        <SuccessMessageContext.Provider value={{ successMessage, setSuccessMessage }}>
            {children}
            {successMessage && 
                <div data-aos="fade-down" data-aos-duration="800" className={`fixed top-15 z-[999] mx-4 sm:right-10 flex items-center p-4 text-primary bg-white shadow-lg 
                    transition-all duration-1000 ease-in-out ${successMessage ? "border-l-4 border-b-1 border-primary" : "border-0"}`} >
                    <div className="flex justify-end absolute py-[8px] w-full -mx-6">
                        <button onClick={() => {setSuccessMessage(null)}} className="ml-auto bg-transparent text-primary rounded-lg p-1.5" >
                            <X/>
                        </button>
                    </div>
                    <BellRing size={20} className="dark:text-white" />
                    <span className="ml-3 text-sm font-medium pr-20">{successMessage}</span>
                </div>
            }
        </SuccessMessageContext.Provider>
    );
}

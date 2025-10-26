"use client";

import { BellRing, X } from "lucide-react";
import { createContext, useEffect, useState } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [setMessage, message]);
    
    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
            {message && 
                <div data-aos="fade-down" data-aos-duration="800" className={`fixed top-15 z-[999] mx-4 sm:right-10 flex items-center p-4 text-primary bg-white shadow-lg 
                    transition-all duration-1000 ease-in-out ${message ? "border-l-4 border-b-1 border-primary" : "border-0"}`} >
                    <div className="flex justify-end absolute py-[8px] w-full -mx-6">
                        <button onClick={() => {setMessage(null)}} className="ml-auto bg-transparent text-primary rounded-lg p-1.5" >
                            <X/>
                        </button>
                    </div>
                    <BellRing size={20} className="dark:text-white" />
                    <span className="ml-3 text-sm font-medium pr-20">{message}</span>
                </div>
            }
        </MessageContext.Provider>
    );
}

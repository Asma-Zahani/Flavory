"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";

export default function Popup ({setIsOpen, icon, message, handleConfirm} : {setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; icon: ReactNode ; message: string, handleConfirm: (e?: React.FormEvent) => void | Promise<void>;}) {
    return (
        <div className={`fixed z-50 w-full h-full inset-0 flex items-center justify-center`}>
            <div className={`fixed inset-0 bg-white/75 transition-opacity`} aria-hidden="true"></div>
            <div className="relative p-4 w-full max-w-md max-h-full" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
                <div className="relative bg-white shadow-[0px_0px_6px_0px] shadow-gray-200">
                    <button onClick={() => setIsOpen(false)} type="button" className="absolute top-3 end-2.5 text-gray hover:text-primary rounded-md w-8 h-8 inline-flex justify-center items-center hover:scale-110">
                        <X size={20} />
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        {icon}
                        <h3 className="mb-5 text-lg max-w-[80%] text-gray dark:text-gray-200 break-words text-wrap mx-auto whitespace-pre-wrap">
                            {message}
                        </h3>
                        <div className="flex items-center rounded-b dark:border-gray-600 justify-center gap-3">
                            <button onClick={handleConfirm} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-10.5 py-3.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                                Yes, I&apos;m sure
                            </button>
                            <button onClick={() => setIsOpen(false)} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-10.5 py-3.5 cursor-pointer z-30 text-primary bg-transparent border border-primary hover:border-2 hover:scale-105 hover:font-bold">
                                No, cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
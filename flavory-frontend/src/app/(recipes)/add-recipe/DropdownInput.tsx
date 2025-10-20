"use client";
import { ChevronDownIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DropdownInputProps {
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  width?: string;
}

export default function DropdownInput({name, value, placeholder, options, onChange, width = "w-full"}: DropdownInputProps) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
        <input name={name} placeholder={placeholder || ""} value={value} onChange={(e) => onChange(e.target.value)} onClick={() => setOpen(!open)} readOnly
            className={`${width} px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out`}/>
        <ChevronDownIcon onClick={() => setOpen(!open)} className={`absolute top-3.5 right-3 text-gray cursor-pointer transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}/>

        {open && (
            <div className="absolute bg-white border border-grayLight rounded-sm top-full left-0 w-full mt-1 z-50 max-h-48 overflow-y-auto shadow-md scrollbar">
            {options.map((opt) => (
                <div key={opt.value} onClick={() => {onChange(opt.value); setOpen(false);}} className={`px-5 py-2 text-sm cursor-pointer hover:text-primary hover:font-bold ${value === opt.value ? "text-primary font-bold" : ""}`}>
                    {opt.label}
                </div>
            ))}
            </div>
        )}
    </div>
  );
}
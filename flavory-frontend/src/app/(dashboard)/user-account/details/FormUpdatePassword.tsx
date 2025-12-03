"use client";

import { useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { updateEntity } from "@/services/EntitesService";
import { MessageContext } from "@/context/MessageContext";
import { useRouter } from "next/navigation";

export default function FormUpdatePassword () {
    const {user} = useContext(UserContext);
    const [inputType, setInputType] = useState("password");
    const [inputType1, setInputType1] = useState("password");
    const [inputType2, setInputType2] = useState("password");
    const [formDataPassword, setFormDataPassword] = useState({ current_password: "", new_password: "", new_password_confirmation: "" });

    const router = useRouter();

    const [loadingPassword, setLoadingPaddword] = useState(false);
    const { setMessage } = useContext(MessageContext);


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormDataPassword({ ...formDataPassword, [name]: value });
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingPaddword(true);

        const res = await updateEntity("updatePassword", user.id, formDataPassword);
        const data = await res.json(); 

        setLoadingPaddword(false);
        if (res.ok) {
            setMessage(data.message);
            router.push('/user-account'); 
            setFormDataPassword({ current_password: "", new_password: "", new_password_confirmation: "" });
        }   
    };

    return (
        <form className="w-full">
            <div>
                <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">Password *</label>
                <div className="relative">
                    <input name="current_password" type={inputType} value={formDataPassword.current_password} onChange={handlePasswordChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
                    <div className="absolute top-1/4 right-4">
                    <span onClick={() => setInputType(inputType === "password" ? "text" : "password")} className="text-primary cursor-pointer text-sm font-semibold" > 
                        {inputType === "password" ? "Show" : "Hide"}
                    </span>
                    </div>
                </div>
            </div>
            <div>
                <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">New Password *</label>
                <div className="relative">
                    <input name="new_password" type={inputType1} value={formDataPassword.new_password} onChange={handlePasswordChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
                    <div className="absolute top-1/4 right-4">
                    <span onClick={() => setInputType1(inputType1 === "password" ? "text" : "password")} className="text-primary cursor-pointer text-sm font-semibold" > 
                        {inputType1 === "password" ? "Show" : "Hide"}
                    </span>
                    </div>
                </div>
            </div>
            <div>
                <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">Confirm New Password *</label>
                <div className="relative">
                    <input name="new_password_confirmation" type={inputType2} value={formDataPassword.new_password_confirmation} onChange={handlePasswordChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
                    <div className="absolute top-1/4 right-4">
                    <span onClick={() => setInputType2(inputType2 === "password" ? "text" : "password")} className="text-primary cursor-pointer text-sm font-semibold" > 
                        {inputType2 === "password" ? "Show" : "Hide"}
                    </span>
                    </div>
                </div>
            </div>
            <button onClick={handleChangePassword} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                {loadingPassword ? "Changing..." : "Change Password"}
            </button>
        </form>
    );
};
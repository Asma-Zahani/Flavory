/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import FileInput from "@/components/FileInput";
import { updateEntity } from "@/services/EntitesService";
import { SuccessMessageContext } from "@/context/SuccessMessageContext";
import { useRouter } from "next/navigation";

export default function FormUserInfo () {
    const {user, setUser} = useContext(UserContext);
    const [formData, setFormData] = useState({ first_name: user.first_name ?? "", last_name: user.last_name ?? "", email: user.email ?? "", image: user.profile_photo ?? [] as File[]});
    const [previewImages, setPreviewImages] = useState<string[]>(formData.image && formData.image.length > 0 ? [`${process.env.NEXT_PUBLIC_BACKEND_URL}${formData.image}`] : []);

    const router = useRouter();
    const { setSuccessMessage } = useContext(SuccessMessageContext);

    const [loadingInfo, setLoadingInfo] = useState(false);

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdateInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingInfo(true);

        const res = await updateEntity("users", user.id, formData);
        const data = await res.json(); 

        let urls: string[] = [];
        
        if (Array.isArray(formData.image)) {
            const uploadPromises = formData.image.map(async (file: string | Blob) => {
                const fd = new FormData();
                fd.append("file", file);
                fd.append("type", "user");
                fd.append("user_id", user.id.toString());

                const res = await fetch("/api/upload", { method: "POST", body: fd });
                const data = await res.json();
                
                return data.url;
            });

            urls = await Promise.all(uploadPromises);
        }

        setLoadingInfo(false);
        if (res.ok) {
            setSuccessMessage(data.message);
            router.push('/user-account'); 
            setUser({
                ...user,
                first_name: formData.first_name,
                last_name: formData.last_name,
                full_name : formData.first_name + ' ' + formData.last_name,
                email: formData.email,
                profile_photo: Array.isArray(formData.image) ?? urls[0],
            });
        }   
    };

    return ( 
        <form className="w-full">
            <div className="flex flex-col sm:flex-row gap-x-3">
                <p className="flex-1">
                    <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">First Name *</label>
                    <input name="first_name" type="text" value={formData.first_name} onChange={handleChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
                </p>
                <p className="flex-1">
                    <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">Last Name *</label>
                    <input name="last_name" type="text" value={formData.last_name} onChange={handleChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
                </p>
            </div>
            <p>
                <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">Email address *</label>
                <input name="email" type="text" value={formData.email} onChange={handleChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
            </p>
            <div>
                <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">Profile Photo</label>
                <div className="mt-2">
                    <FileInput multiple={false} previewImages={previewImages} setPreviewImages={setPreviewImages} onChange={(file) => setFormData((prev: any) => ({ ...prev, image: file }))}/>
                </div>
            </div> 
            <button onClick={handleUpdateInfo} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                {loadingInfo ? "Updating..." : "Update Info"}
            </button>  
        </form>
    );
};
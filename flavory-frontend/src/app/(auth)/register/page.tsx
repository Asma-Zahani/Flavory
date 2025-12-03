/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FileInput from "@/components/FileInput";
import { MessageContext } from "@/context/MessageContext";
import { createEntity } from "@/services/EntitesService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  
  const [inputType, setInputType] = useState("password");
  const [inputType1, setInputType1] = useState("password");
  const [formData, setFormData] = useState({ first_name: "", last_name: "", email: "", password: "", password_confirmation: "", image: [] as File[]});
  const [error, setError] = useState("");
  const { setMessage } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.replace("/");
    }
  }, [router]);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await createEntity("register", formData);
    const data = await res.json(); 

    console.log(data);
    
    const userId = data.user_id;
    
    if (formData.image) {
      const fd = new FormData();
      fd.append("file", formData.image[0]);
      fd.append("type", "user");
      fd.append("user_id", userId.toString());

      await fetch("/api/upload", { method: "POST", body: fd });
    }

    setLoading(false);
    if (res.ok) {
      setMessage(data.message);
      router.push('/login');
    } else {
      setError(data.message || "Register failed");
    }
  };

  return (
    <div className="py-12 sm:py-20">
      {error && 
        <div className="border border-grayLight text-gray px-8 py-5 mb-4">{error}</div>
      }
      <h2 className="font-garamond font-500 text-[44px] my-6 break-words leading-[1.09em]">Register</h2>
      <form className="max-w-150 w-full" onSubmit={handleRegister}>
        <div className="flex flex-col sm:flex-row gap-x-3">
          <p>
            <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">First Name *</label>
            <input name="first_name" type="text" value={formData.first_name} onChange={handleChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
          </p>
          <p>
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
          <div className="mt-2"><FileInput previewImages={previewImages} setPreviewImages={setPreviewImages} onChange={(file) => setFormData((prev: any) => ({ ...prev, image: file }))}/></div>
        </div>
        <div>
          <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">Password *</label>
          <div className="relative">
            <input name="password" type={inputType} value={formData.password} onChange={handleChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
            <div className="absolute top-1/4 right-4">
              <span onClick={() => setInputType(inputType === "password" ? "text" : "password")} className="text-primary cursor-pointer text-sm font-semibold" > 
                {inputType === "password" ? "Show" : "Hide"}
              </span>
            </div>
          </div>
        </div>
        <div>
          <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">Confirm Password *</label>
          <div className="relative">
            <input name="password_confirmation" type={inputType1} value={formData.password_confirmation} onChange={handleChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
            <div className="absolute top-1/4 right-4">
              <span onClick={() => setInputType1(inputType1 === "password" ? "text" : "password")} className="text-primary cursor-pointer text-sm font-semibold" > 
                {inputType1 === "password" ? "Show" : "Hide"}
              </span>
            </div>
          </div>
        </div>
        <button type="submit" disabled={loading} className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary border border-transparent">
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-2.5 cursor-pointer">Already have an account? <Link href="/login" className="underline text-primary font-500">Log In</Link></p>
      </form>
    </div>
  );
}
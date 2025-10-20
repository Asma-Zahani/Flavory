"use client";
import { SuccessMessageContext } from "@/context/SuccessMessageContext";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { setToken } = useContext(UserContext);

  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState({email: "", password: "", isChecked: false}); 
  const [error, setError] = useState("");
  const { setSuccessMessage } = useContext(SuccessMessageContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.replace("/");
    }
  }, [router]);

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        if (data.rememberToken) {localStorage.setItem('rememberToken', data.rememberToken)};
        router.push('/');
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    }
  };

  const searchParams = useSearchParams();
  const [verifToken, setVerifToken] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) setVerifToken(token);    
  }, [searchParams]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({token: verifToken}),
        });
        const data = await res.json();

        if (data.message) {
          setSuccessMessage(data.message);
          setVerifToken(null);
          const url = new URL(window.location.href);
          url.searchParams.delete("token");
          window.history.replaceState({}, "", url.toString());
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (verifToken) fetchData();
  }, [setSuccessMessage, verifToken]);

  return (
    <div className="py-12 sm:py-20">
      {error && <p className="mb-4">{error}</p>}
      <h2 className="font-garamond font-500 text-[44px] my-6 break-words leading-[1.09em]">Login</h2>
      <form className="max-w-150 w-full" onSubmit={handleLogin}>
        <p>
          <label className="font-raleway font-400 text-gray text-[15px] leading-[1.6em]">Email address *</label>
          <input name="email" type="text" value={formData.email} onChange={handleChange} className="relative inline-block w-full mt-2 mb-5 px-5 py-3 text-[15px] leading-[23px] font-400 border border-gray outline-0 cursor-pointer transition-colors duration-200 ease-out focus:border-black"/>
        </p>
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
        <div className="mb-6 flex justify-between">
          <label className="flex items-center cursor-pointer text-sm text-gray">
              <input type="checkbox" checked={formData.isChecked} onChange={() => {setFormData({ ...formData, isChecked: !formData.isChecked })}} className="hidden"/>
              <span className={`appearance-none w-4 h-4 mr-2 rounded-sm ${formData.isChecked ? 'bg-primary' : 'border border-gray'} flex items-center justify-center`}>
                  {formData.isChecked && <span className="text-white text-sm">✔</span>}
              </span>
              Remember me
          </label>
          <Link href="#" className="cursor-pointer underline text-primary font-500">Forgot Password ?</Link>
        </div>
        <button type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary border border-transparent">
          Log in
        </button>
        <p className="mt-2.5 cursor-pointer">Don&apos;t have an account? <Link href="/register" className="underline text-primary font-500">Sign Up</Link></p>
      </form>
    </div>
  );
}
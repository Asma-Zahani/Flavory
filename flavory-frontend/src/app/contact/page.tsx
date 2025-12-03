/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Facebook, Instagram, Mail } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({name: "", email: "", message: ""});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='py-12 sm:py-20'>
      <h1 className='mb-14 font-500 font-garamond text-[52px] leading-[1.19em]'>Contact Us</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[70%]">
            <input name="name" type="text" placeholder="Name*" value={formData.name} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
            <input name="email" type="email" placeholder="Email*" value={formData.email} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
            <textarea name="message" placeholder="Message*" value={formData.message} onChange={handleChange} className='w-full scrollbar h-33 mb-4 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none'/>
            <button type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                Send Message
            </button>
        </div>
        <div className="w-full lg:w-[30%] space-y-6">
          <div>
            <h2 className="font-garamond text-3xl font-bold mb-2">Get in Touch</h2>
            <p className="text-gray">
              We&apos;d love to hear from you! Reach out if you have any questions, suggestions or feedback.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-primary" />
            <span className="text-gray">flavory.app.contact@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Facebook className="w-6 h-6 text-primary" />
            <a href="#" className="text-gray hover:underline">Flavory</a>
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="w-6 h-6 text-primary" />
            <a href="#" className="text-gray hover:underline">@flavory_app</a>
          </div>
        </div>
      </div>
    </div>
  );
}

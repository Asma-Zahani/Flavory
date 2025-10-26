"use client";

import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
    }, []);

    return (
        <div className="py-12 sm:py-20 flex flex-col">
            <div>
                <h1 data-aos="fade-down" className="font-garamond font-500 text-[52px] leading-[1.2em] italic max-w-[80%] mb-10">Hello, It&apos;s Flavory. Welcome to recipes blog and food heaven!</h1>
                <Image src="/about-img.jpg" alt="" width={1500} height={366} priority />
                <div data-aos="fade-up" data-aos-delay="100" className="text-gray my-6 text-lg leading-relaxed space-y-6">
                    <p>Welcome to <span className="font-semibold">Flavory</span>, your ultimate destination for discovering and sharing the authentic taste of Tunisia! We’re a vibrant community of food lovers, home cooks, and professional chefs passionate about celebrating the richness of Tunisian cuisine and culture.</p>
                    <p>Whether you’re here to explore traditional dishes, discover modern twists, or share your own creations,{" "} <span className="font-semibold">Flavory</span> {" "} brings everyone together around one table — full of flavor, color, and creativity. </p>
                </div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
                <h2 className="font-garamond font-500 text-[44px] leading-[1.09em] my-6">Where I find inspiration</h2>
                <div data-aos="fade-up" data-aos-delay="100" className="my-6 text-gray text-lg leading-relaxed space-y-6">
                    <p>We believe that food is more than just nourishment — it&apos;s a way to connect, to remember, and to create joy. Each recipe tells a story, passed down from one generation to another, filled with the aromas of home and the warmth of shared moments.</p>
                    <p>From the golden couscous and spicy harissa to sweet makroud and comforting lablabi — our community celebrates every aspect of Tunisian gastronomy.</p>
                </div>
                
                <ul className="relative flex flex-col pl-6 mt-4 space-y-2 text-gray text-lg leading-relaxed">
                    <li className="relative before:content-[''] before:absolute before:top-1/2 before:translate-y-[-50%] before:left-[-14px] before:w-[8px] before:h-[0.5px] before:bg-gray last:before:hidden">Sharing the beauty and diversity of Tunisian dishes</li>
                    <li className="relative before:content-[''] before:absolute before:top-1/2 before:translate-y-[-50%] before:left-[-14px] before:w-[8px] before:h-[1px] before:bg-gray last:before:hidden">Preserving culinary traditions for future generations</li>
                    <li className="relative before:content-[''] before:absolute before:top-1/2 before:translate-y-[-50%] before:left-[-14px] before:w-[8px] before:h-[1px] before:bg-gray last:before:hidden">Encouraging creativity and collaboration among food enthusiasts</li>
                    <li></li>
                </ul>
            </div>

            <div data-aos="zoom-in" className="relative w-full bg-beige bg-cover bg-center bg-no-repeat p-2 my-8" style={{ backgroundImage: "url('/pattern-new.png')" }}>
                <div className="border border-primary grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
                    {/* <div className="flex items-center pt-25">
                        <h2 className="font-dancing font-400 text-primary text-[40px] pr-6">Our newsletter</h2>
                        <Image src={"leafs/decorative_leaf_2.svg"} alt="" width={120} height={150} priority />
                    </div> */}
                    <div className="relative flex justify-center items-center mt-10 lg:mt-0">
                        <Image src={"leafs/decorative_leaf_2.svg"} alt="" width={120} height={150} priority className="hidden lg:flex" />
                        <Image src={"/books-img.png"} alt="" width={240} height={305} priority className="" />
                    </div>
                    <div className="my-10 lg:my-23">
                        <h3 className='font-garamond text-[38px] font-500 leading-[1.1em] my-6 lg:w-[70%] mx-[9%] lg:mx-0'>The new book is out. Enjoy every meal!</h3>
                        <form className="my-4 flex items-center border-b border-grayDark w-[90%] mx-[5%] lg:mx-0">
                            <input type="email" placeholder="Enter your email address here" className="py-2 w-full text-[15px] placeholder:text-gray focus:placeholder:text-black focus:outline-none cursor-pointer"/>
                            <button type="submit" className="ml-2 p-1 flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24.007px" height="23.361px" viewBox="0 0 24.007 23.361" enableBackground="new 0 0 24.007 23.361">
                                    <g><polygon fill="#E35640" points="0.244,10.194 12.244,11.194 13.244,23.194 23.338,0.267 23.244,0.194"/></g>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200">
                <h2 className="font-garamond font-500 text-[44px] leading-[1.09em] my-6">Join Our Culinary Journey</h2>
                <div data-aos="fade-up" data-aos-delay="100" className="my-6 text-gray text-lg leading-relaxed space-y-6">
                    <p>Our mission is to make Tunisian recipes accessible to everyone — whether you’re cooking for the first time or mastering your favorite classics. You can explore, save your favorite recipes, leave reviews, comment, and even publish your own creations.</p>
                    <p>Every contribution makes this community stronger, tastier, and more inspiring.</p>
                </div>
            </div>

            <div className="relative flex items-center my-4">
                <p className='text-3xl pr-3 leading-tight font-garamond font-500'>Follow us :</p>
                <ul className="relative flex gap-5 leading-none italic text-[17px] font-serif cursor-pointer mt-2">
                    <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-14px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                        <a href="#" className="hover:text-primary">fb</a>
                    </li>
                    <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-14px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                        <a href="#" className="hover:text-primary">tw</a>
                    </li>
                    <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-14px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                        <a href="#" className="hover:text-primary">ln</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-primary">p</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
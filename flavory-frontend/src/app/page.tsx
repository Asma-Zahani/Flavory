"use client";

import { Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import RecipeCard from "./(recipes)/RecipeCard";

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      easing: "ease-in-sine",
    });
  }, []);

  useEffect(() => {
      fetch(`/api/recipes/latest/8`)
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error(err));
  }, []);  
  
  return (
    <div className="pt-12 sm:pt-20">
      <div>
        <div className="grid grid-cols-3 gap-6">
          <Image src={"/home/img1.jpg"} alt="" width={500} height={500} />
          <div className="col-span-2">
            <div className="grid grid-cols-2 gap-6">
              <Image src={"/home/img2.jpg"} alt="" width={500} height={500} />
              <Image src={"/home/img3.jpg"} alt="" width={500} height={500} />
              <Image src={"/home/img4.jpg"} alt="" width={500} height={500} />
              <div className="relative w-full bg-cover bg-center bg-no-repeat p-2 flex items-center justify-center" style={{ backgroundImage: "url('/home/img5.jpg')" }}>
                <div className="flex flex-col items-center justify-center p-7.5 text-center">
                  <h4 className="text-3xl font-dancing text-primary">Sign up for</h4>
                  <h2 className="text-[44px] font-garamond font-500 leading-[1.09]">Workshop</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-20">
        <h2 className="font-dancing font-400 text-primary text-[40px] mb-6">Start using your kitchen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recipes.length > 0 && recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} information={false} /> 
          ))}
        </div>
      </div>
      <div className="relative w-full bg-beige bg-cover bg-center bg-no-repeat p-2" style={{ backgroundImage: "url('/pattern-new.png')" }}>
        <div className="border border-primary flex flex-col items-center justify-center">
          <div className="flex items-center pt-25">
            <h2 className="font-dancing font-400 text-primary text-[40px] pr-6">Our newsletter</h2>
            <Image src={"/leafs/decorative_leaf_3.svg"} alt="" width={56} height={66} />
          </div>
          <h3 className='text-center font-garamond text-[38px] font-500 leading-[1.1em] my-6 px-0 lg:px-[13%]'>Subscribe to our newsletter & keep up with our latest recipes and organized workshops.</h3>
          <form className="mt-4 flex items-center border-b border-grayDark w-[90%] md:w-[80%] lg:w-[60%] mb-25">
              <input type="email" placeholder="Enter your email address here" className="py-2 w-full text-[15px] placeholder:text-gray focus:placeholder:text-black focus:outline-none cursor-pointer"/>
              <button type="submit" className="ml-2 p-1 flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24.007px" height="23.361px" viewBox="0 0 24.007 23.361" enableBackground="new 0 0 24.007 23.361">
                      <g><polygon fill="#E35640" points="0.244,10.194 12.244,11.194 13.244,23.194 23.338,0.267 23.244,0.194"/></g>
                  </svg>
              </button>
          </form>
        </div>
      </div>
      <div className="my-25">
        <h2 className="font-dancing font-400 text-primary text-[40px] mb-6">Easy ways to decorate a shrimp soup</h2>
        <div className="relative inline-block align-middle">
          <Image src="/video-img.jpg" alt="" width={1500} height={366} />
          <button onClick={() => setIsOpen(true)} className="absolute top-0 left-0 w-full h-full z-1 flex items-center justify-center leading-0.25 text-[106px]">
            <span className="block group">
              <svg className="transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="72px" height="70px" viewBox="0 0 72 70" enableBackground="new 0 0 72 70">
                <circle fill="#FFFFFF" cx="36.064" cy="35.064" r="35"/><path fill="#E35640" d="M29.314,26.35v17.43l13.943-8.715L29.314,26.35z M39.905,35.064l-8.81,5.495v-10.99L39.905,35.064z"/>
                <path className="opacity-0 group-hover:opacity-100 fill-[#E35640] transition-opacity duration-300" d="M29.314,26.35v17.43l13.943-8.715L29.314,26.35z"/>
              </svg>
            </span>
          </button>
          {isOpen && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
                {/* Bouton fermer */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-2 text-white text-3xl font-bold hover:text-red-500"
                >
                  &times;
                </button>

                {/* Iframe Vimeo */}
                <iframe
                  src="https://player.vimeo.com/video/293001942?autoplay=1"
                  width="100%"
                  height="100%"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="my-25 mb-30">
        <div className="flex items-center justify-center text-center">
            <h2 className="max-w-100 font-garamond italic font-500 text-xl leading-[1.25em] mb-6 break-words">Share Your Meals on Instagram with <span className="text-primary">#plumaward</span> & We Will Reward the Meal of the Month!</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {[...Array(6)].map((_, index) => (
            <Image key={index} src={`/share/insta-img${index + 1}.jpg`} alt="" width={300} height={300} /> 
          ))}
        </div>
      </div>
    </div>
  );
}

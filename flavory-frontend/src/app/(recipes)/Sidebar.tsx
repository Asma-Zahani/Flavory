/* eslint-disable @next/next/no-img-element */
'use client'; // si tu utilises useState ou autres hooks

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Sidebar() {
  return (
    <aside>
        <div className="relative">
            <Image src="/workshop.jpg" alt="Workshop" width={900} height={1000} priority />
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="flex flex-col items-start justify-end p-[30px]">
                <h4 className="absolute text-3xl left-0 bottom-[21px] bg-white text-primary font-dancing px-[43px] pl-[39px] py-[9px] transform transition-transform duration-300 hover:-translate-x-3 cursor-pointer">
                    Workshop
                </h4>
                </div>
            </div>
        </div>
        {/* <div className='mt-10'>
            <div className="flex items-center my-2 py-4 after:content-[''] after:flex-1 after:border-t after:border-grayLight after:mt-1.5 after:ml-3">
                <p className="text-2xl font-500 font-garamond">Latest Recipes</p>
            </div>
        </div> */}
        <div className='mt-10'>
            <div className="flex items-center my-2 py-4 after:content-[''] after:flex-1 after:border-t after:border-grayLight after:mt-1.5 after:ml-3">
                <p className="text-2xl font-500 font-garamond">Categories</p>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
                <CategoryLink category="row food" imageSrc="/categories/row_food.svg" />
                <CategoryLink category="meat" imageSrc="/categories/meat.svg" />
                <CategoryLink category="snacks" imageSrc="/categories/snacks.svg" />
                <CategoryLink category="desserts" imageSrc="/categories/desserts.svg" />
                <CategoryLink category="main dish" imageSrc="/categories/main_dish.svg" />
                <CategoryLink category="breakfast" imageSrc="/categories/breakfast.svg" />
            </div>
        </div>
        <div className='mt-10'>
            <div className="flex items-center py-4 after:content-[''] after:flex-1 after:border-t after:border-grayLight after:mt-1.5 after:ml-3">
                <p className="text-2xl font-500 font-garamond">Subscribe</p>
            </div>
            <p className='font-garamond text-xl font-500'>Subscribe to our newsletter and be informed about new recipes & workshops.</p>
            <form className="mt-4 flex items-center border-b border-grayDark">
                <input type="email" placeholder="Enter your email address here" className="py-2 w-full text-[15px] placeholder:text-gray focus:placeholder:text-black focus:outline-none cursor-pointer"/>
                <button type="submit" className="ml-2 p-1 flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24.007px" height="23.361px" viewBox="0 0 24.007 23.361" enableBackground="new 0 0 24.007 23.361">
                        <g><polygon fill="#E35640" points="0.244,10.194 12.244,11.194 13.244,23.194 23.338,0.267 23.244,0.194"/></g>
                    </svg>
                </button>
            </form>
        </div>
    </aside>
  );
}

interface CategoryLinkProps {
  category: string;
  imageSrc: string;
}

export function CategoryLink({ category, imageSrc }: CategoryLinkProps) {
  const urlCategory = encodeURIComponent(category.toLowerCase());
  return (
    <Link href={`/recipe-category?category=${urlCategory}`}>
      <article className='flex items-center gap-3 cursor-pointer'>
        <img 
          src={imageSrc} 
          alt={category} 
          className='transform transition-transform duration-300 hover:-translate-y-1'
        />
        <p className='uppercase text-primary font-raleway text-xs font-600 leading-[1.6em] tracking-[0.3em]'>
          {category}
        </p>
      </article>
    </Link>
  );
}
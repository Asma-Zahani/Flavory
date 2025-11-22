"use client";
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Recipe } from '@/types/recipe';
import Sidebar from '../Sidebar';
import { useSearchParams } from 'next/navigation';
import RecipeCard from '../RecipeCard';
import { SearchContext } from '@/context/SearchContext';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipeCategoryPage () {
    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const { formData } = useContext(SearchContext);

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        fetch(`/api/recipes/category/${category}?title=${formData.title}&category=${formData.category}`)
        .then(res => res.json())
        .then(data => setRecipes(data))
        .catch(err => console.error(err));
    }, [category, formData]);

    return (
        <div className='py-12 sm:py-20'>
            <h1 className='mb-14 font-500 font-garamond text-[52px] italic leading-[1.19em]'>Filter by category</h1>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className='col-span-2 px-0 sm:px-6'>
                    {recipes.length > 0 ?
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                            {recipes.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} information={true} /> 
                            ))} 
                        </div>
                        : (
                            <div className="flex flex-col items-center justify-center">
                                <Image src="/recipe_empty.svg" alt={""} width={300} height={10} className="my-5"/>
                                <h1 className="text-4xl font-garamond font-bold mb-4 text-center">
                                    No recipes in this category yet.
                                </h1>

                                <p className="text-gray text-center max-w-xl mb-4">
                                    Try adding one and be the first to share something delicious here!
                                </p>
                                <div className="p-4">
                                    <Link href="/add-recipe" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                                        Add Recipe
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className='col-span-2 lg:col-span-1 px-0 lg:px-6 mt-3 lg:mt-0'>
                    <Sidebar/>
                </div>
            </div>
        </div>  
    );
};
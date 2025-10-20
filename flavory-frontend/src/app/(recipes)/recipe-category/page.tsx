"use client";
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Recipe } from '@/types/recipe';
import Sidebar from '../Sidebar';
import { useSearchParams } from 'next/navigation';
import RecipeCard from '../RecipeCard';
import { SearchContext } from '@/context/SearchContext';

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
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                        {recipes.length > 0 && recipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} information={true} /> 
                        ))}
                    </div>
                </div>
                <div className='col-span-2 lg:col-span-1 px-0 lg:px-6 mt-3 lg:mt-0'>
                    <Sidebar/>
                </div>
            </div>
        </div>  
    );
};
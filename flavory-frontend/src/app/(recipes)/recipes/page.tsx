"use client";
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Recipe } from '@/types/recipe';
import RecipeCard from '../RecipeCard';
import Sidebar from '../Sidebar';
import { SearchContext } from '@/context/SearchContext';

export default function RecipesPage () {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const { formData } = useContext(SearchContext);

    useEffect(() => {
        fetch(`/api/recipes/?title=${formData.title}&ingredient=${formData.ingredient}`)
        .then(res => res.json())
        .then(data => setRecipes(data))
        .catch(err => console.error(err));
    }, [formData]);
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 sm:py-20">
            <div className='col-span-2 px-0 sm:px-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                    {recipes.length > 0 && recipes.map((recipe) => (
                       <RecipeCard key={recipe.id} recipe={recipe} information={true} favorite={false} /> 
                    ))}
                </div>
            </div>
            <div className='col-span-2 lg:col-span-1 px-0 lg:px-6 mt-3 lg:mt-0'>
                <Sidebar/>
            </div>
        </div>
    );
};
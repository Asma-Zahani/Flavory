"use client";
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { Recipe } from '@/types/recipe';
import RecipeCard from '../RecipeCard';
import Sidebar from '../Sidebar';
import { SearchContext } from '@/context/SearchContext';
import Pagination from "../../../components/Pagination";
import Image from 'next/image';
import Link from 'next/link';

export default function RecipesPage () {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [page, setPage] = useState(1); 
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 10,
        total: 0
    });
    const { formData } = useContext(SearchContext);

    useEffect(() => {
        fetch(`/api/recipes/?title=${formData.title}&ingredient=${formData.ingredient}&page=${page}`)
        .then(res => res.json())
        .then(data => {
            setRecipes(data.data);
            setPagination({
                current_page: data.current_page,
                per_page: data.per_page,
                total: data.total
            });
        })
        .catch(err => console.error(err));
    }, [formData, page]);
    
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 sm:py-20">
            <div className='col-span-2 px-0 sm:px-6'>
                {recipes.length > 0 ? (
                    <>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                            {recipes.map((recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} information={true} />
                            ))}
                        </div>
                        <Pagination currentPage={pagination.current_page} totalItems={pagination.total} itemsPerPage={pagination.per_page} onPageChange={handlePageChange}/>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/recipe_empty.svg" alt={""} width={300} height={10} className="my-5"/>
                        <h1 className="text-4xl font-garamond font-bold mb-4 text-center">
                            No Recipes Found!
                        </h1>

                        <p className="text-gray text-center max-w-xl mb-4">
                            There are no recipes available right now. Try adding a new recipe to share your culinary creations with the world!    
                        </p>
                        <div className="p-4">
                            <Link href="/add-recipe" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                                Add Recipe
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div className='col-span-2 lg:col-span-1 px-0 lg:px-6 mt-3 lg:mt-0'>
                <Sidebar/>
            </div>
        </div>
    );
};
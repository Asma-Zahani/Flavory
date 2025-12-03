"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

import Link from "next/link";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/app/(recipes)/RecipeCard";
import Image from "next/image";
import DashboardLayout from "../../DashboardLayout";

export default function FavoritePage () {
    const {user} = useContext(UserContext);
    const favorites = user?.favorites || [];
    
    return (
        <DashboardLayout>
            <div className="px-8 py-4 flex flex-col min-h-[400px]">
                {favorites.length > 0 ? (
                    <>
                        <h1 className="mb-6 font-500 font-garamond text-[40px] leading-[1.19em]">Favorites</h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {favorites.map((recipe: Recipe) => (
                                <RecipeCard key={recipe.id} recipe={recipe} information={false} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/recipe_favorite_empty.svg" alt={""} width={300} height={10} className="my-5"/>
                        <h1 className="text-4xl font-garamond font-bold mb-4 text-center">
                            No favorites Yet!
                        </h1>
                        
                        <p className="text-gray text-center max-w-xl mb-4">
                            You haven&apos;t added any favorite recipes yet. Start exploring delicious dishes and save the ones you love!
                        </p>
                        <div className="p-4">
                            <Link href="/recipes" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                                View Recipes
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
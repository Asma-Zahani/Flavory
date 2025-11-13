"use client";

import RecipeCard from "@/app/(recipes)/RecipeCard";
import { UserContext } from "@/context/UserContext";
import { Recipe } from "@/types/recipe";
import Link from "next/link";
import { useContext } from "react";

export default function FavoritePage() {
    const { user } = useContext(UserContext);

    const favorites = user?.favorites || [];

    return (
        <div className="py-12 sm:py-20">
            <h1 className="mb-14 font-500 font-garamond text-[52px] leading-[1.19em]">Favorites</h1>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {favorites.map((recipe: Recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} information={false} favorite={true} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <p className="text-center mt-5">
                        You have no favorite recipes yet.
                    </p>
                    <div className="p-4">
                        <Link href="/recipes" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                            View Recipes
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
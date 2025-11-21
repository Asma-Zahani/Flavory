"use client";

import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";

import UserAccountLayout from "../UserAccountLayout";
import Link from "next/link";
import Image from "next/image";
import AddedRecipesTable from "./AddedRecipesTable";
import { deleteEntity } from "@/services/EntitesService";
import { SuccessMessageContext } from "@/context/SuccessMessageContext";
import { Recipe } from "@/types/recipe";

export default function FavoritePage () {
    const {user} = useContext(UserContext);
    const { setSuccessMessage } = useContext(SuccessMessageContext);
    
    const [recipes, setRecipes] = useState(user?.recipes || []);

    useEffect(() => {
        if (user?.recipes) {
            setRecipes(user.recipes);
        }
    }, [user]);

    const onDelete = async (recipeId: number) => {        
        const res = await deleteEntity("recipes", recipeId);
        const data = await res.json(); 
        if (res.ok) {
            setSuccessMessage(data.message);
            setRecipes((prev: Recipe[]) => prev.filter(recipe => recipe.id !== recipeId));
        }   
    };

    return (
        <UserAccountLayout>
            <div className="px-8 py-4 flex flex-col min-h-[400px]">
                {recipes.length > 0 ? (
                    <>
                        <div className="flex justify-between items-start">
                            <h1 className="mb-6 font-500 font-garamond text-[40px] leading-[1.19em]">Added Recipes</h1>
                            <Link href="/add-recipe" className="inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                                Add Recipe
                            </Link>
                        </div>
                        <AddedRecipesTable recipes={recipes} onDelete={onDelete} />
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Image src="/recipe_add_empty.svg" alt={""} width={300} height={10} className="my-5"/>
                        <h1 className="text-4xl font-garamond font-bold mb-4 text-center">
                            No recipes Yet!
                        </h1>
                        
                        <p className="text-gray text-center max-w-xl mb-4">
                            You haven&apos;t added any recipes yet. Start creating and sharing your culinary ideas with the world!
                        </p>
                        <div className="p-4">
                            <Link href="/add-recipe" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                                Add Recipe
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </UserAccountLayout>
    );
};
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RecipeIngredient, Steps } from "@/types/recipe";
import { useContext, useEffect, useState } from "react";
import {createEntity} from "@/services/EntitesService"
import { UserContext } from "@/context/UserContext";
import { SuccessMessageContext } from "@/context/SuccessMessageContext";
import { useRouter } from "next/navigation";
import RecipeForm from "../RecipeForm";

export default function AddRecipePage () {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const { setSuccessMessage } = useContext(SuccessMessageContext);

    const [formData, setFormData] = useState({author_id: user?.id, title: "", image: "", description: "", category: "", cookingTime: "", difficulty: "",
        numberPerson: "", fat: "", protein: "", sugars: "", calories: "", carbs: "" });

    const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
    const [recipeSteps, setRecipeSteps] = useState<Steps[]>([]);

    useEffect(() => {
        if (formData.fat && formData.protein && formData.carbs) {
            const fat = parseFloat(formData.fat) || 0;
            const protein = parseFloat(formData.protein) || 0;
            const carbs = parseFloat(formData.carbs) || 0;

            const calories = fat * 9 + protein * 4 + carbs * 4;
            const sugars = carbs * 0.3;

            setFormData((prev: any) => ({
                ...prev,
                calories: calories.toFixed(1),
                sugars: sugars.toFixed(1),
            }));
        }
    }, [formData.fat, formData.protein, formData.carbs, setFormData]);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        const formattedFormData = {
            ...formData,
            fat: parseInt(formData.fat) || 0,
            protein: parseInt(formData.protein) || 0,
            carbs: parseInt(formData.carbs) || 0,
            calories: parseInt(formData.calories) || 0,
            sugars: parseInt(formData.sugars) || 0,
            numberPerson: parseInt(formData.numberPerson) || 0,
            cookingTime: parseInt(formData.cookingTime) || 0,
        };

        const res = await createEntity("recipes", {...formattedFormData,recipeIngredients,recipeSteps});
        const data = await res.json(); 
        if (res.ok) {
            setSuccessMessage(data.message);
            router.push('/recipes'); 
        }   
    };
    
    return (
        <div className='py-12 sm:py-20'>
            <h1 className='mb-14 font-500 font-garamond text-[52px] leading-[1.19em]'>Add Recipe</h1>
            <div className="w-full lg:w-[70%]">
                <RecipeForm formData={formData} setFormData={setFormData} recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients} recipeSteps={recipeSteps} setRecipeSteps={setRecipeSteps} />
                
                <button onClick={handleAdd} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                    Add Recipe
                </button>
            </div>
        </div>  
    );
};
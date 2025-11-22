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
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({author_id: user && user.id, title: "", image: [] as File[], description: "", category: "", cookingTime: "", difficulty: "",
        numberPerson: "", fat: "", protein: "", sugars: "", calories: "", carbs: "" });

    const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
    const [recipeSteps, setRecipeSteps] = useState<Steps[]>([]);
    
    useEffect(() => {
        if (user && !formData.author_id) {
            setFormData(prev => ({ ...prev, author_id: user.id }));
        }
    }, [formData.author_id, user]);

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
        setLoading(true);

        const formattedFormData = {
            ...formData,
            author_id: user && user.id,
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

        const recipeId = data.recipe_id;

        if (formData.image) {
            const fd = new FormData();
            fd.append("file", formData.image[0]);
            fd.append("type", "recipe");
            fd.append("recipe_id", recipeId.toString());

            await fetch("/api/upload", { method: "POST", body: fd });
        }

        const recipeStepsWithIds = recipeSteps.map((step, index) => ({
            ...step,
            step_id: data.step_ids[index],
        }));

        for (const step of recipeStepsWithIds) {
            if (step.images.length > 0) {
                const uploadPromises = step.images.map(async (img) => {
                    const fd = new FormData();
                    if (img.file) {
                        fd.append("file", img.file);
                    }
                    fd.append("type", "step");
                    fd.append("step_id", step.step_id.toString());
                    fd.append("recipe_id", recipeId.toString());

                    console.log(fd);
                    
                    const res = await fetch("/api/upload", { method: "POST", body: fd });
                    const data = await res.json();

                    return data.url;
                });

                const uploadedUrls = await Promise.all(uploadPromises);

                console.log("Uploaded URLs:", uploadedUrls);
            }
        }

        setLoading(false);
        if (res.ok) {
            setSuccessMessage(data.message);
            router.push('/recipes'); 
        }   
    };
    
    if (!user) return;

    return (
        <div className='py-12 sm:py-20'>
            <h1 className='mb-14 font-500 font-garamond text-[52px] leading-[1.19em]'>Add Recipe</h1>
            <div className="w-full lg:w-[70%]">
                <RecipeForm formData={formData} setFormData={setFormData} recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients} recipeSteps={recipeSteps} setRecipeSteps={setRecipeSteps} />
                
                <button onClick={handleAdd} disabled={loading} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                    {loading ? "Adding..." : "Add Recipe"}
                </button>
            </div>
        </div>  
    );
};
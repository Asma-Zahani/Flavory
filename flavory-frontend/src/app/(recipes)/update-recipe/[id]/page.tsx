/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RecipeIngredient, Steps } from "@/types/recipe";
import React, { useContext, useEffect, useState } from "react";
import {updateEntity, getEntity, deleteEntity} from "@/services/EntitesService"
import { UserContext } from "@/context/UserContext";
import { SuccessMessageContext } from "@/context/SuccessMessageContext";
import { useParams, useRouter } from "next/navigation";
import RecipeForm from "../../RecipeForm";
import Popup from "@/app/components/Popup";
import { AlertCircle } from "lucide-react";

export default function UpdateRecipePage () {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const params = useParams();
    const recipeId = params.id;
    const { setSuccessMessage } = useContext(SuccessMessageContext);
    const [loading, setLoading] = useState(false);
    const [load, setLoaded] = useState(false);

    const [formData, setFormData] = useState({author_id: user && user.id, title: "", image: [] as File[], description: "", category: "", cookingTime: "", difficulty: "",
        numberPerson: "", fat: "", protein: "", sugars: "", calories: "", carbs: "" });
    
    const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
    const [recipeSteps, setRecipeSteps] = useState<Steps[]>([]);

    const [isDelete, setIsDelete] = useState(false);
    
    useEffect(() => {
        const fetchRecipe = async () => {
            const res = await getEntity("recipes", recipeId);
            
            if (res.ok) {
                const data = await res.json();
                const { recipe_ingredients, steps, ...rest } = data;
                setFormData(rest);
                setRecipeIngredients(recipe_ingredients || []);
                setRecipeSteps(steps || []);
                setLoaded(true);
            };
            
        };

        if (recipeId) fetchRecipe();
    }, [recipeId]);

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

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

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

        const formattedRecipeIngredients = recipeIngredients.map(ri => ({
            ...ri,
            quantity: parseInt(ri.quantity as any) || 0,
        }));
        
        const res = await updateEntity("recipes", recipeId, {...formattedFormData,recipeIngredients: formattedRecipeIngredients,recipeSteps});
        const data = await res.json();
        
        console.log(data);
        
        if (formData.image) {
            const fd = new FormData();
            fd.append("file", formData.image[0]);
            fd.append("type", "recipe");
            fd.append("recipe_id", data.recipe_id.toString());

            await fetch("/api/upload", { method: "POST", body: fd });
        }

        const recipeStepsWithIds = recipeSteps.map((step, index) => ({
            ...step,
            step_id: data.step_ids[index],
        }));

        console.log(recipeStepsWithIds);
        
        for (const step of recipeStepsWithIds) {            
            if (step.images.length > 0) {
                const uploadPromises = step.images.map(async (img, index) => {
                    const fd = new FormData();
                    if (img.file) {
                        fd.append("file", img.file);
                    }
                    fd.append("type", "step");
                    fd.append("index", (index + 1).toString());
                    fd.append("step_id", step.step_id ? step.step_id.toString() : step.id.toString());
                    fd.append("recipe_id", data.recipe_id.toString());
                    
                    await fetch("/api/upload", { method: "POST", body: fd });
                });

                await Promise.all(uploadPromises);
            }
        }

        setLoading(false);
        if (res.ok) {
            setSuccessMessage(data.message);
            router.push('/recipes'); 
        }   
    };

    const handleDelete = async (e?: React.FormEvent) => {
        e?.preventDefault();
        
        const res = await deleteEntity("recipes", recipeId);
        const data = await res.json(); 
        if (res.ok) {
            setSuccessMessage(data.message);
            router.push('/recipes');
        }   
    };

    return (
        <div className='py-12 sm:py-20'>
            {load &&
            <>
                <h1 className='mb-14 font-500 font-garamond text-[52px] leading-[1.19em]'>Update Recipe</h1>
                <div className="w-full lg:w-[70%]">
                    <RecipeForm formData={formData} setFormData={setFormData} recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients} recipeSteps={recipeSteps} setRecipeSteps={setRecipeSteps} />
                    
                    <div className="flex gap-3">
                        <button onClick={handleUpdate} disabled={loading} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                            {loading ? "Updating..." : "Update Recipe"}
                        </button>
                        <button onClick={() => setIsDelete(true)} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-primary bg-transparent border border-primary hover:border-2 hover:scale-105 hover:font-bold">
                            Delete Recipe
                        </button>
                        {isDelete && <Popup icon={<AlertCircle className="mx-auto mb-4 text-gray" size={56} />} setIsOpen={() => setIsDelete(false)} message="Are you sure you want to delete this recipe?" handleConfirm={handleDelete} />}
                    </div>
                </div>
            </>
            }
        </div>  
    );
};
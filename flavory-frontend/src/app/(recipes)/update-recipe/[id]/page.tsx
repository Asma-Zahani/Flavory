/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { RecipeIngredient, Steps } from "@/types/recipe";
import React, { useContext, useEffect, useState } from "react";
import {updateEntity, getEntity, deleteEntity} from "@/services/EntitesService"
import { UserContext } from "@/context/UserContext";
import { SuccessMessageContext } from "@/context/SuccessMessageContext";
import { useParams, useRouter } from "next/navigation";
import RecipeForm from "../../RecipeForm";
import { AlertCircle, X } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function UpdateRecipePage () {
    const { user } = useContext(UserContext);
    const router = useRouter();
    const params = useParams();
    const recipeId = params.id;    
    const { setSuccessMessage } = useContext(SuccessMessageContext);

    const [formData, setFormData] = useState({author_id: user?.id, title: "", image: "", description: "", category: "", cookingTime: "", difficulty: "",
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

        console.log({...formattedFormData,recipeIngredients,recipeSteps});
        
        const res = await updateEntity("recipes", recipeId, {...formattedFormData,recipeIngredients: formattedRecipeIngredients,recipeSteps});
        const data = await res.json(); 
        if (res.ok) {
            setSuccessMessage(data.message);
            router.push('/recipes'); 
        }   
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const res = await deleteEntity("recipes", recipeId);
        const data = await res.json(); 
        if (res.ok) {
            setSuccessMessage(data.message);
            router.push('/recipes');
        }   
    };
    
    useEffect(() => {
        AOS.init({
            easing: "ease-in-sine",
        });
    }, []);

    return (
        <div className='py-12 sm:py-20'>
            <h1 className='mb-14 font-500 font-garamond text-[52px] leading-[1.19em]'>Update Recipe</h1>
            <div className="w-full lg:w-[70%]">
                <RecipeForm formData={formData} setFormData={setFormData} recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients} recipeSteps={recipeSteps} setRecipeSteps={setRecipeSteps} />
                
                <div className="flex gap-3">
                    <button onClick={handleUpdate} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                        Update Recipe
                    </button>
                    <button onClick={() => setIsDelete(true)} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-primary bg-transparent border border-primary hover:border-2 hover:scale-105 hover:font-bold">
                        Delete Recipe
                    </button>
                    {isDelete && 
                        <div className={`fixed z-50 w-full h-full inset-0 flex items-center justify-center`}>
                            <div className={`fixed inset-0 bg-white/75 transition-opacity`} aria-hidden="true"></div>
                                <div className="relative p-4 w-full max-w-md max-h-full" data-aos="fade-down" data-aos-duration="500" data-aos-once="true">
                                    <div className="relative bg-white shadow-[0px_0px_6px_0px] shadow-gray-200">
                                    <button onClick={() => setIsDelete(false)} type="button" className="absolute top-3 end-2.5 text-gray hover:text-primary rounded-md w-8 h-8 inline-flex justify-center items-center hover:scale-110">
                                        <X size={20} />
                                    </button>
                                    <div className="p-4 md:p-5 text-center">
                                        <AlertCircle className="mx-auto mb-4 text-gray" size={56} />
                                        <h3 className="mb-5 text-lg max-w-[80%] text-gray dark:text-gray-200 break-words text-wrap mx-auto whitespace-pre-wrap">
                                            Are you sure you want to delete this recipe?
                                        </h3>
                                        <div className="flex items-center rounded-b dark:border-gray-600 justify-center gap-3">
                                        <button onClick={handleDelete} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-10.5 py-3.5 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                                            Yes, I&apos;m sure
                                        </button>
                                        <button onClick={() => setIsDelete(false)} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-10.5 py-3.5 cursor-pointer z-30 text-primary bg-transparent border border-primary hover:border-2 hover:scale-105 hover:font-bold">
                                            No, cancel
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>  
    );
};
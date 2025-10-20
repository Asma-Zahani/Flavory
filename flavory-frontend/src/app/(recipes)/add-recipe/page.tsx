"use client";

import { Enums, Ingredient, RecipeIngredient, Steps } from "@/types/recipe";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import DropdownInput from "./DropdownInput";
import FileInput from "./FileInput";

export default function AddRecipePage () {
    const [formData, setFormData] = useState({title: "", image: "", description: "", category: "", cookingTime: "", difficulty: "",
        numberPerson: "", fat: "", protein: "", sugars: "", calories: "", carbs: "" });
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
    const [recipeSteps, setRecipeSteps] = useState<Steps[]>([]);
    const [data, setData] = useState<Enums>();

    useEffect(() => {
        fetch(`/api/ingredients`)
        .then(res => res.json())
        .then(data => setIngredients(data))
        .catch(err => console.error(err));

        fetch(`/api/enums`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.error(err));
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddIngredient = () => {
        setRecipeIngredients((prev) => [
            ...prev, { id: Date.now(), ingredient: { id: 0, name: "" }, quantity: 1, unit: "", type: ""}
        ]);
    };

    const handleAddStep = () => {
        setRecipeSteps((prev) => [
            ...prev, { id: Date.now(), step_number: prev.length + 1, title: "", instruction: "", images: []}
        ]);
    };

    useEffect(() => {
        if (formData.fat && formData.protein && formData.carbs) {
            const fat = parseFloat(formData.fat) || 0;
            const protein = parseFloat(formData.protein) || 0;
            const carbs = parseFloat(formData.carbs) || 0;

            const calories = fat * 9 + protein * 4 + carbs * 4;
            const sugars = carbs * 0.3;

            setFormData(prev => ({
                ...prev,
                calories: calories.toFixed(1),
                sugars: sugars.toFixed(1),
            }));
        }
    }, [formData.fat, formData.protein, formData.carbs]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            recipeIngredients,
            recipeSteps,
        };
        console.log(dataToSend);
    };
    
    return (
        <div className='py-12 sm:py-20'>
            <h1 className='mb-14 font-500 font-garamond text-[52px] leading-[1.19em]'>Add Recipe</h1>
            <form onSubmit={handleSubmit} className="w-full lg:w-[70%]">
                <input name="title" type="text" placeholder="Title*" value={formData.title} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                <FileInput multiple={false} defaultImages={formData.image || ""} onChange={(url) => setFormData({ ...formData, image: url as string })}/>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                    <DropdownInput name="category" placeholder="Category*" value={formData.category}
                        onChange={(val) => setFormData((prev) => ({ ...prev, category: val }))} options={data?.categories || []}/>
                    <DropdownInput name="difficulty" placeholder="Difficulty*" value={formData.difficulty}
                        onChange={(val) => setFormData((prev) => ({ ...prev, difficulty: val }))} options={data?.difficulties || []}/>
                    <input name="cookingTime" placeholder="CookingTime (min)*" value={formData.cookingTime} onChange={handleChange} className='w-full lg:mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                    <input name="numberPerson" placeholder="NumberPerson*" value={formData.numberPerson} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                </div>
                <textarea name="description" placeholder="Description*" value={formData.description} onChange={handleChange} className='w-full scrollbar h-33 mb-4 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none'/>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Ingredients</h2>

                    {recipeIngredients.map((ri, index) => (
                        <div key={index} className="flex flex-row mb-3 pb-3 border-b border-grayLight">
                            <div className="w-full flex flex-col lg:flex-row gap-3">
                                <DropdownInput name="ingredient" placeholder="Ingredient*" value={ri.ingredient.name} options={ingredients.map((ing) => ({value: String(ing.id), label: ing.name})) || []}
                                    onChange={(val) => { const selectedIngredient = ingredients.find((ing) => String(ing.id) === val);
                                        setRecipeIngredients((prev) => prev.map((ing, i) => i === index ? {
                                            ...ing, ingredient: selectedIngredient
                                                ? { id: selectedIngredient.id, name: selectedIngredient.name }
                                                : { id: 0, name: val },
                                            } : ing
                                        )
                                    )}}/>

                                <div className="flex flex-row gap-3">
                                    <DropdownInput name="type" placeholder="Type*" width="w-full lg:w-30" value={ri.type} options={data?.typesRecipeIngredient || []}
                                        onChange={(val) => setRecipeIngredients((prev) =>
                                            prev.map((ing, i) =>
                                                i === index ? { ...ing, type: val } : ing
                                            )
                                        )}/>

                                    <input name="quantity" placeholder="Quantity*" value={ri.quantity} className='w-full lg:w-30 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '
                                        onChange={(e) => setRecipeIngredients((prev) => prev.map((ing, i) =>
                                            i === index ? { ...ing, quantity: Number(e.target.value) } : ing
                                        ))
                                    }/>
                                    <input name="unit" placeholder="Unit*" value={ri.unit} className='w-full lg:w-30 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '
                                        onChange={(e) => setRecipeIngredients((prev) => prev.map((ing, i) =>
                                            i === index ? { ...ing, unit: e.target.value } : ing
                                        ))
                                    }/>
                                </div>
                            </div>
                            <Trash2 strokeWidth={1} onClick={() => setRecipeIngredients((prev) => prev.filter((_, i) => i !== index))} className="w-5 h-5 text-primary cursor-pointer mt-11.5 lg:mt-4 ml-2" />
                        </div>
                    ))}

                    <button type="button" onClick={handleAddIngredient} className="text-primary text-sm underline mb-3">
                        + Add Ingredient
                    </button>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-3">
                    <input name="fat" placeholder="Fat (g)*" value={formData.fat} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                    <input name="protein" placeholder="Protein (g)*" value={formData.protein} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                    <input name="carbs" placeholder="Carbs (g)*" value={formData.carbs} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Steps</h2>

                    {recipeSteps.map((step, index) => (
                        <div key={index} className="flex flex-col mb-3 pb-3 border-b border-grayLight">
                            <input name={`steps[${index}].title`} type="text" placeholder="Title*" value={step.title} 
                                onChange={(e) => {
                                    const updated = [...recipeSteps];
                                    updated[index].title = e.target.value;
                                    setRecipeSteps(updated);
                                }}
                                className='w-full scrollbar mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                            <textarea name="description" placeholder="Description*" value={step.instruction} 
                                onChange={(e) => {
                                    const updated = [...recipeSteps];
                                    updated[index].instruction = e.target.value;
                                    setRecipeSteps(updated);
                                }}
                                className='w-full h-33 mb-2 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none'/>
                            <p className="text-gray text-sm mb-2">
                                Please insert <strong>[IMAGES]</strong> when you want to add photos for this step.
                            </p>
                            <FileInput multiple defaultImages={step.images?.map((img) => img.image_path) || []}
                                onChange={(urls) => {
                                    const updated = [...recipeSteps];
                                    updated[index].images = Array.isArray(urls)
                                    ? urls.map((url, idx) => ({
                                        id: Date.now() + idx,
                                        image_path: url,
                                        step_id: step.id,
                                        }))
                                    : [];
                                    setRecipeSteps(updated);
                                }}/>
                            <Trash2 strokeWidth={1} onClick={() => setRecipeSteps((prev) => prev.filter((_, i) => i !== index))} className="w-5 h-5 text-primary cursor-pointer" />
                        </div>
                    ))}

                    <button type="button" onClick={handleAddStep} className="text-primary text-sm underline mb-3">
                        + Add Step
                    </button>
                </div>
                <button type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white hover:text-primary bg-primary hover:bg-transparent border border-transparent hover:border-primary">
                    Post Recipe
                </button>
            </form>
        </div>  
    );
};
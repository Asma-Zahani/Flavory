/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Enums, Ingredient, RecipeIngredient, Steps } from "@/types/recipe";
import { ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import {createEntity} from "@/services/EntitesService"
import { SuccessMessageContext } from "@/context/SuccessMessageContext";
import FileInput from "@/components/FileInput";

interface RecipeFormProps {formData: {author_id?: number, title: string, image: File[], description: string, category: string, cookingTime: string, difficulty: string, numberPerson: string, fat: string, protein: string, sugars: string, calories: string, carbs: string }; setFormData: React.Dispatch<React.SetStateAction<any>>; recipeIngredients: RecipeIngredient[]; setRecipeIngredients: React.Dispatch<React.SetStateAction<RecipeIngredient[]>>; recipeSteps: Steps[]; setRecipeSteps: React.Dispatch<React.SetStateAction<Steps[]>>;}
interface DropdownInputProps {label?: string; name: string; value: string; placeholder?: string; options: { value: string; label: string }[]; onChange: (value: string) => void; onAdd?: (newName: string) => Promise<void>; width?: string;}

export default function RecipeForm ({formData, setFormData, recipeIngredients, setRecipeIngredients, recipeSteps, setRecipeSteps}: RecipeFormProps) {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const [previewImages, setPreviewImages] = useState<string[]>(formData.image && formData.image.length > 0 ? [`${process.env.NEXT_PUBLIC_BACKEND_URL}${formData.image}`] : []);
    const [previewStepImages, setPreviewStepImages] = useState<string[][]>(
        recipeSteps.map(step =>
            step.images?.map(img =>
            img.image_path.startsWith("http")
                ? img.image_path
                : `${process.env.NEXT_PUBLIC_BACKEND_URL}${img.image_path}`
            ) || []
        )
    );
    const [data, setData] = useState<Enums>();
    const { setSuccessMessage } = useContext(SuccessMessageContext);
    
    
    useEffect(() => {
        fetch(`/api/ingredients`).then(res => res.json()).then(data => setIngredients(data)).catch(err => console.error(err));
        fetch(`/api/enums`).then(res => res.json()).then(data => setData(data)).catch(err => console.error(err));
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if(name === "numberPerson" || name === "cookingTime" || name === "fat" || name === "protein" || name === "carbs") {
            if (/^\d*$/.test(value)) {
                setFormData((prev: any) => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
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
    
    return (
        <>
            <input name="title" type="text" placeholder="Title*" value={formData.title} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
            <FileInput multiple={false} previewImages={previewImages} setPreviewImages={setPreviewImages} onChange={(file) => setFormData((prev: any) => ({ ...prev, image: file }))}/>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                <DropdownInput name="category" placeholder="Category*" value={formData.category}
                    onChange={(val) => setFormData((prev: any) => ({ ...prev, category: val }))} options={data?.categories || []}/>
                <DropdownInput name="difficulty" placeholder="Difficulty*" value={formData.difficulty}
                    onChange={(val) => setFormData((prev: any) => ({ ...prev, difficulty: val }))} options={data?.difficulties || []}/>
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
                                )}}
                                onAdd={async(newName) => {
                                    const res = await createEntity("ingredients", { name: newName });
                                    const data = await res.json();                                        
                                    setIngredients((prev) => [...prev, data.data]);
                                    setSuccessMessage(data.message);
                                }}/>

                            <div className="flex flex-row gap-3">
                                <DropdownInput name="type" placeholder="Type*" width="w-full lg:w-50" value={ri.type} options={data?.typesRecipeIngredient || []}
                                    onChange={(val) => setRecipeIngredients((prev) =>
                                        prev.map((ing, i) =>
                                            i === index ? { ...ing, type: val } : ing
                                        )
                                    )}/>

                                <input name="quantity" placeholder="Quantity*" value={ri.quantity} className='w-full lg:w-30 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '
                                    onChange={(e) => {const onlyDigits = e.target.value.replace(/\D/g, ""); 
                                        setRecipeIngredients((prev) => prev.map((ing, i) =>
                                            i === index ? { ...ing, quantity: onlyDigits === "" ? 1 : Number(onlyDigits) } : ing
                                        ))
                                    }
                                }/>
                                <input name="unit" placeholder="Unit" value={ri.unit ?? ""} className='w-full lg:w-30 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '
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
                    + Add Recipe Ingredient
                </button>
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-3">
                <input name="fat" placeholder="Fat (g)" value={formData.fat} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                <input name="protein" placeholder="Protein (g)" value={formData.protein} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
                <input name="carbs" placeholder="Carbs (g)" value={formData.carbs} onChange={handleChange} className='w-full mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
            </div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3">Steps</h2>

                {recipeSteps.map((step, index) => (
                    <RecipeStep key={index} index={index} step={step} recipeSteps={recipeSteps} setRecipeSteps={setRecipeSteps} previewStepImages={previewStepImages[index] || []} 
                        setPreviewStepImages={(urls: string[]) => {
                            setPreviewStepImages(prev => {
                                const updated = [...prev];
                                updated[index] = urls;
                                return updated;
                            });
                        }}
                    />
                ))}

                <button type="button" onClick={handleAddStep} className="text-primary text-sm underline mb-3">
                    + Add Step
                </button>
            </div>
        </>
    );
};

export function RecipeStep({index, step, recipeSteps, setRecipeSteps, previewStepImages, setPreviewStepImages}: {index: number, step: Steps; recipeSteps: Steps[]; setRecipeSteps: React.Dispatch<React.SetStateAction<Steps[]>>; previewStepImages: string[]; setPreviewStepImages: (urls: string[]) => void;}) {
    return (
        <div className="flex flex-col mb-3 pb-3 border-b border-grayLight">
            <input name={`steps[${index}].title`} type="text" placeholder="Title*" value={step.title} 
                onChange={(e) => {
                    const updated = [...recipeSteps];
                    updated[index].title = e.target.value;
                    setRecipeSteps(updated);
                }}
                className='w-full scrollbar mb-5 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none '/>
            <textarea name="instruction" placeholder="Instruction*" value={step.instruction} 
                onChange={(e) => {
                    const updated = [...recipeSteps];
                    updated[index].instruction = e.target.value;
                    setRecipeSteps(updated);
                }}
                className='w-full h-33 mb-2 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none'/>
            <p className="text-gray text-sm mb-2">
                Please insert <strong>[IMAGES]</strong> when you want to add photos for this step.
            </p>
            <FileInput multiple previewImages={previewStepImages} setPreviewImages={setPreviewStepImages} 
                onChange={(files: File[]) => {
                    setRecipeSteps((prevSteps) => {
                    const updated = [...prevSteps];
                    updated[index].images = files.map((file) => ({
                        file,
                        image_path: URL.createObjectURL(file)
                    }));
                    return updated;
                    });
                }} />
            <Trash2 strokeWidth={1} onClick={() => setRecipeSteps((prev) => prev.filter((_, i) => i !== index))} className="w-5 h-5 text-primary cursor-pointer" />
        </div>
    );
}

export function DropdownInput({name, value, placeholder, options, onChange, onAdd, width = "w-full"}: DropdownInputProps) {
    const [open, setOpen] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [newItem, setNewItem] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setOpen(false);
            setOpenAdd(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

     const handleAdd = async () => {
        if (!newItem.trim() || !onAdd) return;
        await onAdd(newItem.trim());
        setNewItem("");
        setOpenAdd(false);
    };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <input name={name} placeholder={placeholder || ""} value={value} onChange={(e) => onChange(e.target.value)} onClick={() => {setOpen(!open); setOpenAdd(false)}} readOnly
                className={`${width} px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out`}/>
            <ChevronDownIcon onClick={() => {setOpen(!open); setOpenAdd(false)}} className={`absolute top-3.5 right-3 text-gray cursor-pointer transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}/>

            {open && (
                <div className="absolute bg-white border border-grayLight rounded-sm top-full left-0 w-full mt-1 z-50 max-h-48 overflow-y-auto shadow-md scrollbar">
                    {options.map((opt) => (
                        <div key={opt.value} onClick={() => {onChange(opt.value); setOpen(false); setOpenAdd(false)}} className={`px-5 py-2 text-sm cursor-pointer hover:text-primary hover:font-bold ${value === opt.value ? "text-primary font-bold" : ""}`}>
                            {opt.label}
                        </div>
                    ))}
                    {name === "ingredient" && (
                        <>
                            {openAdd ? 
                                <div className="mx-5 my-3 flex items-center border-b border-grayDark">
                                    <input name="newIngredient" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Ingredient*" className='w-full text-base placeholder:text-gray focus:text-black outline-none'/>
                                    <button onClick={handleAdd} type="submit" className="ml-2 p-1 flex items-center justify-center transform transition-transform duration-300 hover:-translate-y-1">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24.007px" height="23.361px" viewBox="0 0 24.007 23.361" enableBackground="new 0 0 24.007 23.361">
                                            <g><polygon fill="#E35640" points="0.244,10.194 12.244,11.194 13.244,23.194 23.338,0.267 23.244,0.194"/></g>
                                        </svg>
                                    </button>
                                </div>
                        : 
                                <div onClick={() => {setOpenAdd(true)}} className="px-5 my-3 flex justify-between font-bold hover:text-primary text-sm cursor-pointer">
                                    Add Ingredient
                                    <Plus />
                                </div>    
                            }
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
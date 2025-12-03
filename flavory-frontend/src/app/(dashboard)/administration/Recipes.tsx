"use client";
import { useContext, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { deleteEntity, getEntities } from "@/services/EntitesService";
import { MessageContext } from "@/context/MessageContext";
import { Recipe } from "@/types/recipe";
import Pagination from "@/components/Pagination";
import Popup from "@/components/Popup";
import { AlertCircle, Trash2 } from "lucide-react";

export default function Recipes() {
    const { setMessage } = useContext(MessageContext);
    
    const [isDelete, setIsDelete] = useState(false);
    const [recipeId, setRecipeId] = useState<number>(0);
    
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [page, setPage] = useState(1); 
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 10,
        total: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await getEntities(`recipes?per_page=4&page=${page}`);
            const json = await res.json();

            setRecipes(json.data);

            setPagination({
                current_page: json.current_page,
                per_page: json.per_page,
                total: json.total
            });
        };

        fetchData();
    }, [page]);
    
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const onDelete = async (recipeId: number) => {        
        const res = await deleteEntity("recipes", recipeId);
        const data = await res.json(); 
        if (res.ok) {
            setMessage(data.message);
            setRecipes((prev: Recipe[]) => prev.filter(recipe => recipe.id !== recipeId));
        }   
    };

    return (
        <div>
            <div className="flex flex-col min-h-[400px]">
                {recipes?.length > 0 ? (
                    <>
                        <div className="mt-6 py-2 flex flex-col w-full max-w-xs sm:max-w-full max-h-[400px] overflow-y-auto">
                            <div className="overflow-x-auto scrollbar">
                                <table className="min-w-full text-gray">
                                    <thead className="sticky top-0 bg-white z-10 border-b border-grayLight shadow-xs">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold text-sm">Recipe</th>
                                            <th className="px-6 py-3 font-semibold text-sm">Category</th>
                                            <th className="px-6 py-3 font-semibold text-sm">Created At</th>
                                            <th className="px-6 py-3 font-semibold text-sm text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recipes.map((recipe) => (
                                            <tr key={recipe.id} className="border-b border-grayLight transition">
                                                <td className="pl-10 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center gap-2 w-70">
                                                        <Link href={`/recipes/${recipe.id}`} className="flex flex-grow">
                                                            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image}`} alt={recipe.title} width={50} height={50} className="object-cover w-12 h-12 -mx-1 border-2 border-grayLight rounded-full" />
                                                            <h4 className="flex items-center ml-4 whitespace-normal overflow-visible text-clip">
                                                                <p className='text-2xl font-500 leading-[1.08em] font-garamond block whitespace-nowrap overflow-hidden text-ellipsis max-w-55'>{recipe.title}</p>
                                                            </h4>
                                                        </Link>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm whitespace-nowrap">
                                                    <div className="flex items-center justify-center">{recipe.category ?? "—"}</div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center">{new Date(recipe.created_at).toLocaleDateString()}</div>
                                                </td>

                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex items-center justify-center gap-4">
                                                        <button onClick={() => {setIsDelete(true); setRecipeId(recipe.id)}} className="hover:text-primary transition">
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {isDelete && <Popup icon={<AlertCircle className="mx-auto mb-4 text-gray" size={56} />} setIsOpen={() => setIsDelete(false)} message="Are you sure you want to delete this recipe?" handleConfirm={() => {onDelete(recipeId); setIsDelete(false)}} />}
                            </div>
                        </div>
                        <Pagination currentPage={pagination.current_page} totalItems={pagination.total} itemsPerPage={pagination.per_page} onPageChange={handlePageChange}/>
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
        </div>
    );
};
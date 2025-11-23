import Popup from "@/components/Popup";
import { Recipe } from "@/types/recipe";
import { AlertCircle, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function AddedRecipesTable({ recipes, onDelete } : {recipes: Recipe[], onDelete: (id: number) => void;}) {
    const [isDelete, setIsDelete] = useState(false);
    const [recipeId, setRecipeId] = useState<number>(0);

    return (
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
                                        <Link href={`/update-recipe/${recipe.id}`} className="hover:text-primary transition">
                                            <Pencil size={18} />
                                        </Link>

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
    );
}
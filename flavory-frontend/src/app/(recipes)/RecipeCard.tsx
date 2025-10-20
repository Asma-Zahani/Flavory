"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
    recipe: Recipe;
    information: boolean;
}

export default function RecipeCard({ recipe, information }: RecipeCardProps) {
    return (
        <div>
            <Link href={`/recipes/${recipe.id}`} ><Image src={`/recipes/${recipe.image}`} alt={recipe.title} width={900} height={1000} priority /></Link>
            <div>
                <Link href={`/recipe-category?category=${encodeURIComponent(recipe.category.toLowerCase())}`}>
                    <p className="mt-4 leading-[1.6em] relative uppercase text-primary font-bold text-xs tracking-[0.3em] mr-1.5">{recipe.category}</p>
                </Link>
                <Link href={`/recipes/${recipe.id}`} className='text-2xl font-500 leading-[1.08em] font-garamond'>{recipe.title}</Link>
                {information && <p className='mt-4 text-gray'>{recipe.description}</p>}
                <div className='flex mt-4 py-4 border-t border-grayLight gap-6 uppercase text-xs text-gray'>
                    <p className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17.328px" height="18.758px" viewBox="0 0 25 26" enableBackground="new 0 0 25 26"><g><circle fill="none" stroke="#686868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="12.417" cy="12.958" r="11"/><line fill="none" stroke="#686868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="12.417" y1="5.958" x2="12.417" y2="12.958"/><line fill="none" stroke="#686868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="17.417" y1="17.959" x2="12.417" y2="12.958"/></g></svg>				
                        {recipe.cookingTime} Minutes			
                    </p>
                    <p className='flex items-center gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17.328px" height="18.758px" viewBox="0 0 17.328 18.758" enableBackground="new 0 0 17.328 18.758"><g><line fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="15.441" y1="12.082" x2="15.441" y2="12.079"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M5.921,8.836
                        c2.356-0.564,4.718-3.474,4.718-6.94c0-0.862,1.709-0.982,2.157,0.617c0.505,1.806-0.308,3.39-0.925,4.931h3.082"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14.952,7.444
                        c0.682,0,1.233,0.552,1.233,1.233l0,0c0,0.681-0.553,1.232-1.233,1.232h-0.31"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14.645,9.91
                        c0.682,0,1.233,0.552,1.233,1.232l0,0c0,0.682-0.553,1.232-1.233,1.232h-0.309"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14.027,12.375
                        c0.681,0,1.233,0.552,1.233,1.232l0,0c0,0.681-0.553,1.231-1.233,1.231H13.72"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14.645,9.91
                        c0.682,0,1.233,0.552,1.233,1.232l0,0c0,0.682-0.553,1.232-1.233,1.232h-0.617"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M13.72,16.999h-3.39
                        H9.407c-1.235,0-3.486-1.133-3.486-1.133"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M13.411,14.84h0.155
                        c0.596,0,1.078,0.483,1.078,1.079l0,0c0,0.597-0.482,1.079-1.078,1.079h-0.463"/><circle fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="4.474" cy="15.766" r="0.308"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M5.218,17.271H1.703
                        C1.314,17.271,1,16.958,1,16.568V8.133C1,7.745,1.314,7.43,1.703,7.43h3.515c0.388,0,0.703,0.314,0.703,0.703v8.436
                        C5.921,16.958,5.606,17.271,5.218,17.271z"/></g></svg>                
                        {recipe.difficulty}           
                    </p>
                </div>
            </div>
        </div>
    );
}
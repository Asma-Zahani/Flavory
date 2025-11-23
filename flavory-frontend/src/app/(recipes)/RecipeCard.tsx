/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/types/recipe';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import { createEntity } from '@/services/EntitesService';

interface RecipeCardProps {
    recipe: Recipe;
    information: boolean;
}

export default function RecipeCard({ recipe, information }: RecipeCardProps) {
    const {user, setUser} = useContext(UserContext);
    const router = useRouter();

    const [isFavorite, setIsFavorite] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (user && recipe) {
            const favoriteExists = user.favorites?.some(
                (fav: { id: number; }) => fav.id === recipe.id
            );
            setIsFavorite(favoriteExists);
        }
    }, [user, recipe]);
    
    const toggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (isDisabled) return;
        if (!user) {
            router.push('/login');
            return;
        }

        setIsFavorite(!isFavorite);
        setIsDisabled(true);

        await createEntity("favorite", {user_id: user?.id, recipe_id: recipe?.id});

        if (isFavorite) {
            setUser((prev: { favorites: any[]; }) => ({
                ...prev,
                favorites: prev.favorites.filter((fav) => fav.id !== recipe?.id),
            }));
        } else {
            setUser((prev: { favorites: any; }) => ({
                ...prev,
                favorites: [...prev.favorites, recipe],
            }));
        }
        
        setTimeout(() => setIsDisabled(false), 500);
    };

    return (
        <div> {/* data-aos="fade-up" data-aos-duration="500" data-aos-once="true" */}
            <Link href={`/recipes/${recipe.id}`} ><Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image}`} alt={recipe.title} width={900} height={1000} /></Link>
            <div className='w-full'>
                <div className='relative flex justify-between items-center'>
                    <div className='w-full'>
                        <Link href={`/recipe-category?category=${encodeURIComponent(recipe.category.toLowerCase())}`}>
                            <p className="mt-4 leading-[1.6em] relative uppercase text-primary font-bold text-xs tracking-[0.3em] mr-1.5">{recipe.category}</p>
                        </Link>
                        <Link href={`/recipes/${recipe.id}`} className='text-2xl font-500 leading-[1.08em] font-garamond block whitespace-nowrap overflow-hidden text-ellipsis max-w-full'>{recipe.title}</Link>
                    </div> 
                    <div className='absolute top-1 right-2'>
                        <button onClick={toggleFavorite} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "#e35640" : "#ffffff"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isFavorite ? "#e35640" : "#686868"} className="w-5 h-5 mt-3 text-primary hover:stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.014-4.5-4.5-4.5S12 5.765 12 8.25 9.986 3.75 7.5 3.75 3 5.765 3 8.25c0 7.5 9 12 9 12s9-4.5 9-12z" />
                            </svg>
                        </button>
                    </div>
                </div>
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
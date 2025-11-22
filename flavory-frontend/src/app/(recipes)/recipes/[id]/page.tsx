/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; 

import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Recipe } from '@/types/recipe';
import Sidebar from '../../Sidebar';
import {IngredientRow, StepRow, ReviewRow} from './Rows';
import RatingStars, { ReviewStars } from './RatingStars';
import { createEntity } from '@/services/EntitesService';
import { UserContext } from '@/context/UserContext';
import { SuccessMessageContext } from '@/context/SuccessMessageContext';
import FileInput from '@/app/components/FileInput';

export default function RecipeDetail () {
    const {user, setUser} = useContext(UserContext);
    const { setSuccessMessage } = useContext(SuccessMessageContext);
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = params.id;

    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        if (!id) return;
        fetch(`/api/recipes/${id}`)
        .then(res => res.json())
        .then(data => setRecipe(data))
        .catch(err => console.error(err));
    }, [id]);
    
    const [servings, setServings] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setServings(value);
        } else {
            setServings(1);
        }
    };
    
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
    
    const [formData, setFormData] = useState({user_id: user?.id, recipe_id: recipe?.id, rating: 0, comment: "", images: [] as File[]});  
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    
    useEffect(() => {
        if (user && recipe) {            
            setFormData({user_id: user.id, recipe_id: recipe.id, rating: 0, comment: "", images: []});
        }
    }, [user, recipe]);    

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !recipe) return;

        const res = await createEntity("reviews", formData);
        const data = await res.json(); 

        const reviewId = data.data.id;
        let urls: string[] = [];

        if (formData.images.length > 0) {
            const uploadPromises = formData.images.map(async (file, index) => {
                const fd = new FormData();
                fd.append("file", file);
                fd.append("type", "review");
                fd.append("index", (index + 1).toString());
                fd.append("recipe_id", recipe.id.toString());
                fd.append("review_id", reviewId.toString());

                const res = await fetch("/api/upload", { method: "POST", body: fd });
                const data = await res.json();
                
                console.log(data);
                
                return data.url;
            });

            urls = await Promise.all(uploadPromises);
        }

        if (res.ok) {
            setSuccessMessage(data.message);
            setRecipe(prevRecipe => {
                if (!prevRecipe) return prevRecipe;

                return {
                    ...prevRecipe,
                    reviews: [
                        ...prevRecipe.reviews,
                        {
                            id: reviewId,
                            user: user,          
                            rating: formData.rating,
                            comment: formData.comment,
                            images: urls.map((url) => ({
                                image_path: url,
                            })),
                            created_at: new Date().toISOString(),
                        },
                    ],
                };
            });
            setFormData({ user_id: user?.id, recipe_id: recipe?.id, rating: 0 , comment: "", images: [] });
            setPreviewImages([]);
        }   
    };
    
    if (!recipe) return <p>Loading...</p>;
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 sm:py-20">
            <div className='col-span-2 px-0 sm:px-6'> 
                {/* <p className='text-[45px] sm:text-[52px] font-500 leading-[1.08em] font-garamond mb-4'>{recipe.title}</p> */}
                <div className="flex items-center justify-between mb-4 w-full">
                    <p className='text-[45px] sm:text-[52px] font-500 leading-[1.08em] font-garamond max-w-[80%]'>
                        {recipe.title}
                    </p>
                    <div>
                        {user && (user.id == recipe.author.id) &&
                            <button onClick={() => { router.push(`/update-recipe/${recipe.id}`); }}>
                                <Pencil className='text-[#686868] hover:text-primary mb-0.5 mr-3' />
                            </button>
                        }
                        <button onClick={toggleFavorite} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "#e35640" : "#ffffff"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={isFavorite ? "#e35640" : "#686868"} className="w-7 h-7 mr-2 mt-4 text-primary hover:stroke-primary">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.014-4.5-4.5-4.5S12 5.765 12 8.25 9.986 3.75 7.5 3.75 3 5.765 3 8.25c0 7.5 9 12 9 12s9-4.5 9-12z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className='flex'>
                    <div className='flex items-center pr-11 my-5'>
                        <Image src={recipe.author.profile_photo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.author.profile_photo}` : 'user.jpg'} alt='' width={55} height={55} className='mr-6.5 rounded-full' priority />
                        <div className='flex flex-col'>
                            <a className='font-garamond font-500 text-xl'>{recipe.author.full_name}</a>
                            <p className='font-raleway text-gray text-[15px]'>{new Date(recipe.created_at).toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})}</p>
                        </div>
                    </div>
                    <div className="relative flex items-center px-8">
                        <div className="absolute left-0 h-[57px] w-px bg-[#eeedeb]"></div>
                        <p className='text-xl pr-3 leading-tight font-garamond font-500'>Share :</p>
                        <ul className="relative flex gap-5 leading-none italic text-[17px] font-serif cursor-pointer">
                            <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-14px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                                <a href="#" className="hover:text-primary">fb</a>
                            </li>
                            <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-14px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                                <a href="#" className="hover:text-primary">tw</a>
                            </li>
                            <li className="relative after:content-[''] after:absolute after:top-1/2 after:translate-y-[-50%] after:right-[-14px] after:w-[8px] after:h-[1px] after:bg-black last:after:hidden">
                                <a href="#" className="hover:text-primary">ln</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary">p</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image}`} alt={recipe.title} width={900} height={1000} priority />
                <div className="flex flex-col sm:flex-row items-center justify-center my-2 py-4 gap-6 uppercase text-xs text-gray sm:before:content-[''] sm:before:flex-1 sm:before:border-t sm:before:border-grayLight sm:after:content-[''] sm:after:flex-1 sm:after:border-t sm:after:border-grayLight">
                    <div className='sm:hidden w-full border-t border-grayLight'></div>
                    <p className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17.328px" height="18.758px" viewBox="0 0 25 26" enableBackground="new 0 0 25 26"><g><circle fill="none" stroke="#686868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" cx="12.417" cy="12.958" r="11"/><line fill="none" stroke="#686868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="12.417" y1="5.958" x2="12.417" y2="12.958"/><line fill="none" stroke="#686868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="17.417" y1="17.959" x2="12.417" y2="12.958"/></g></svg>				
                        {recipe.cookingTime} Minutes			
                    </p>
                    <p className='flex items-center gap-2'>
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
                    <p className='flex items-center gap-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12.449px" height="17.272px" viewBox="0 0 12.449 17.272" enableBackground="new 0 0 12.449 17.272"><g><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M6.262,0.646v5.334c0,0.657-0.42,1.24-1.043,1.448l0,0c-0.624,0.208-1.044,0.79-1.044,1.449v6.9c0,0.383-0.311,0.694-0.696,0.694l0,0c-0.385,0-0.695-0.312-0.695-0.694v-6.9c0-0.659-0.421-1.24-1.043-1.449l0,0C1.117,7.221,0.696,6.638,0.696,5.981V0.646"/><line fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="3.479" y1="0.646" x2="3.479" y2="6.211"/><path fill="none" stroke="#686868" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M11.131,0.646L11.131,0.646c-1.153,0-2.087,0.935-2.087,2.086v5.161c0,0.657,0.768,1.241,1.391,1.447l0,0v6.572c0,0.348,0.236,0.667,0.58,0.724c0.436,0.07,0.813-0.265,0.813-0.687V9.341v-8C11.828,0.957,11.516,0.646,11.131,0.646z"/></g></svg>
                        {recipe.numberPerson} persons          
                    </p>
                    <div className='flex text-primary items-center gap-2 sm:border-l sm:border-grayLight sm:-ml-3'>
                        <div className='sm:ml-3'>
                            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="23px" viewBox="0 0 92.000000 87.000000" preserveAspectRatio="xMidYMid meet">
                                <g transform="translate(0.000000,87.000000) scale(0.100000,-0.100000)" fill="#e35640" stroke="none">
                                    <path d="M309 534 c-92 -92 -170 -176 -173 -187 -7 -30 196 -237 233 -237 18 0 63 38 179 153 84 83 160 164 168 179 18 35 20 228 2 246 -8 8 -51 12 -127 12 l-115 0 -167 -166z m386 29 l0 -103 -160 -160 c-88 -88 -163 -160 -166 -160 -8 0 -199 192 -199 200 0 3 74 79 164 168 l163 163 99 -3 99 -3 0 -102z"/>
                                    <path d="M572 618 c-27 -27 -3 -88 34 -88 31 0 54 21 54 48 0 35 -16 52 -50 52 -14 0 -31 -5 -38 -12z m58 -32 c0 -8 -4 -17 -8 -20 -13 -8 -35 11 -28 23 10 16 36 14 36 -3z"/>
                                </g>
                            </svg>
                        </div>
                        {recipe.category}        
                    </div>
                    <div className='sm:hidden w-full border-t border-grayLight'></div>
                </div>
                <p className='my-4 text-gray'>{recipe.description}</p>
                <div className='flex items-center gap-3 font-garamond font-500 text-xl py-6 border-b border-grayLight'>
                    <p className='flex items-center gap-1'>Reviews ({recipe.review.count}) :</p>
                    <div className='mt-1 flex items-center'>{recipe.review.average}<ReviewStars average={recipe.review.average} /></div> 
                </div>
                {recipe.recipe_ingredients.length > 0 &&
                    <div>
                        <p className='text-[45px] font-500 leading-[1.08em] font-garamond my-6'>Ingredients:</p>
                        <div className='flex items-center gap-3 mt-4 font-garamond'>
                            <p className='text-xl font-500 leading-[1.25em]'>Adjust Servings</p>
                            <form className='text-gray'>
                                <input type='text' className='w-15 h-8 border text-center' value={servings} onChange={handleChange} />
                            </form>
                        </div>
                        {[...new Set(recipe.recipe_ingredients.map(ri => ri.type))].map((type) => {
                            const ingredientsByType = recipe.recipe_ingredients.filter(ri => ri.type === type);

                            if (ingredientsByType.length === 0) return null;

                            return (
                                <div key={type} className="mb-8">
                                    {type !== 'normal' && (
                                        <p className="text-xl font-500 font-garamond leading-[1.25em]">{type}</p>
                                    )}

                                    <table className="w-full mt-4 border-t border-b border-grayLight text-[15px] text-gray">
                                        <tbody>
                                            {ingredientsByType.map((ri) => (
                                                <IngredientRow key={ri.id} quantity={ri.quantity * servings} unit={ri.unit} name={ri.ingredient.name} />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })} 
                    </div>
                } 
                {(recipe.fat && recipe.protein && recipe.sugars && recipe.calories && recipe.carbs) && 
                    <div className="bg-beige grid sm:grid-cols-3 my-10 sm:items-center">
                        <h5 className="px-4 py-6 sm:py-12 sm:border-r border-grayLight text-center font-500 font-garamond text-2xl leading-[1.08em]">
                            Nutritional Information
                        </h5>

                        <div className="sm:col-span-2 flex justify-center pb-6 sm:pb-0">
                            <div className="grid grid-cols-2 sm:grid-cols-5 sm:w-full sm:max-w-4xl gap-y-6 gap-x-10 sm:gap-0">
                            <div className="flex flex-col px-2.5 flex-1 items-center text-center justify-center">
                                <span className="font-500 font-garamond text-xl mb-1">{recipe.fat}g</span>
                                <span className="text-[15px] text-gray">Fat</span>
                            </div>

                            <div className="flex flex-col px-2.5 flex-1 items-center text-center justify-center">
                                <span className="font-500 font-garamond text-xl mb-1">{recipe.protein}g</span>
                                <span className="text-[15px] text-gray">Protein</span>
                            </div>

                            <div className="flex flex-col px-2.5 flex-1 items-center text-center justify-center">
                                <span className="font-500 font-garamond text-xl mb-1">{recipe.sugars}g</span>
                                <span className="text-[15px] text-gray">Sugars</span>
                            </div>

                            <div className="flex flex-col px-2.5 flex-1 items-center text-center justify-center">
                                <span className="font-500 font-garamond text-xl mb-1">{recipe.calories}</span>
                                <span className="text-[15px] text-gray">Calories</span>
                            </div>

                            <div className="flex flex-col px-2.5 flex-1 items-center text-center justify-center">
                                <span className="font-500 font-garamond text-xl mb-1">{recipe.carbs}g</span>
                                <span className="text-[15px] text-gray">Carbs</span>
                            </div>
                            </div>
                        </div>
                    </div>
                }
                {recipe.steps.length > 0 &&
                    <div>
                        <div className="flex flex-row items-center gap-6 after:content-[''] after:flex-1 after:border-t after:border-grayLight">
                            <p className='text-[45px] font-500 leading-[1.08em] font-garamond mb-4'>Directions</p>                    
                        </div>
                        <div>                   
                            {recipe.steps.map((step) => (
                                <div key={step.id} className="relative my-6">
                                    <span className='absolute -top-1.5 left-0 text-xl w-10 h-10 bg-primary text-center font-garamond pl-1 text-white rounded-full leading-[40px]'>{step.step_number}.</span>
                                    <StepRow title={step.title} instruction={step.instruction} images={step.images}  />
                                </div>
                            ))}
                        </div>
                    </div>
                }
                
                {recipe.reviews.length > 0 && (
                    <div>
                        <div className="flex flex-row items-center gap-6 after:content-[''] after:flex-1 after:border-t after:border-grayLight">
                            <p className='text-[45px] font-500 leading-[1.08em] font-garamond mb-4'>Reviews</p>                    
                        </div>
                        <div>                   
                            {recipe.reviews.map((review) => (
                                <ReviewRow key={review.id} review={review} setRecipe={setRecipe}/>
                            ))}
                        </div>
                    </div>
                )}


                {user && 
                    <div className='mt-10'>
                        <h4 className='font-garamond font-500 text-[38px] leading-[1.1em]'>Leave a Review</h4>
                        <form onSubmit={handleAdd}>
                            <p className='my-3.75 text-gray'>Required fields are marked *</p>
                            <div className='my-3.75 text-gray flex items-center'>
                                <label>Rating*</label>
                                <RatingStars value={formData.rating} onChange={value => setFormData(prev => ({ ...prev, rating: value }))} />
                            </div>
                            <textarea name="comment" placeholder="Your Comment*" value={formData.comment} onChange={e => setFormData(prev => ({ ...prev, comment: e.target.value }))} className='w-full h-23 mb-4 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none'/>
                            <FileInput multiple previewImages={previewImages} setPreviewImages={setPreviewImages} onChange={(files) => setFormData(prev => ({ ...prev, images: files }))}/>
                            <button type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-14.5 py-4.5 cursor-pointer z-30 text-white hover:text-primary bg-primary hover:bg-transparent border border-transparent hover:border-primary">
                                Post Review
                            </button>
                        </form>
                    </div>
                }
                
            </div>
            <div className='col-span-2 lg:col-span-1 px-0 lg:px-6 mt-3 lg:mt-0'>
                <Sidebar/>
            </div>
        </div>
    );
};
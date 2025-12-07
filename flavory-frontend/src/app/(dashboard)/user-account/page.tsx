"use client";

import { UserContext } from "@/context/UserContext";
import { BookOpen, Heart } from "lucide-react";
import { useContext } from "react";
import Loading from "@/components/Loading";
import Link from "next/link";
import DashboardLayout from "../DashboardLayout";

export default function UserAccountPage () {
    const {user} = useContext(UserContext);
    if (!user) return <Loading />;
    
    return (
        <DashboardLayout>
            <div className="p-8 min-h-[400px]">
                <h1 className="text-4xl font-bold mb-4 font-garamond">
                    Welcome back, {user.full_name.split(' ')[0]}!
                </h1>
                
                <p className="mb-8">
                    Here’s a quick overview of your account. Check your favorites, recipes, and update your information anytime.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <Heart className="w-6 h-6 text-red-500 mb-2" />
                        <p className="text-lg font-semibold">{user.favorites?.length || 0}</p>
                        <span className="text-gray-400 text-sm">Favorites</span>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <BookOpen className="w-6 h-6 text-yellow-500 mb-2" />
                        <p className="text-lg font-semibold">{user.recipes?.length || 0}</p>
                        <span className="text-gray-400 text-sm">Recipes Added</span>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                        <BookOpen className="w-6 h-6 text-yellow-500 mb-2" />
                        <p className="text-lg font-semibold">{user.recipes?.length || 0}</p>
                        <span className="text-gray-400 text-sm">Recipes Added</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/user-account/recipes">
                        <div className="p-4 bg-primaryLight border border-primary rounded-lg cursor-pointer hover:bg-primary/10 transition">
                            <h3 className="font-bold">Manage my recipes</h3>
                            <p className="text-sm text-gray-700">View, edit or delete your recipes</p>
                        </div>
                    </Link>

                    <Link href="/add">
                        <div className="p-4 bg-primaryLight border border-primary rounded-lg cursor-pointer hover:bg-primary/10 transition">
                            <h3 className="font-bold">Add a new recipe</h3>
                            <p className="text-sm text-gray-700">Share your new creation</p>
                        </div>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
};
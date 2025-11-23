"use client";

import { UserContext } from "@/context/UserContext";
import { BookOpen, Heart, UserIcon } from "lucide-react";
import { useContext } from "react";
import UserAccountLayout from "./UserAccountLayout";
import LoadingPage from "@/components/Loading";

export default function UserAccountPage () {
    const {user} = useContext(UserContext);
    if (!user) return <LoadingPage />;
    
    return (
        <UserAccountLayout>
            <div className="bg-gray-50 rounded-r-xl p-8 flex flex-col justify-center items-center min-h-[400px]">
                {/* Welcome message */}
                <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
                    Welcome back, {user.full_name.split(' ')[0]}!
                </h1>
                
                <p className="text-gray-600 mb-8 text-center max-w-xl">
                    Here’s a quick overview of your account. Check your favorites, recipes, and update your information anytime.
                </p>

                {/* From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details. */}

                {/* Example cards / quick stats */}
                <div className="grid grid-cols-3 gap-6 w-full max-w-4xl">
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
                    <UserIcon className="w-6 h-6 text-blue-500 mb-2" />
                    <p className="text-lg font-semibold">{user.full_name}</p>
                    <span className="text-gray-400 text-sm">Account Info</span>
                    </div>
                </div>

                {/* Optional illustration */}
                {/* <div className="mt-12 w-full flex justify-center">
                    <img
                    src="/welcome-illustration.svg"
                    alt="Welcome illustration"
                    className="max-w-sm"
                    />
                </div> */}
            </div>
        </UserAccountLayout>
    );
};
"use client";

import { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import Recipes from "./Recipes";
import Users from "./Users";

export default function AdministrationPage () {
    const [activeTab, setActiveTab] = useState("users");

    return (
        <DashboardLayout>
            <div className="p-8 flex flex-col justify-center min-h-[400px] lg:pr-25">
                <div className="w-full mb-6">
                    <ul className="flex w-full border-b border-grayLight">
                        <li className="me-2">
                        <button type="button" onClick={() => setActiveTab("users")} className={`p-4 ${activeTab === "users" ? "border-b-2 w-full border-primary text-primary font-semibold" : ""}`}>
                            Users
                        </button>
                        </li>
                        <li className="me-2">
                        <button type="button" onClick={() => setActiveTab("recipes")} className={`p-4 ${activeTab === "recipes" ? "border-b-2 border-primary text-primary font-semibold" : ""}`}>
                            Recipes
                        </button>
                        </li>
                    </ul>
                </div>
                
                {activeTab === "users" && ( 
                    <Users />
                )}
                {activeTab === "recipes" && (
                    <Recipes />
                )}
            </div>
        </DashboardLayout>
    );
};
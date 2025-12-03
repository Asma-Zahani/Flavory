"use client";

import { useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import FormUpdatePassword from "./FormUpdatePassword";
import FormUserInfo from "./FormUserInfo";

export default function UserDetailPage () {
    const [activeTab, setActiveTab] = useState("info");

    return (
        <DashboardLayout>
            <div className="p-8 flex flex-col justify-center min-h-[400px] lg:pr-25">
                <div className="w-full mb-6">
                    <ul className="flex border-b border-grayLight">
                        <li className="me-2">
                        <button type="button" onClick={() => setActiveTab("info")} className={`p-4 ${activeTab === "info" ? "border-b-2 border-primary text-primary font-semibold" : ""}`}>
                            Modify Info
                        </button>
                        </li>
                        <li className="me-2">
                        <button type="button" onClick={() => setActiveTab("password")} className={`p-4 ${activeTab === "password" ? "border-b-2 border-primary text-primary font-semibold" : ""}`}>
                            Update Password
                        </button>
                        </li>
                    </ul>
                </div>
                
                {activeTab === "info" && ( 
                    <FormUserInfo />
                )}
                {activeTab === "password" && (
                    <FormUpdatePassword />
                )}
            </div>
        </DashboardLayout>
    );
};
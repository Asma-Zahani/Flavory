"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div>
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-[52px] font-garamond mb-8 mt-16 tracking-tight">
          Error Page
        </h2>

        <p className="max-w-[700px] text-base text-gray leading-relaxed mb-10">
          The page you are looking for doesn&apos;t exist. It may have been moved or removed altogether. Please try searching for some other page, or return to the website&apos;s homepage to find what you&apos;re looking for.
        </p>

        <Link href={"/"} className="inline-flex items-center justify-center text-[12px] font-600 tracking-[2px] uppercase px-12 py-4 bg-primary text-white hover:border transition-colors duration-200 ease-out hover:bg-transparent hover:text-primary hover:border-primary">
            Back to home
        </Link>
      </main>
    </div>
  );
}
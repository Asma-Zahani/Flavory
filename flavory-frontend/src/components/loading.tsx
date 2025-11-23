"use client";

export default function LoadingPage() {
    return (
    <div className="fixed inset-0 z-50 w-full h-full flex items-center justify-center bg-beige bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/spinner-background.png')" }}>
      <div className="text-center">
        <h2 className="font-allura font-400 text-6xl">Flavory</h2>
        <h2 className="mt-2 font-poppins font-500 text-primary text-sm uppercase tracking-[0.3em]">crafted with Flavor</h2>
      </div>
    </div>
   );
}
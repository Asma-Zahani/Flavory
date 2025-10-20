"use client";

import { useState } from "react";

export default function TestFrontendPage() {
  const [recipeId, setRecipeId] = useState(1);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    console.log("Temporary URLs:", urls);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Front-End : Dossier & Images</h1>

      <div className="mb-4">
        <label className="block mb-1">ID de la recette :</label>
        <input
          type="number"
          value={recipeId}
          onChange={(e) => setRecipeId(Number(e.target.value))}
          className="border p-1"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Sélectionner des fichiers :</label>
        <input
          type="file"
          multiple
          onChange={(e) => handleFileSelect(e.target.files)}
          className="border p-1"
        />
      </div>
    </div>
  );
}

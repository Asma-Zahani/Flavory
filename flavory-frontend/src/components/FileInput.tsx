"use client";

import { UploadCloudIcon, X } from "lucide-react";
import Image from "next/image";
import { DragEvent, useRef } from "react";

interface FileInputProps {
  multiple?: boolean;
  previewImages: string[];
  setPreviewImages: (urls: string[]) => void;
  onChange: (files: File[]) => void;
}

export default function FileInput({ multiple = false, previewImages, setPreviewImages, onChange }: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList) => {
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);

    // Générer les URLs pour aperçu
    const localPreviews = newFiles.map(file => URL.createObjectURL(file));
    // previewImages.forEach(url => URL.revokeObjectURL(url));

    setPreviewImages(multiple ? [...previewImages, ...localPreviews] : [localPreviews[0]]);

    // Passer les fichiers au parent
    onChange(multiple ? newFiles : [newFiles[0]]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFileSelect(e.target.files);
  };

  const handleClick = () => fileInputRef.current?.click();

  const handleRemove = (index: number) => {
    const updated = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updated);

    // Supprimer aussi le fichier correspondant dans le parent
    onChange([]);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div onClick={handleClick} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray cursor-pointer mb-5">
      <input ref={fileInputRef} type="file" accept="image/*" multiple={multiple} onChange={handleInputChange} className="hidden"/>
      {previewImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray py-3">
          <div className="flex flex-row gap-3">
            <UploadCloudIcon />
            <p><span className="font-semibold">Click to upload</span> or drag & drop</p>
          </div>
          <p className="text-xs text-gray-400">PNG, JPG, GIF</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 p-2 w-full justify-center">
          {previewImages.map((src, index) => (
            <div key={index} className="relative group">
              <Image src={src} alt="" width={100} height={100} className="object-cover w-full h-full" />
              <button type="button" onClick={(e) => { e.stopPropagation(); handleRemove(index); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
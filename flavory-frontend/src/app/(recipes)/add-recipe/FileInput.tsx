/* eslint-disable @next/next/no-img-element */
"use client";

import { DragEvent, useRef, useState } from "react";
import { UploadCloudIcon, X } from "lucide-react";

interface FileInputProps {
  multiple?: boolean;
  defaultImages?: string | string[];
  onChange: (urls: string | string[]) => void;
}

export default function FileInput({multiple = false, defaultImages = "", onChange}: FileInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImages, setPreviewImages] = useState<string[]>(typeof defaultImages === "string" ? defaultImages ? [defaultImages] : [] : defaultImages);

  const handleFileSelect = (files: FileList) => {
    if (!files || files.length === 0) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    previewImages.forEach((url) => URL.revokeObjectURL(url));

    setPreviewImages((prev) =>
      multiple ? [...prev, ...urls] : [urls[0]]
    );

    onChange(multiple ? [...previewImages, ...urls] : urls[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFileSelect(e.target.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    const updated = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updated);
    onChange(multiple ? updated : "");
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
                    <img src={src} alt="Preview" className={`object-cover w-full h-full ${multiple ? "" : "flex items-center"}`} />
                    <button type="button" className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(index);
                        }}>
                        <X className="w-3 h-3" />
                    </button>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}
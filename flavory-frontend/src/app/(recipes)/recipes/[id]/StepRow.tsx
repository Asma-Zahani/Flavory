import { Images } from "@/types/recipe";
import { useState } from "react";

interface StepRowProps {
  title: string;
  instruction: string;
  images: Images[];
}

export default function StepRow({ title, instruction, images }: StepRowProps) {
  const [checked, setChecked] = useState(false);

  return (
    <div className='pl-16.5 pb-11.5 text-[15px]'>
      <div className={`${checked ? 'opacity-50 pointer-events-none' : ''}`}>
          <h5 className="font-500 font-garamond text-[25px] leading-[1.08em] break-words mb-4">
            {title}:
        </h5>
        <div className='text-gray'><StepContent instruction={instruction} images={images} /></div>
      </div>
      <div className="pt-4 flex items-center gap-1 cursor-pointer text-gray" onClick={() => setChecked(!checked)}>
        <div className={`w-3.5 h-3.5 text-grayLight flex items-center font-bold justify-center rounded-full border-2 transition-all duration-300 ${checked ? "border-none" : ""}`}>
          {checked && "✓"}
        </div>
          Mark as complete
      </div>
    </div>
  );
}

type StepContentProps = {
  instruction: string;
  images: Images[];
};

export function StepContent({ instruction, images }: StepContentProps) {
  let content = instruction;

  const imageTags = images.map(img => 
    `<img src="/recipes/${img.image_path}" class="my-5" />`
  ).join('');

  const grid = `<div class="grid grid-cols-3 gap-4">${imageTags}</div>`;

  content = content.replace('[IMAGES]', grid);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
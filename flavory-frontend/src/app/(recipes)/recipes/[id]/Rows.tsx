import FileInput from "@/components/FileInput";
import { Images, Recipe, Review } from "@/types/recipe";
import { EllipsisIcon, Star } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import RatingStars from "./RatingStars";
import { deleteEntity, getEntity, updateEntity } from "@/services/EntitesService";
import { UserContext } from "@/context/UserContext";
import { MessageContext } from "@/context/MessageContext";

interface IngredientRowProps {
  quantity: number;
  unit: string;
  name: string;
}

export function IngredientRow({ quantity, unit, name }: IngredientRowProps) {
  const [checked, setChecked] = useState(false);

  return (
    <tr className="border-b border-gray-200 cursor-pointer" onClick={() => setChecked(!checked)}>
      <td className="p-3 w-[30px] text-center border-r border-gray-200 text-grayLight">
        <div className={`w-3.5 h-3.5 flex items-center font-bold justify-center rounded-full border transition-all duration-300 ${
            checked ? "border-none" : ""}`}>
          {checked && "✓"}
        </div>
      </td>

      <td className={`p-3 text-gray transition-all duration-300 ${checked ? "line-through" : ""}`}>
        {quantity} {unit} {name}
      </td>
    </tr>
  );
}

interface StepRowProps {
  title: string;
  instruction: string;
  images: Images[];
}

export function StepRow({ title, instruction, images }: StepRowProps) {
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
    `<Image src="${process.env.NEXT_PUBLIC_BACKEND_URL}${img.image_path}" alt="image" fill className="object-cover hover:scale-105 transition-transform duration-300 my-5"/>`
  ).join('');

  const grid = `<div class="grid grid-cols-3 gap-4">${imageTags}</div>`;

  if (content.includes('[IMAGES]')) {
    content = content.replace('[IMAGES]', grid);
  } else {
    content += grid;
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

interface ReviewRowProps {
  review: Review;
  setRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>
}

export function ReviewRow({ review, setRecipe }: ReviewRowProps) {
  const {user} = useContext(UserContext);

  const [showImages, setShowImages] = useState(false)
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setMessage } = useContext(MessageContext);

  const [formData, setFormData] = useState({user_id: review.user_id, recipe_id: review.recipe_id, rating: 0, comment: "", images: [] as File[]});  
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await updateEntity("reviews", review.id, formData);
    const data = await res.json();

    let urls: string[] = [];
    
    if (formData.images.length > 0) {
      const uploadPromises = formData.images.map(async (file, index) => {
          const fd = new FormData();
          fd.append("file", file);
          fd.append("type", "review");
          fd.append("index", (index + 1).toString());
          fd.append("recipe_id", review.recipe_id!.toString());
          fd.append("review_id", review.id.toString());

          const res = await fetch("/api/upload", { method: "POST", body: fd });
          const data = await res.json();
          
          return data.url;
      });

      urls = await Promise.all(uploadPromises);
    } else {
      await updateEntity("deleteImages/review", review.id, {});
    }

    setLoading(false);
    if (res.ok) {
        setMessage(data.message);
        setRecipe(prev => {
          if (!prev) return prev;

          const updatedReview = {
            ...review,
            rating: formData.rating,
            comment: formData.comment,
            images: urls.map(url => ({
              image_path: url
            })),
            updated_at: new Date().toISOString(),
          };

          return {
            ...prev,
            reviews: prev.reviews.map(r => 
              r.id === review.id ? updatedReview : r
            ),
          };
        });
        setFormData({ user_id: user?.id, recipe_id: review.recipe_id, rating: 0 , comment: "", images: [] });
    }   
  };

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await deleteEntity("reviews", review.id);
    const data = await res.json(); 
    if (res.ok) {
        setMessage(data.message);
        setRecipe(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            reviews: prev.reviews.filter(r => r.id !== review.id)
          };
        });
    }   
  };

  useEffect(() => {
      const fetchRecipe = async () => {
          const res = await getEntity("reviews", review.id);
          if (res.ok) {
              const data = await res.json();
              setFormData(data);
              if (Array.isArray(data.images)) {
                setPreviewImages(data.images.map((img: { image_path: unknown; }) => `${process.env.NEXT_PUBLIC_BACKEND_URL}${img.image_path}`));
              }
          };
      };
      if (review.id && openUpdate) fetchRecipe();
  }, [review, openUpdate]);

  return (
    <div className="py-4 relative border-b border-grayLight border-dashed">
      <div className="flex flex-col gap-2">
        <div className='flex items-center gap-2'>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100">
            <Image src={review.user.profile_photo ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${review.user.profile_photo}` : 'user.jpg'} alt='' width={40} height={40} className='mr-6.5 rounded-full' />                 
          </div>
          <p className="font-garamond font-500 text-lg">{review.user.full_name}</p>
          <p className='mt-1 font-raleway text-gray text-sm'>Published {new Date(review.created_at).toLocaleDateString("en-US", {year: "numeric", month: "short", day: "numeric"})}</p>
        </div>
        <div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}><Star size={14} fill={`${star <= review.rating ? '#e35640' : '#ffff'}`} stroke='#e35640'/></span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 text-gray text-[15px] leading-relaxed">{review.comment}</div>
      {review.images.length > 0 && (
        <div className="mt-3">
          <button onClick={() => setShowImages(!showImages)} className="text-sm text-primary underline">
            {showImages ? 'Masquer les photos' : `Voir les photos (${review.images.length})`}
          </button>
          {showImages && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
              {review.images.map((img, index) => (
                <div key={index} className="relative w-full aspect-square overflow-hidden">
                  <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${img.image_path}`} alt="Review image" fill className="object-cover hover:scale-105 transition-transform duration-300"/>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="absolute right-2 bottom-2 flex gap-3 text-gray">
        {(user && review.user_id == user.id) && 
          <>
            <button type="button" onClick={() => setOpen(prev => !prev)}><EllipsisIcon /></button>
            <div className={`absolute bottom-7 py-2 px-4 right-0 bg-white shadow-[0px_6px_24px_rgba(20,25,44,0.15)] z-50 transform transition-all duration-300 ease-in-out ${open ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-3 invisible"} `}>
              <span className="absolute -bottom-[5.5px] right-2 w-0 h-0 border-[6px] border-b-0 border-transparent border-t-white"></span>
              <button type="button" onClick={() => {setOpen(false); setOpenUpdate(!openUpdate)}} className="text-xs text-gray cursor-pointer hover:scale-105">{openUpdate ? "Cancel" : "Edit/Delete"}</button>
            </div>
          </>
        }
      </div>
      {openUpdate && 
        <div className='mt-10'>
          <h4 className='font-garamond font-500 text-[32px] leading-[1.1em]'>Update your Review</h4>
          <form>
            <div className='my-3.75 text-gray flex items-center'>
                <label>Rating*</label>
                <RatingStars value={formData.rating} onChange={value => setFormData(prev => ({ ...prev, rating: value }))} />
            </div>
            <textarea name="comment" placeholder="Your Comment*" value={formData.comment} onChange={e => setFormData(prev => ({ ...prev, comment: e.target.value }))} className='w-full h-23 mb-4 px-5 py-3 text-base placeholder:text-gray focus:text-black border border-grayDark rounded-none outline-none focus:border-black transition-colors duration-200 ease-out resize-none'/>
            <FileInput multiple previewImages={previewImages} setPreviewImages={setPreviewImages} onChange={(files) => setFormData(prev => ({ ...prev, images: files }))}/>
            <div className="flex gap-3">
              <button onClick={(e) => {handleUpdate(e); setOpenUpdate(false)}} disabled={loading} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-10 py-4 cursor-pointer z-30 text-white bg-primary hover:scale-105 hover:font-bold">
                  {loading ? "Updating..." : "Update Review"}
              </button>
              <button onClick={handleDelete} type="submit" className="relative inline-flex items-center font-raleway text-xs font-600 tracking-wider uppercase rounded-none outline-none transition-colors duration-200 ease-out px-10 py-4.5 cursor-pointer z-30 text-primary bg-transparent border border-primary hover:border-2 hover:scale-105 hover:font-bold">
                  Delete Review
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  )
}
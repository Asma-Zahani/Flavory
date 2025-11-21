<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\ReviewImage;
use App\Models\StepImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:5120',
            'type' => 'required|string|in:user,recipe,step,review',
        ]);

        $file = $request->file('file');
        $type = $request->type;

        switch ($type) {
            case 'user':
                $userId = $request->user_id;
                $folder = 'users';
                $filename = "user_{$userId}." . $file->getClientOriginalExtension();
                break;

            case 'recipe':
                $recipeId = $request->recipe_id;
                $folder = 'recipes';
                $filename = "recipe_{$recipeId}." . $file->getClientOriginalExtension();
                break;

            case 'step':
                $recipeId = $request->recipe_id;
                $stepId = $request->step_id;
                $folder = 'steps';
                $index = $request->index;    
                
                if ($index == "1" || $index == 1) {
                    $this->deleteOldImages('step', $stepId);
                }

                $filename = "recipe{$recipeId}_step{$stepId}_{$index}." . $file->getClientOriginalExtension();
                break;

            case 'review':
                $recipeId = $request->recipe_id;
                $reviewId = $request->review_id;
                $folder = 'reviews';
                $index = $request->index;

                if ($index == "1" || $index == 1) {
                    $this->deleteOldImages('review', $reviewId);
                }

                $filename = "recipe{$recipeId}_review{$reviewId}_{$index}." . $file->getClientOriginalExtension();
                break;

            default:
                return response()->json(['error' => 'Type non supporté'], 400);
        }

        $path = $file->storeAs($folder, $filename, 'public');
        $url = Storage::url($path);

        if ($type === 'review') {
            ReviewImage::create([
                'review_id' => $reviewId,
                'image_path' => $url,
            ]);
        } elseif ($type === 'step') {
            StepImage::create([
                'step_id' => $stepId,
                'image_path' => $url,
            ]);
        } elseif ($type === 'recipe') {
            Recipe::where('id', $recipeId)->update([
                'image' => $url
            ]);
        } elseif ($type === 'user') {
            User::where('id', $userId)->update([
                'profile_photo' => $url
            ]);
        }
        return response()->json([
            'url' => Storage::url($path),
        ]);
    }

    private function deleteOldImages(string $type, int $id): void
    {
        if ($type === 'step') {
            $oldImages = StepImage::where('step_id', $id)->get();

            foreach ($oldImages as $img) {
                if ($img->image_path) {
                    Storage::delete(str_replace('/storage/', 'public/', $img->image_path));
                }
                $img->delete();
            }
        }

        if ($type === 'review') {
            $oldImages = ReviewImage::where('review_id', $id)->get();

            foreach ($oldImages as $img) {
                if ($img->image_path) {
                    Storage::delete(str_replace('/storage/', 'public/', $img->image_path));
                }
                $img->delete();
            }
        }
    }

    public function deleteImages(string $type, int $id)
    {
        $this->deleteOldImages($type, $id);

        return response()->json([
            'message' => 'Images deleted successfully'
        ]);
    }

}
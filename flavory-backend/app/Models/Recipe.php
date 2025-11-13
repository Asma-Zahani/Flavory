<?php

namespace App\Models;

use App\Enums\CategoryEnum;
use App\Enums\DifficultyEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $table = 'recipes';
    protected $primaryKey = 'id';

    protected $fillable = [
        'image',
        'title',
        'description',
        'cookingTime',
        'difficulty',
        'numberPerson',
        'category',
        'calories',
        'fat',
        'protein',
        'sugars',
        'carbs',
        'author_id'
    ];

    protected $appends = ['review'];
    protected $casts = [
        'category' => CategoryEnum::class,
        'difficulty' => DifficultyEnum::class,
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function recipeIngredients()
    {
        return $this->hasMany(RecipeIngredient::class, 'recipe_id', 'id');
    }

    public function steps()
    {
        return $this->hasMany(Step::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites', 'recipe_id', 'user_id');
    }

    public function getReviewAttribute()
    {
        $reviews = $this->reviews;
        $count = $reviews->count();

        if ($count === 0) {
            return ['average' => 0,'count' => 0];
        }

        $average = round($reviews->avg('rating'), 1);

        return ['average' => $average,'count' => $count];
    }
}
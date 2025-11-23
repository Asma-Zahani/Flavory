<?php

namespace App\Models;

use App\Enums\TypeRecipeIngredientEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
    /** @use HasFactory<\Database\Factories\RecipeIngredientFactory> */
    use HasFactory;

    protected $table = 'recipe_ingredients';
    public $timestamps = false;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'recipe_id',
        'ingredient_id',
        'type',
        'quantity',
        'unit'
    ];

    protected $casts = [
        'type' => TypeRecipeIngredientEnum::class,
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class)->withDefault();
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class)->withDefault();
    }
}

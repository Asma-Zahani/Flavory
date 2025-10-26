<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    /** @use HasFactory<\Database\Factories\FavoriteFactory> */
    use HasFactory;

    protected $table = 'favorites';
    public $timestamps = false;
    
    public $incrementing = false;
    protected $primaryKey = ['user_id', 'recipe_id'];

    protected $fillable = ['user_id', 'recipe_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}

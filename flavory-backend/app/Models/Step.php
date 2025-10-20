<?php 

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Step extends Model
{
    use HasFactory;

    protected $table = 'steps';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'recipe_id',
        'step_number',
        'title',
        'instruction',
    ];

    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    public function images()
    {
        return $this->hasMany(StepImage::class);
    }
}
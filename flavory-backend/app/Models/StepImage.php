<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StepImage extends Model
{
    use HasFactory;

    protected $table = 'step_images';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'step_id',
        'image_path',
    ];

    public function step()
    {
        return $this->belongsTo(Step::class);
    }
}

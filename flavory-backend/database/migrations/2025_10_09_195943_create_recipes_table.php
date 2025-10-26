<?php

use App\Enums\CategoryEnum;
use App\Enums\DifficultyEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author_id')->constrained('users')->onDelete('cascade');
            $table->string('image');
            $table->string('title');
            $table->text('description');
            $table->string('cookingTime');
            $table->enum('difficulty', DifficultyEnum::values());
            $table->integer('numberPerson');
            $table->enum('category', CategoryEnum::values());
            $table->integer('calories')->nullable();
            $table->float('fat')->nullable();
            $table->float('protein')->nullable();
            $table->float('sugars')->nullable();
            $table->float('carbs')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};

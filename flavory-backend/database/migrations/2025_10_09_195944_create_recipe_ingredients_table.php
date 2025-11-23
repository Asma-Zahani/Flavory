<?php

use App\Enums\TypeRecipeIngredientEnum;
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
        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->foreignId('recipe_id')->constrained('recipes')->onDelete('cascade'); 
            $table->foreignId('ingredient_id')->constrained('ingredients')->onDelete('restrict');
            $table->enum('type', TypeRecipeIngredientEnum::values())->default(TypeRecipeIngredientEnum::NORMAL);
            $table->float('quantity');
            $table->string('unit')->nullable();
            $table->primary(['recipe_id', 'ingredient_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipe_ingredients');
    }
};

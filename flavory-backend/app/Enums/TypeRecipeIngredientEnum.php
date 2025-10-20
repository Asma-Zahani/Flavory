<?php

namespace App\Enums;

enum TypeRecipeIngredientEnum: string
{
    case NORMAL = 'normal';
    case DRESSING = 'For Dressing';
    case GARNISH = 'For Garnish';
    case OPTIONAL = 'Optional';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
<?php

namespace App\Enums;

enum DifficultyEnum: string
{
    case SUPEREASY = 'super easy';
    case EASY = 'easy';
    case MEDIUM = 'medium';
    case HARD = 'hard';
    case SUPERHARD = 'super hard';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
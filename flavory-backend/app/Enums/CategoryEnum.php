<?php

namespace App\Enums;

enum CategoryEnum: string
{
    case RAW_FOOD = 'Raw Food';
    case MEAT = 'Meat';
    case SNACKS = 'Snacks';
    case DESSETS = 'Desserts';
    case MAIN_DISH = 'Main Dish';
    case BREAKFAST = 'Breakfast';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
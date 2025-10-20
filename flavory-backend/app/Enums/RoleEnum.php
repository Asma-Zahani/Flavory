<?php

namespace App\Enums;

enum RoleEnum : string
{
    case ADMIN = 'admin';
    case CLIENT = 'client';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
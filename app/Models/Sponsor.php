<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sponsor extends Model
{

    public function animals(): HasMany
    {
        return $this->hasMany(Animal::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Age extends Model
{

    public function animals(): BelongsTo
    {
        return $this->hasMany(Animal::class);
    }
}

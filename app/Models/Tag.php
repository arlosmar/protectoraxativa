<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description'
    ];

    public function groups(): HasMany
    {
        return $this->hasMany(Group::class);
    }

    public function events(): HasMany
    {
        return $this->hasMany(Event::class);
    }
}
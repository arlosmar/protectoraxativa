<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Device extends Model
{

    protected $fillable = [
        'user_id',
        'token_firebase',
        'token_firebase_date'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}

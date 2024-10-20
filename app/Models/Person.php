<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Person extends Model
{

    protected $table = 'people';

    protected $fillable = [
        'name',
        'surname',
        'dni'   ,
        'birthdate',
        'email',
        'phone',
        'address',
        'name2',
        'surname2',
        'dni2'   ,
        'birthdate2',
        'email2',
        'phone2',
        'address2',
        'description'
    ];

    public function animals(): HasMany
    {
        return $this->hasMany(Animal::class);
    }
}

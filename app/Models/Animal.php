<?php

namespace App\Models;

//use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Animal extends Model
{
    
    //use HasFactory;
    
    protected $fillable = [
        'code',
        'status_id',                
        'sponsor_id',                
        'type_id',            
        'age_id',                
        'gender_id',                
        'size_id',                
        'breed_id',                
        'name',
        'weight',
        'birthdate',
        'deathdate',
        'description',
        'location',
        'image',
        'image2',
        'video',
        'video2',
        'person_id'
    ];

    public function status(): BelongsTo
    {
        return $this->belongsTo(Status::class);
    }

    public function sponsor(): BelongsTo
    {
        return $this->belongsTo(Sponsor::class);
    }

    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class);
    }

    public function age(): BelongsTo
    {
        return $this->belongsTo(Age::class);
    }

    public function gender(): BelongsTo
    {
        return $this->belongsTo(Gender::class);
    }

    public function size(): BelongsTo
    {
        return $this->belongsTo(Size::class);
    }

    public function breed(): BelongsTo
    {
        return $this->belongsTo(Breed::class);
    }

    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }
}

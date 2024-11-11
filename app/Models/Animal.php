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
        'hidden',
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
        'dead',
        'deathdate',        
        'location',
        'image',
        'image2',
        'image_sponsored',
        'video',
        'video2',
        'vaccines',
        'treatment',
        'castrated',
        'date_entry',
        'date_exit',
        'date_entry2',
        'date_exit2',
        'person_id',
        'internal',
        'description'
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

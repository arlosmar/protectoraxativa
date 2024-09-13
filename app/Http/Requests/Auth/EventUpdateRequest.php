<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['nullable', 'int'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['string'],            
            'location' => ['string', 'max:255'],
            'date' => ['required','date'],
            'time' => ['required','string'],
            'tag_id' => ['required', 'int'],
            'type_id' => ['required', 'int'],
            'link' => ['required', 'string', 'max:255'],
            'from' => ['string']
        ];
    }
}

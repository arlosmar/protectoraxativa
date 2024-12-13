<?php

namespace App\Http\Requests\API;

use Illuminate\Foundation\Http\FormRequest;
//use Illuminate\Validation\ValidationException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class TokenRequest extends FormRequest
{

    public function __construct(){
        
        parent::__construct();   
        
        // by default english. we set up here in case of validation errors        
        app()->setLocale('en');
    }

    public function rules(): array{

        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'language' => ['string']
        ];
    }

    public function failedValidation(Validator $validator){        

        /*
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'status'   => 'Validation errors',
            'data' => [
                'errors'      => $validator->errors()
            ]
        ]));
        */

        $response = apiResponse(false,'Validation',[
            'errors' => $validator->errors()
        ]);

        throw new HttpResponseException($response);
    }
}
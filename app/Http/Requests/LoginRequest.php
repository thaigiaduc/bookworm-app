<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;
class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => 'required|email|exists:user,email',
            'password' => 'required|string'
        ];
    }

    // trả response về cho client
    public function failedValidation(Validator $validator)
    {

        throw new HttpResponseException(response()->json([
            'message' => 'Failed',
            'data' => $validator->errors(),
            'status_code' => 401
        ],200));

    }

    // quăng ra message khi có lỗi
    public function messages()
    {
        return [
            'email.required' => 'Bạn chưa nhập email',
            'password.required' => 'Bạn chưa nhập password.',     
         ];
    }

}

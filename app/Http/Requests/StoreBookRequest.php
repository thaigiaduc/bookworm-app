<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class StoreBookRequest extends FormRequest
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
            'order_item' => 'required|array',
            'order_item.*.book_id' => 'required|integer|exists:book,id',
            'order_item.*.quantity' => 'required|integer',
            'order_item.*.price' => 'required|numeric',
            'user_id' => 'required|integer',
        ];
    }

    // trả response về cho client khi order
    public function failedValidation(Validator $validator)
    {

        throw new HttpResponseException(response()->json([
            'message' => 'Failed',
            'data' => $validator->errors(),
            'status_code' => 422
        ],200));

    }

    // trả về message khi order lỗi
    public function messages()
	{
	   return [
		  'order_item.*.book_id.required' => 'Invalid book_id',
		  'order_item.*.quantity.required' => 'Invalid quantity.',
		  'order_item.*.price.error' => 'Invalid price.',
          'user_id.required' => 'Bạn chưa đăng nhập',
	   ];
	}
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class ReviewRequest extends FormRequest
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
            'review_title' => 'required|max:120',
            'review_details' => 'required|max:255',
            'book_id'=>'required|exists:book,id',
            'rating_start'=>'required|integer|between:1,5',
        ];
    }

    public function failedValidation(Validator $validator)
    {

        // throw new HttpResponseException(response()->json([
        //     'message' => 'Failed',
        //     'data' => $validator->errors()
        // ],422));

        throw new HttpResponseException(response()->json([
            'message' => 'Failed',
            'data' => $validator->errors(),
            'status_code' => 422
        ],200));
    }

    public function messages()
	{
	   return [
		  'review_title.required' => 'Bạn chưa nhập tiêu đề',
		  'review_details.required' => 'Bạn chưa nhập chi tiết tiêu đề.',
		  'review_title.error' => 'Tiêu đề không vượt quá 120 ký tự.',
		  'review_details.error' => 'Nội dung không quá 255 ký tự.',
          'rating_start.required' => 'Bạn chưa chọn số sao',
          'rating_start.error' => 'Số sao bạn chọn không hợp lệ'
	   ];
	}
    
}

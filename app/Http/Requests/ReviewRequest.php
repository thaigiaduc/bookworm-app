<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'review_title' => 'required|max:100',
            'review_details' => 'required|max:255',
            'book_id'=>'required',
            'rating_start'=>'required|min:1|max:5',
        ];
    }

    public function messages()
	{
	   return [
		  'review_title.required' => __('Bạn chưa nhập tiêu đề'),
		  'review_details.required' => __('Bạn chưa nhập chi tiết tiêu đề.'),
		  'review_title.min' => __('Tiêu đề phải hơn 1 ký tự.'),
		  'review_title.max' => __('Tiêu đề phải không được vượt quá 100 ký tự.'),
		  'review_details.min' => __('Nội dung phải hơn 8 ký tự.'),
		  'review_details.max' => __('Nội dung phải không được vượt quá 255 ký tự.')
	   ];
	}
}

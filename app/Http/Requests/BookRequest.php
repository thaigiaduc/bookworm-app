<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
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
            'book_title' => 'required|string|min:8|max:255',
            'book_summary' => 'required|text',
            'book_price' => 'required|numeric|min:1|max:5',
            'book_cover_photo' => 'required|string|min:1|max:20',
            'category_id' => 'required|integer',
            'author_id' => 'required|integer',
        ];
    }
}

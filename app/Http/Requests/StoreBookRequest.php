<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
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
}

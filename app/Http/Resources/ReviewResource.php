<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'book_id' => $this->book_id,
            'review_title' => $this->review_title,
            'review_details' => $this->review_details,
            'review_date' => $this->review_date,
            'rating_start' => $this->rating_start,
        ];
    }
}

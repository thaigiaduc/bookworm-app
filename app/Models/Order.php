<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'order';
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'order_date',
        'order_amount',
    ];

    public function orderitem()
    {
        return $this->hasMany(OrderItem::class);
    }
}

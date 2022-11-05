<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function createOrder(StoreBookRequest $request)
    {
        $order_amount = 0;
        $order_item = [];
        $flag = 0;
            
        try {
            $order_array = $request->order_item;
            foreach($order_array as $item ) {
                $order_amount += $item['quantity'];
                array_push($order_item, [
                    'book_id' => $item['book_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
            }
            $order = Order::create([
                "user_id"=>$request->user_id,
                "order_date"=>Carbon::now(),
                "order_amount"=>$order_amount,
            ]);
            $order->orderitem()->createMany($order_array);
            return response()->json([
                'message'=>'success',
                'status_code'=>201,
            ]);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\Order;
use App\Models\OrderItem;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {
        $order_amount = 0;
        $order_item = [];
        $flag = 0;
        
        // foreach($request->all() as $orders => $order) {
        //     $order_amount += $order['quantity'];
        //     array_push($order_item, [
        //         'book_id' => $order['book_id'],
        //         'quantity' => $order['quantity'],
        //         'price' => $order['price']
        //     ]);
        // }
        // try {
        //     $order = Order::create([
        //         'user_id' => $request->user_id,
        //         'order_date' => Carbon::now(),
        //         'order_amount' => $order_amount
        //     ]);

        //     $order->orderitem()->createMany($order_item);
        //     return response(['success' => true]);
            
        //     } catch (\Throwable $th) {
        //         return response([
        //             'success' => false,
        //             'message' => $th->getMessage()
        //         ]);
        //     }

            
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
            return response()->json([
                'alert'=>$e->getMessage(),
                'message'=>'failed',
                'status_code'=>400,
            ]);
        }
    }
}

<?php
namespace App\Repositories\Review;

use App\Http\Resources\BookCollection;
use App\Http\Resources\ReviewCollection;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use App\Http\Requests\ReviewRequest;
use Illuminate\Http\Request;

class ReviewRepository
{
    //lấy model tương ứng
    protected $ReviewRepo;
    
    public function all($id)
    {
        $review = Review::where('book_id',$id)->orderBy('id', 'asc');
        $result = $review->paginate(5);
        return new ReviewCollection($result);
    }

    public function sortReview(Request $request, $id)
    {
        if($request->item_per_page == null)
        {
            $request->item_per_page = 5;
        } 
        else if($request->item_per_page != 5 && $request->item_per_page != 15 && $request->item_per_page !=20 && $request->item_per_page != 25 && $request->item_per_page != 5)
        {
            $request->item_per_page = 5;
        }
        $review_data = Review::select('book_id','review_title','review_details','review_date','rating_start')->where('review.book_id',$id)
        ->when($request->has('rating_start'), function($query) use ($request){
            $query->where('rating_start',$request->rating_start)->get();
        })->when($request->has('sortby_day') == 'newest', function($query) use ($request){
            $query->where('book_id', $request->id)->orderBy('review_date','desc')->get();
        })->when($request->has('sortby_day') == 'oldest', function($query) use ($request){
            $query->where('book_id', $request->id)->orderBy('review_date','asc')->get();
        });

        return new ReviewCollection($review_data->paginate($request->item_per_page));
    }

    
}
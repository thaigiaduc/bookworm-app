<?php
namespace App\Repositories\Review;

use App\Http\Resources\BookCollection;
use App\Http\Resources\ReviewCollection;
use App\Http\Resources\ReviewResource;
use App\Models\Review;
use App\Http\Requests\ReviewRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReviewRepository
{
    //lấy model tương ứng
    protected $ReviewRepo;
    
    public function all($id)
    {
        $review = Review::where('book_id',$id)->orderBy('id', 'asc');
        $result = $review->paginate(5);
        return $result;
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
        $review_data = Review::select('id','book_id','review_title','review_details','review_date','rating_start')->where('review.book_id',$id)
        ->when($request->has('rating_start'), function($query) use ($request){
            $query->where('rating_start',$request->rating_start);
        })->when($request->sortbyday == 'asc', function($query) use ($request){
            $query->where('book_id', $request->id)->orderBy('review_date','desc');
        })->when($request->sortbyday == 'desc', function($query) use ($request){
            $query->where('book_id', $request->id)->orderBy('review_date','asc');
        });

        return $review_data->paginate($request->item_per_page);
    }

    public function countRating($id)
    {
        $review = Review::selectRaw('book_id,rating_start,count(rating_start) as count_rating')->where('book_id',$id)->groupBy('book_id','rating_start')->orderBy('rating_start','asc');
        return $review->get();
    }

    
}
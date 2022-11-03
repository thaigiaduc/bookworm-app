<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Models\Review;
use App\Repositories\Review\ReviewRepository;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\ReviewCollection;
use Exception;
use App\Http\Requests\ReviewRequest;
use Carbon\Carbon;
use Illuminate\Database\Query\Expression;
use Illuminate\Http\Request;


class ReviewController extends Controller
{
    protected $reivewRepo;

    public function __construct(ReviewRepository $reviewRepo)
    {
        $this->reivewRepo = $reviewRepo;
    }

    public function index(Request $request ,$id)
    {
        try {
            $review = $this->reivewRepo->sortReview($request,$id);
            return response()->json(new ReviewCollection($review),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),404);
        } 
    }

    public function store(ReviewRequest $request)
    {
        try {
            $review = Review::create([
                'book_id'=> $request->book_id,
                'review_title'=> $request->review_title,
                'review_details'=> $request->review_details,
                'review_date'=>Carbon::now(),
                'rating_start'=>$request->rating_start,
            ]);
            return response()->json([
                $review,201
            ]);
        } catch(Exception $e) {
            return response()->json([
                'message'=>$e->getMessage(),
                'status_code'=>404
            ]);
        }       
    }

}

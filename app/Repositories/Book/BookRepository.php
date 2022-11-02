<?php
namespace App\Repositories\Book;

use App\Repositories\BaseRepository;
use App\Repositories\Book\BookInterface;
use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookRepository
{
    //lấy model tương ứng
    protected $bookRepo;
    
    public function all()
    {
        $books = Book::orderBy('book.id')->paginate(12);
        return new BookCollection($books);
    }
    
    // public function onSale()
    // {
    //     $books = Book::selectRaw('book.book_price - discount.discount_price as sub_price')
    //     ->selectRaw('case
    //     when(discount.discount_end_date>=now()) then discount.discount_price 
    //     else book.book_price
    //     end as final_price')
    //     ->join('discount','discount.book_id','=','book.id')
    //     ->orderBy('sub_price','desc');
    //     return new BookCollection($books);
    // }

    // public function popularity()
    // {
    //     $books = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo')
    //     ->selectRaw('count(review.book_id) as num_review')
    //     ->selectRaw('case
    //                 when(discount.discount_end_date>=now()) then discount.discount_price 
    //                 else book.book_price
    //                 end as final_price')
    //     ->join('review','review.book_id','=','book.id')
    //     ->join('discount','discount.book_id','=','book.id')
    //     ->orderBy('num_review', 'desc')->orderBy('final_price','asc')
    //     ->groupBy('book.id','discount.discount_end_date','discount.discount_price');

    //     return $books;
    // }

    // lấy details book
    public function getQueryBookDetails($id)
    {
        $product_details = Book::where('book.id', $id)->paginate();
        return new BookCollection($product_details);
    }

    // lấy book onsale section trong homepage
    public function getQueryBookOnSale()
    {
        $books = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo')
        ->selectRaw('book.book_price - discount.discount_price as sub_price')
        ->join('discount','discount.book_id','=','book.id')
        ->orderBy('sub_price','desc')->paginate(10);
        return new BookCollection($books);
    }

    // lấy book featuredbook recommended section trong homepage
    public function getQueryFeaturedBookRecommended()
    {
        // recommended
        $books = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo')
        ->selectRaw('Round(avg(rating_start), 2) as avg_rating_start')
        ->selectRaw('case
        when(discount.discount_start_date <=now() and (discount.discount_end_date >= now() or discount.discount_end_date IS NULL)) then discount.discount_price 
        else book.book_price
        end as final_price')
        ->leftjoin('discount','discount.book_id','=','book.id')
        ->join('review','review.book_id','=','book.id')
        ->groupBy('book.id','discount.discount_end_date','discount.discount_price','discount.discount_start_date')
        ->orderBy('avg_rating_start','desc')->orderBy('final_price','asc')
        ->paginate(8);
        
        return new BookCollection($books);
    }

     // lấy book featuredbook popularity section trong homepage
    public function getQueryFeaturedBookPopularity()
    {
        $books = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo')
        ->selectRaw('case
        when(discount.discount_start_date <=now() and (discount.discount_end_date >= now() or discount.discount_end_date IS NULL)) then discount.discount_price 
        else book.book_price
        end as final_price, count(review.book_id) as num_review')
        ->join('review','review.book_id','=','book.id')
        ->leftjoin('discount','discount.book_id','=','book.id')
        ->orderBy('num_review', 'desc')->orderBy('final_price','asc')
        ->groupBy('book.id','discount.discount_end_date','discount.discount_start_date','discount.discount_price')->paginate(8);

        return new BookCollection($books);
    }

    // lọc filter
    public function queryFilter($request)
    {
        $books = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo')
        ->selectRaw('case
        when(discount.discount_start_date <=now() and (discount.discount_end_date >= now() or discount.discount_end_date IS NULL)) then discount.discount_price 
        else book.book_price
        end as final_price')
        ->leftjoin('discount','discount.book_id','=','book.id')
        ->when($request->category != null, function($query) use ($request){
            $query->where('category_id', $request->category);
        })->when($request->author != null, function($query) use ($request){
            $query->where('author_id', $request->author);
        })->when($request->rating_start != null, function($query) use ($request){
            $query->selectRaw('Round(avg(rating_start), 2) as avg_rating_start')
                ->join('review','review.book_id','=','book.id')
                ->groupBy('book.id','discount.discount_end_date','discount.discount_start_date','discount.discount_price')
                ->havingRaw('Round(avg(rating_start), 2)>='.$request->rating_start)
                ->orderBy('book.id','asc');      
        });

        return $books;
    }
    // lọc và sort filter trong trang shoppage
    public function getfilterAndSort(Request $request)
    {
        if($request->item_per_page == null)
        {
            $request->item_per_page = 12;
        } 
        else if($request->item_per_page != 5 && $request->item_per_page != 15 && $request->item_per_page !=20 && $request->item_per_page != 25 && $request->item_per_page != 12)
        {
            $request->item_per_page = 12;
        }

        $books = $this->queryFilter($request);
        switch($request->sortby) {
            case 'onsale':
                $books->selectRaw('book.book_price - discount.discount_price as sub_price')
                ->orderBy('sub_price', 'desc')
                ->orderBy('final_price','asc')
                ->groupBy('book.id','discount.discount_end_date','discount.discount_start_date','discount.discount_price');
                break;
            case 'popularity':
                $books->selectRaw('count(review.book_id) as num_review')
                ->join('review','review.book_id','=','book.id')
                ->orderBy('num_review', 'desc')
                ->orderBy('final_price','asc')
                ->groupBy('book.id','discount.discount_end_date','discount.discount_start_date','discount.discount_price');
                break;
            case 'price_up':
                $books->groupBy('book.id','discount.discount_end_date','discount.discount_start_date','discount.discount_price')
                ->orderBy('final_price','asc');
                break;
            case 'price_down': 
                $books->groupBy('book.id','discount.discount_end_date','discount.discount_start_date','discount.discount_price')
                ->orderBy('final_price','desc');
                break;
            default:
                break;
        }
        
        return new BookCollection($books->paginate($request->item_per_page));
    }

    public function storeOld()
    {
        // $book_data = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo')
        // ->when($request->has('category'), function($query) use ($request){
        //     $query->where('category_id', $request->category)->get();
        // })->when($request->has('author'), function($query) use ($request){
        //     $query->where('author_id', $request->author)->get();
        // })->when($request->has('rating_start'), function($query) use ($request){
        //     $query->selectRaw('Round(avg(rating_start), 2) as rating_start')
        //         ->join('review','review.book_id','=','book.id')
        //         ->groupBy('book.id')
        //         ->havingRaw('avg(rating_start)>='.$request->rating_start)
        //         ->orderBy('book.id','asc')->get();      
        // })->when($request->has('sortby_price'), function($query) use ($request){
        //     $query->selectRaw('discount.discount_price')
        //         ->join('discount', 'book.id','=','discount.book_id')
        //         ->orderBy('discount.discount_price',$request->sortby_price)->get();
        // })->when($request->get('sortby_popularity') == 2, function($query) use ($request){
        //     $query->selectRaw('count(review.book_id) as num_review')
        //         ->join('review','review.book_id','=','book.id')
        //         ->orderBy('num_review', 'desc')
        //         ->groupBy('book.id')->get();
        //     $request->sortBy_popularity = 1;
        // })->when($request->get('sortby_popularity') == 1, function($query) use ($request){
        //     $query->selectRaw('discount.discount_price')
        //         ->join('discount', 'book.id','=','discount.book_id')
        //         ->orderBy('discount.discount_price','asc')->get();
        //     $request->sortBy_popularity = 2;
        // })->when($request->get('sortby_onsale') == 1, function($query) use ($request){
        //     $query->selectRaw('discount.discount_price')
        //         ->join('discount', 'book.id','=','discount.book_id')
        //         ->orderBy('discount.discount_price','asc')->get();
        //     $request->sortBy_onsale = 2;
        // })->when($request->get('sortby_onsale') == 2, function($query) use ($request){
        //     $query->selectRaw('discount.discount_price')
        //         ->join('discount','discount.book_id','=','book.id')
        //         ->orderBy('discount.discount_price','desc')->get();
        //     $request->sortBy_onsale = 1;
        // })->paginate($request->item_per_page);
    }
}
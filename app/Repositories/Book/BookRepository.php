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

    // lấy details book
    public function getQueryBookDetails($id)
    {
        $product_details = Book::where('book.id', $id)->paginate();
        return $product_details;
    }

    // lấy book onsale section trong homepage
    public function getQueryBookOnSale()
    {
        $books = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo')
        ->selectRaw('case
                when(discount.discount_start_date <=now() and (discount.discount_end_date >= now() or discount.discount_end_date IS NULL)) then book.book_price-discount.discount_price 
                else book.book_price - book.book_price
                end as sub_price')
        ->leftjoin('discount','discount.book_id','=','book.id')
        ->orderBy('sub_price','desc')->paginate(10);
        return $books;
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
        
        return $books;
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

        return $books;
    }

    // lọc filter
    public function queryFilter($request)
    {
        $books = Book::select('book.id','category_id','author_id','book_title','book_summary','book_price','book_cover_photo')
        ->selectRaw('case
                when(discount.discount_start_date <=now() and (discount.discount_end_date >= now() or discount.discount_end_date IS NULL)) then discount.discount_price 
                else book.book_price
                end as final_price')
        ->selectRaw('case
                when(discount.discount_start_date <=now() and (discount.discount_end_date >= now() or discount.discount_end_date IS NULL)) then book.book_price-discount.discount_price
                else book.book_price-book.book_price
                end as sub_price')
        ->leftjoin('discount','discount.book_id','=','book.id')
        ->when($request->category !== null, function($query) use ($request){
            $query->where('category_id', $request->category);
        })->when($request->author !== null, function($query) use ($request){
            $query->where('author_id', $request->author);
        })->when($request->rating_start !== null, function($query) use ($request){
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
            $request->item_per_page = 15;
        } 
        else if($request->item_per_page != 5 && $request->item_per_page != 15 && $request->item_per_page !=20 && $request->item_per_page != 25)
        {
            $request->item_per_page = 15;
        }

        $books = $this->queryFilter($request);
        switch($request->sortby) {
            case 'onsale':
                $books->orderBy('sub_price','desc')->orderBy('final_price','asc');
                
                break;
            case 'popularity':
                $books->selectRaw('count(review.book_id) as num_review')
                ->leftjoin('review','review.book_id','=','book.id')
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
        
        return $books->paginate($request->item_per_page);
    }

}
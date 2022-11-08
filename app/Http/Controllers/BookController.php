<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
use App\Http\Resources\HomeCollection;
use App\Models\Book;
use App\Repositories\Book\BookInterface;
use App\Repositories\Book\BookRepository;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\BookCollection;
use Exception;
use Illuminate\Database\Query\Expression;
use Illuminate\Http\Request;

class BookController extends Controller
{
    protected $bookRepo;
    
    public function __construct(BookRepository $bookRepo)
    {
        $this->bookRepo = $bookRepo;
    }
    
    // lấy tất cả sách có filter
    public function index(Request $request)
    {
        try {
            $books = $this->bookRepo->getfilterAndSort($request);
            return response()->json(new BookCollection($books),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }

    // show product details trang product
    public function show($id)
    {
        try {
            if($this->bookRepo->getQueryBookDetails($id) !== null) {
                $books = $this->bookRepo->getQueryBookDetails($id);
                return response()->json(new BookCollection($books),200);
            } else {
                return response()->json(['message'=>'error','status_code'=>404],200);
            }          
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
        
    }

    // lấy sách on sale trong homepage
    public function getBookOnSale()
    {
        try {
            $books = $this->bookRepo->getQueryBookOnSale();
            return response()->json(new HomeCollection($books), 200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }

    // lấy featured recommended book trong homepage
    public function getBookFeaturedRecommended()
    {
        try {
            $books = $this->bookRepo->getQueryFeaturedBookRecommended();
            return response()->json(new HomeCollection($books),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }

    // lấy popular book trong homepage
    public function getBookFeaturedPopularity()
    {
        try {
            $books = $this->bookRepo->getQueryFeaturedBookPopularity();
            return response()->json(new HomeCollection($books),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }

    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {

    }

    // public function filter_book(Request $request) 
    // {
    //     $rs = '';
    //     $rs = $this->bookRepo->setfilter($request);

    //     return $rs;
        
    // }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

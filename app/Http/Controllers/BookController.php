<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Http\Resources\BookResource;
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
            $books = $this->bookRepo->getQueryBookDetails($id);
            return response()->json(new BookCollection($books),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
        
    }

    public function getBookOnSale()
    {
        try {
            $books = $this->bookRepo->getQueryBookOnSale();
            return response()->json(new BookCollection($books), 200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }

    // show featured recommended section trong homepage
    public function getBookFeaturedRecommended()
    {
        try {
            $books = $this->bookRepo->getQueryFeaturedBookRecommended();
            return response()->json(new BookCollection($books),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }

    // show featured popularity section trong homepage
    public function getBookFeaturedPopularity()
    {
        try {
            $books = $this->bookRepo->getQueryFeaturedBookPopularity();
            return response()->json(new BookCollection($books),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
    }

    public function store(BookRequest $request)
    {
        try {
            
        } catch(Exception $e) {
            return $e->getMessage();
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

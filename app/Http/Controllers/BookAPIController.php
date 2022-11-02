<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookCollection;
use App\Http\Resources\BookResource;
use App\Models\Book;
use Illuminate\Http\Request;

class BookAPIController extends Controller
{
    public function index()
    {
        $books = Book::orderBy('id', 'desc')->paginate(5);
        return new BookCollection($books);
    }

    public function show($id)
    {
        $books = Book::find($id);
        return new BookResource($books);
    }

    public function filter()
    {
        
    }
}

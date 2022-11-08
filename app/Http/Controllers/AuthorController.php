<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Repositories\Author\AuthorRepository;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\AuthorCollection;
use Exception;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    protected $authorRepo;

    public function __construct(AuthorRepository $authorRepo )
    {
        $this->authorRepo = $authorRepo;
    }
    public function index()
    {
        //
    }

    // controller lấy danh sách tác giả
    public function getAuthor()
    {
        try {
            $author = $this->authorRepo->getAll();
            return response()->json(new AuthorCollection($author),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }  
    } 
}

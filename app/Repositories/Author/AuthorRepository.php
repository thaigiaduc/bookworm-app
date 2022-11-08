<?php
namespace App\Repositories\Author;

use App\Http\Resources\AuthorCollection;
use App\Models\Author;
use Exception;
use Illuminate\Http\Request;

class AuthorRepository
{
    //lấy model tương ứng
    protected $authorRepo;
    // query lấy ra danh sách tác giả
    public function getAll()
    {    
        $author = Author::orderBy('author.id','asc')->get();
        return $author;  
    }
}
<?php
namespace App\Repositories\Category;

use App\Http\Resources\BookCollection;
use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryRepository
{
    //lấy model tương ứng
    protected $categoryRepo;

    // query lấy ra danh sách toàn bộ danh mục
    public function getAll()
    {
        $category = Category::orderBy('category.id','asc')->get();
        return $category;
    }   
}
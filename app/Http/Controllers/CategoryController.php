<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Repositories\Category\CategoryRepository;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    protected $categoryRepo;

    public function __construct(CategoryRepository $categoryRepo)
    {
        $this->categoryRepo = $categoryRepo;
    }

    public function getCategory()
    {
        try {
            $category = $this->categoryRepo->getAll();
            return response()->json(new CategoryCollection($category),200);
        } catch(\Exception $e) {
            return response()->json($e->getMessage(),400);
        }
        
    }
}

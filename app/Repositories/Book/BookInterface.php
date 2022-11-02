<?php
namespace App\Repositories\Book;

use App\Models\Book;

interface BookInterface 
{
    public function getBook();
    public function all();
}
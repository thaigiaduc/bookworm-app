<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'book';
    protected $fillable = [
        'category_id',
        'author_id',
        'book_title',
        'book_summary',
        'book_price',
        'book_cover_photo',
    ];

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function discount()
    {
        return $this->hasMany(discount::class);
    }

    public function review()
    {
        return $this->hasMany(review::class);
    }

    public static function getFinalPrice($id)
    {
        $books = Book::selectRaw('case
        when(discount.discount_start_date <=now() and (discount.discount_end_date >= now() or discount.discount_end_date IS NULL)) then discount.discount_price 
        else book.book_price
        end as final_price')
        ->leftjoin('discount','discount.book_id','=','book.id')
        ->where('book.id',$id)->get();
        $string = strval($books[0]);
        $test = '';
        for($i = 0 ; $i<strlen($string) ; $i++) {
            if($string[$i] >= 0 && $string[$i] <= 9 || $string[$i] == '.') {
                $test .= $string[$i];
            }
        }
        return $test;
    }

    public static function getSubPrice($id)
    {
        $books = Book::selectRaw('book.book_price - discount.discount_price as sub_price')
        ->leftjoin('discount','discount.book_id','=','book.id')->where('book.id',$id)->get();
        $string = strval($books[0]);
        $test = '';
        for($i = 0 ; $i<strlen($string) ; $i++) {
            if($string[$i] >= 0 && $string[$i] <= 9 || $string[$i] == '.') {
                $test .= $string[$i];
            }
        }
        return $test;
    }

    public static function getAvgRating($id)
    {
        $books = Book::selectRaw('Round(avg(rating_start), 2) as avg_rating_start')
        ->leftjoin('review','review.book_id','=','book.id')->groupBy('book.id')
        ->where('book.id', $id)->get();
        $string = strval($books[0]);
        $test = '';
        for($i = 0 ; $i<strlen($string) ; $i++) {
            if($string[$i] >= 0 && $string[$i] <= 9 || $string[$i] == '.') {
                $test .= $string[$i];
            }
        }
        return $test;
    }
}

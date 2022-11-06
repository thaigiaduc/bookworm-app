<?php

use App\Http\Controllers\BookAPIController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AuthorController;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::apiResource('books', BookAPIController::class);

Route::prefix('home')->group(function() {
    Route::name('home.')->group(function() {
        Route::get('/sale', [BookController::class, 'getBookOnSale']);
        Route::get('/popular', [BookController::class, 'getBookFeaturedPopularity']);
        Route::get('/recommended', [BookController::class, 'getBookFeaturedRecommended']);
    });
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::delete('session', [LoginController::class, 'logout'])->name('api.logout');
    
});

Route::prefix('shop')->group(function () {
    Route::name('shop.')->group(function() {
        Route::get('/', [BookController::class, 'index']);
        Route::get('/author', [AuthorController::class, 'getAuthor']);
        Route::get('/category', [CategoryController::class, 'getCategory']);
    });
    Route::prefix('product')->group(function () {
        Route::name('product.')->group(function() {
            Route::get('/{id}', [BookController::class, 'show']);
            Route::get('/review/{id}', [ReviewController::class, 'index']);
            Route::post('/createReview', [ReviewController::class, 'store']);
            Route::post('/createOrder', [OrderController::class, 'createOrder']);
        });   
    }); 
});

Route::prefix('authenticate') -> name('login.') -> group(function(){
    Route::name('authenticate.')->group(function() {
        Route::post('/login', [LoginController::class, 'login']);
        // Route::post('/signout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
        Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
    });
});

// Route::post('session', [LoginController::class, 'login'])->name('api.login');
// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::apiResource('books', BookAPIController::class);
//     Route::delete('session', [LoginController::class, 'logout'])->name('api.logout');
// });


        

// Route::post('/create', [OrderController::class, 'createOrder']);